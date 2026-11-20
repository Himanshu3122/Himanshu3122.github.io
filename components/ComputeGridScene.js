import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/*
  "Compute meets Grid": a small low-poly isometric diorama of an AI data
  center (GPU racks with blinking status lights), transmission towers and
  an EV charging station, with energy pulses travelling along the lines.

  Built from primitives (no model files). Loaded client-only from
  pages/index.js. It pauses when off screen or in a background tab, draws a
  single still frame for prefers-reduced-motion, and follows the site's
  light/dark theme by watching <html>'s class.
*/

const THEMES = {
  dark: { plate: 0x0b111e, surface: 0x162033, edge: 0x38bdf8, line: 0x38bdf8, pulse: 0x7dd3fc, ledA: 0x38bdf8, ledB: 0x34d399, grid: 0x38bdf8 },
  light: { plate: 0xffffff, surface: 0xf1f5f9, edge: 0x0284c7, line: 0x0284c7, pulse: 0x0369a1, ledA: 0x0284c7, ledB: 0x059669, grid: 0x0284c7 },
}

const isLight = () => document.documentElement.classList.contains('light')

export default function ComputeGridScene() {
  const mountRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      setFailed(true)
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 640px)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    camera.position.set(12, 10.5, 12)
    camera.lookAt(0, 0.3, 0)

    const ambient = new THREE.AmbientLight(0xffffff, 0.75)
    scene.add(ambient)
    const sun = new THREE.DirectionalLight(0xffffff, 1.1)
    sun.position.set(6, 12, 8)
    scene.add(sun)

    const world = new THREE.Group()
    scene.add(world)

    /* Shared, theme-driven materials */
    const mat = {
      plate: new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.1 }),
      surface: new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.25 }),
      edge: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 }),
      line: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.55 }),
      pulse: new THREE.MeshBasicMaterial(),
      grid: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.12 }),
    }
    const leds = []

    const addBox = (w, h, d, x, y, z, material = mat.surface, parent = world) => {
      const geo = new THREE.BoxGeometry(w, h, d)
      const mesh = new THREE.Mesh(geo, material)
      mesh.position.set(x, y, z)
      parent.add(mesh)
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat.edge)
      edges.position.copy(mesh.position)
      parent.add(edges)
      return mesh
    }

    /* Base plate with a faint grid */
    addBox(15, 0.3, 10, 0, -0.15, 0, mat.plate)
    const grid = new THREE.GridHelper(15, 15)
    grid.material = mat.grid
    grid.scale.z = 10 / 15
    grid.position.y = 0.01
    world.add(grid)

    /* Data center: slab + two rows of GPU racks with blinking LEDs */
    addBox(5.6, 0.12, 3.6, -3.4, 0.06, 0.2)
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 5; i++) {
        const x = -5.6 + i * 1.1
        const z = row === 0 ? -0.55 : 0.95
        addBox(0.75, 1.6, 0.8, x, 0.92, z)
        for (let k = 0; k < 4; k++) {
          const led = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 0.05, 0.02),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 })
          )
          led.position.set(x, 0.5 + k * 0.32, z + 0.41)
          led.userData = { phase: Math.random() * 10, speed: 0.6 + Math.random() * 1.6, green: (i + k + row) % 3 === 0 }
          world.add(led)
          leds.push(led)
        }
      }
    }
    /* Cooling units on a raised platform beside the racks */
    addBox(1.1, 0.5, 1.1, -0.9, 0.37, -0.6)
    addBox(1.1, 0.5, 1.1, -0.9, 0.37, 0.8)

    /* Lattice transmission tower */
    const tower = (x, z, h = 3.4) => {
      const b = 0.5, t = 0.14, pts = []
      const base = [[-b, -b], [b, -b], [b, b], [-b, b]]
      const top = [[-t, -t], [t, -t], [t, t], [-t, t]]
      for (let i = 0; i < 4; i++) {
        pts.push(x + base[i][0], 0, z + base[i][1], x + top[i][0], h, z + top[i][1])
        const n = (i + 1) % 4
        // cross bracing on each face
        pts.push(x + base[i][0], 0, z + base[i][1], x + (top[n][0] + base[n][0]) / 2, h / 2, z + (top[n][1] + base[n][1]) / 2)
        pts.push(x + base[n][0], 0, z + base[n][1], x + (top[i][0] + base[i][0]) / 2, h / 2, z + (top[i][1] + base[i][1]) / 2)
      }
      // cross arms
      pts.push(x - 1.1, h - 0.35, z, x + 1.1, h - 0.35, z)
      pts.push(x - 0.75, h - 0.05, z, x + 0.75, h - 0.05, z)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
      world.add(new THREE.LineSegments(geo, mat.edge))
      return { left: new THREE.Vector3(x - 1.1, h - 0.35, z), right: new THREE.Vector3(x + 1.1, h - 0.35, z) }
    }
    const t1 = tower(2.3, -2.6)
    const t2 = tower(5.6, -0.6)

    /* EV charging station and a car */
    addBox(0.45, 1.3, 0.35, 5.4, 0.65, 3.0)
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.02), new THREE.MeshBasicMaterial())
    screen.position.set(5.4, 0.95, 3.18)
    world.add(screen)
    addBox(1.9, 0.38, 0.95, 3.3, 0.38, 3.2)
    addBox(1.05, 0.34, 0.85, 3.15, 0.74, 3.2)
    for (const [wx, wz] of [[2.65, 2.72], [3.95, 2.72], [2.65, 3.68], [3.95, 3.68]]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 16), mat.surface)
      wheel.rotation.x = Math.PI / 2
      wheel.position.set(wx, 0.2, wz)
      world.add(wheel)
    }

    /* Power lines (sagging curves) and the pulses that travel along them */
    const sag = (a, b, drop = 0.6) => {
      const mid = a.clone().lerp(b, 0.5)
      mid.y -= drop
      return new THREE.CatmullRomCurve3([a, mid, b])
    }
    const curves = [
      sag(t1.right, t2.left, 0.5),                                     // grid span
      sag(t1.left, new THREE.Vector3(-1.6, 1.75, -0.55), 0.9),         // grid -> data center
      sag(t2.right, new THREE.Vector3(5.4, 1.3, 3.0), 0.8),            // grid -> EV charger
      sag(new THREE.Vector3(5.2, 0.5, 3.0), new THREE.Vector3(4.2, 0.55, 3.2), 0.15), // charger -> car
    ]
    for (const c of curves) {
      world.add(new THREE.Mesh(new THREE.TubeGeometry(c, 40, 0.025, 6, false), mat.line))
    }
    const pulses = []
    const pulseGeo = new THREE.SphereGeometry(0.09, 12, 12)
    curves.forEach((curve, ci) => {
      const count = small ? 1 : 2
      for (let k = 0; k < count; k++) {
        const p = new THREE.Mesh(pulseGeo, mat.pulse)
        p.userData = { curve, t: (k / count + ci * 0.17) % 1, speed: 0.12 + ci * 0.02 }
        world.add(p)
        pulses.push(p)
      }
    })

    world.position.set(-0.4, 0, -0.2)

    /* Theme */
    const applyTheme = () => {
      const light = isLight()
      const c = light ? THEMES.light : THEMES.dark
      // White surfaces need more light, or they render as a heavy grey
      ambient.intensity = light ? 2.2 : 0.75
      sun.intensity = light ? 1.6 : 1.1
      mat.plate.color.setHex(c.plate)
      mat.surface.color.setHex(c.surface)
      mat.edge.color.setHex(c.edge)
      mat.line.color.setHex(c.line)
      mat.pulse.color.setHex(c.pulse)
      mat.grid.color.setHex(c.grid)
      screen.material.color.setHex(c.ledB)
      for (const led of leds) led.material.color.setHex(led.userData.green ? c.ledB : c.ledA)
    }
    applyTheme()

    /* Size: orthographic frustum that keeps the diorama framed at any aspect */
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      const aspect = w / h
      const view = aspect < 1.3 ? 12.5 / aspect : 9.6
      camera.left = (-view * aspect) / 2
      camera.right = (view * aspect) / 2
      camera.top = view / 2
      camera.bottom = -view / 2
      camera.updateProjectionMatrix()
    }
    resize()

    /* Pointer tilt */
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onPointer = (e) => {
      const r = mount.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onLeave = () => { target.x = 0; target.y = 0 }
    mount.addEventListener('pointermove', onPointer)
    mount.addEventListener('pointerleave', onLeave)

    /* Animation loop, paused when off screen or the tab is hidden */
    const clock = new THREE.Clock()
    let frame = 0
    let visible = true
    const tick = () => {
      frame = 0
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime

      current.x += (target.x - current.x) * 0.05
      current.y += (target.y - current.y) * 0.05
      world.rotation.y = Math.sin(t * 0.18) * 0.22 + current.x * 0.28
      world.rotation.x = current.y * 0.06

      for (const led of leds) {
        const { phase, speed } = led.userData
        led.material.opacity = 0.35 + 0.65 * (Math.sin(t * speed * 3 + phase) > 0.2 ? 1 : 0.25)
      }
      for (const p of pulses) {
        p.userData.t = (p.userData.t + p.userData.speed * dt) % 1
        p.position.copy(p.userData.curve.getPointAt(p.userData.t))
        const s = 0.85 + 0.3 * Math.sin((p.userData.t + t) * 8)
        p.scale.setScalar(s)
      }
      renderer.render(scene, camera)
      if (visible && !document.hidden && !reduceMotion) frame = requestAnimationFrame(tick)
    }
    const start = () => { if (!frame && !reduceMotion) frame = requestAnimationFrame(tick) }
    const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0 }

    if (reduceMotion) {
      for (const p of pulses) p.position.copy(p.userData.curve.getPointAt(p.userData.t))
      renderer.render(scene, camera)
    } else {
      start()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start(); else stop()
    }, { threshold: 0.05 })
    io.observe(mount)

    const onVisibility = () => { if (document.hidden) stop(); else if (visible) start() }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => { resize(); if (reduceMotion) renderer.render(scene, camera) })
    ro.observe(mount)

    const mo = new MutationObserver(() => { applyTheme(); if (reduceMotion) renderer.render(scene, camera) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      mount.removeEventListener('pointermove', onPointer)
      mount.removeEventListener('pointerleave', onLeave)
      scene.traverse((obj) => {
        obj.geometry?.dispose?.()
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
        else obj.material?.dispose?.()
      })
      renderer.dispose()
      renderer.forceContextLoss?.()
      renderer.domElement.remove()
    }
  }, [])

  if (failed) return null

  return (
    <div>
      <div
        ref={mountRef}
        className="w-full h-[280px] sm:h-[360px] lg:h-[420px]"
        role="img"
        aria-label="3D illustration of an AI data center with GPU server racks, power transmission towers and an EV charging station, with energy flowing between them"
      />
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-2 text-xs text-parchment-400">
        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />AI data center &amp; GPU racks</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />Power grid</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />EV charging</span>
      </div>
    </div>
  )
}
