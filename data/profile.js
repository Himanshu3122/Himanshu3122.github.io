export const profile = {
  name: "Himanshu Singh",
  firstName: "Himanshu",
  lastName: "Singh",
  title: "Electrical Engineering Researcher",
  tagline: "Modeling the power demand of AI and cloud computing infrastructure.",
  institution: "Institute of Engineering & Management, Kolkata",
  institutionShort: "IEM Kolkata",
  location: "Kolkata, India",
  degree: "B.Tech. Electrical Engineering (2023–2027)",
  email: "himanshuee.24@gmail.com",
  github: "https://github.com/Himanshu3122",
  githubHandle: "Himanshu3122",
  // Leave a link as null to hide it everywhere on the site
  scholar: "https://scholar.google.com/citations?user=HFStV0gAAAAJ&hl=en",
  // Placeholder: replace with your real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/",
  orcid: null,
  cv: "/Himanshu_Singh_CV.pdf",

  bio: "I'm a 4th-year Electrical Engineering undergraduate at the Institute of Engineering & Management, Kolkata, working where power systems meet computing. My research models how cloud and AI data centers draw power: stochastic workload and traffic models, component-level load models, and what those loads mean for grid stability. I also work on multi-agent systems: queueing and branching-process models of multi-agent LLM workflows, and safe multi-agent reinforcement learning for EV charging and communication-constrained control.",

  researchVision: `AI and cloud workloads are becoming one of the fastest-growing electrical loads on the grid, yet the power they draw is bursty, stochastic, and poorly captured by traditional load models. I want to understand that demand well enough to plan for it.

My work combines stochastic modeling (non-homogeneous Poisson processes, jump-diffusion, distribution fitting) with power-system simulation to characterize data-center power profiles, from VM and GPU-cluster workloads down to cooling, UPS, and auxiliary loads, and to study how those loads interact with frequency control and grid stability.`,

  researchInterests: [
    "Machine Learning and AI for Computing Systems",
    "Large Language Models and Intelligent Networked Systems",
    "Wireless Networks and Network Optimization",
    "Energy-Efficient and Sustainable Computing",
    "Data Center, Cloud, and GPU Computing Systems",
    "Stochastic Modeling, Simulation, and Performance Analysis",
  ],

  skills: [
    { title: "Languages",  desc: "Python, C/C++, SQL, LaTeX" },
    { title: "Frameworks", desc: "TensorFlow, Keras" },
    { title: "Tools",      desc: "MATLAB/Simulink, PSpice, LTspice, PSIM" },
    { title: "Platforms",  desc: "Windows, Arduino, Raspberry Pi" },
  ],

  education: [
    {
      degree: "B.Tech. Electrical Engineering",
      institution: "Institute of Engineering & Management",
      location: "Kolkata, India",
      period: "2023 – 2027",
      details: [
        "CGPA: 9.2 / 10",
        "Mathematics: Advanced Calculus, Ordinary Differential Equations, Probability & Statistics, Complex Analysis",
        "Core: Signals & Systems, Control Systems, Electrical Machines I/II, Power Systems I/II, Analog Electronics, EMFT, Microprocessors",
        "Modeling & Optimization: Queueing Theory, Markov Chains, Stochastic Processes",
      ],
      thesis: "Dynamic Load Modeling and Stability Analysis of High-Density Computational Infrastructure",
      current: true,
    },
    {
      degree: "Higher Secondary (Class XII)",
      institution: "Kendriya Vidyalaya No. 2 Ishapore",
      location: "Kolkata, India",
      period: "2022",
      details: [
        "Percentage: 94.6%",
        "Mathematics, Physics, Chemistry, Computer Science, English",
      ],
    },
    {
      degree: "Secondary (Class X)",
      institution: "Kendriya Vidyalaya No. 2 Ishapore",
      location: "Kolkata, India",
      period: "2020",
      details: [
        "Percentage: 91.4%",
      ],
    },
  ],

  experience: [
    {
      role: "Research Intern",
      institution: "Jadavpur University",
      location: "Kolkata, India",
      period: "May 2026 – Jul 2026",
      bullets: [
        "Developed a decoupled bivariate Green Data Center power analysis framework simulating 520 virtual machines across 49 physical server blades (69 CPU cores) for multi-tenant cloud infrastructures.",
        "Modeled network traffic using a Non-Homogeneous Poisson Process (NHPP) and fitted backend workloads with Lognormal distributions using Maximum Likelihood Estimation (MLE) and the Akaike Information Criterion (AIC) on the Materna GWA Trace-1 dataset.",
        "Implemented a linear power superposition model that demonstrated a persistent 6 kW infrastructure power floor despite over 70% reductions in user traffic.",
        "Advisor: Dr. Bhimsen Tudu, Associate Professor, Department of Power Engineering, Jadavpur University.",
      ],
      link: "https://drive.google.com/file/d/199BUUsclsRXmHCtvltpn9RiiK99qOxQF/view?usp=drive_link",
      linkLabel: "Project Report",
    },
    {
      role: "IoT Intern",
      institution: "NIELIT Lucknow",
      location: "Lucknow, India",
      period: "Jun 2026",
      bullets: [
        "Developed IoT-based solutions using Arduino/NodeMCU and integrated sensors for real-time data acquisition and monitoring.",
        "Implemented sensor interfacing, actuator control, and embedded programming for connected-device applications.",
      ],
    },
    {
      role: "Graphics Head",
      institution: "IEEE IAS Student Branch Chapter, IEM Kolkata",
      location: "Kolkata, India",
      period: "2024 – 2025",
      bullets: [
        "Designed creative content for the chapter's technical events, workshops, and activities.",
        "Organized and coordinated technical workshops and chapter events, from planning and promotion through execution.",
      ],
    },
  ],

  awards: [
    {
      title: "GATE EE 2026 Qualified",
      issuer: "Graduate Aptitude Test in Engineering",
      year: 2026,
      description: "Qualified GATE Electrical Engineering in the third year of undergraduate study.",
    },
    {
      title: "Finalist, IEEE TechSangam",
      issuer: "IEEE Computer Society & IEEE EMBS Pune Chapter",
      year: 2025,
      description: "Finalist in a national-level hackathon held on 11–12 August 2025.",
    },
    {
      title: "HPAIR Asia Conference 2025 Delegate",
      issuer: "Harvard Project for Asian and International Relations",
      year: 2025,
      description: "Selected as a delegate (top 2%) from a pool of 50,000+ applicants.",
    },
    {
      title: "Winner, Posternova Technical Poster Presentation",
      issuer: "IEI-IEM Students' Chapter",
      year: 2025,
      description: "First place in the technical poster presentation competition.",
    },
  ],
}
