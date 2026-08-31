export const portfolioData = {
  personal: {
    firstName: "Aditya",
    lastName: "Verlekar",
    name: "Aditya Verlekar",
    location: "Goa, India",
    role: "Software Developer",
    disciplines: "Full Stack • AI / ML • Data",
    degree: "B.E. Information Technology",
    college: "Padre Conceição College of Engineering",
    collegeShort: "PCCE",
    cgpa: "8.7 / 10",
    educationPeriod: "August 2023 – June 2027",
    years: "2023 – 2027",
    heroSummary:
      "B.E. Information Technology student focused on software development, AI/ML, full-stack applications and data-driven solutions.",
    about: [
      "I am an Information Technology engineering student at Padre Conceição College of Engineering, Goa, with a strong interest in software development, full-stack development, artificial intelligence, machine learning, databases, and data-driven applications.",
      "I enjoy building practical software projects and exploring technologies that combine intelligent systems with real-world applications.",
    ],
  },

  objective:
    "Seeking opportunities to apply my skills in software development, web development, machine learning, databases, and data-driven applications while continuously improving my technical and problem-solving abilities.",

  skills: {
    programming: ["C", "C++", "Java", "Python", "JavaScript", "SQL"],
    web: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Node.js", "Express.js"],
    databases: ["MySQL", "MongoDB", "SQLite", "Oracle"],
    aiMl: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "TensorFlow",
      "OpenCV",
      "Librosa",
      "CNN",
      "LSTM",
    ],
    data: ["Data Analysis", "Data Visualization", "Tableau", "Excel"],
    tools: ["Git", "GitHub", "VS Code", "Figma"],
  },

  skillCategories: [
    { id: "programming", label: "Programming" },
    { id: "web", label: "Web Development" },
    { id: "databases", label: "Databases" },
    { id: "aiMl", label: "AI / Machine Learning" },
    { id: "data", label: "Data" },
    { id: "tools", label: "Tools" },
  ] as const,

  skillRelations: {
    Python: [
      "TensorFlow",
      "OpenCV",
      "Librosa",
      "CNN",
      "LSTM",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
    ],
    JavaScript: ["HTML5", "CSS3", "Node.js", "Express.js", "Tailwind CSS"],
    "Node.js": ["Express.js", "JavaScript"],
    "Express.js": ["Node.js", "JavaScript", "MySQL"],
    "HTML5": ["CSS3", "JavaScript", "Tailwind CSS"],
    "CSS3": ["HTML5", "JavaScript", "Tailwind CSS"],
    "Tailwind CSS": ["HTML5", "CSS3", "JavaScript"],
    SQL: ["MySQL", "SQLite", "Oracle"],
    MySQL: ["SQL", "Express.js", "Node.js"],
    SQLite: ["SQL"],
    Oracle: ["SQL"],
    MongoDB: [],
    TensorFlow: ["Python", "CNN", "LSTM", "Deep Learning", "Machine Learning"],
    OpenCV: ["Python", "Computer Vision", "Machine Learning"],
    Librosa: ["Python"],
    CNN: ["TensorFlow", "Deep Learning", "Python"],
    LSTM: ["TensorFlow", "Deep Learning", "Python"],
    "Computer Vision": ["OpenCV", "Python", "Deep Learning"],
    "Deep Learning": ["TensorFlow", "CNN", "LSTM", "Python"],
    "Machine Learning": ["Python", "TensorFlow", "OpenCV"],
    "Data Analysis": ["Data Visualization", "Tableau", "Excel"],
    "Data Visualization": ["Tableau", "Data Analysis", "Excel"],
    Tableau: ["Data Visualization", "Data Analysis", "Excel"],
    Excel: ["Data Analysis", "Data Visualization"],
    Git: ["GitHub"],
    GitHub: ["Git"],
    C: ["C++"],
    "C++": ["C"],
    Java: [],
    "VS Code": [],
    Figma: [],
  } as Record<string, string[]>,

  skillNotes: {
    Python: "Core language across AI, CV and data pipelines.",
    TensorFlow: "Model training and inference for neural networks.",
    OpenCV: "Frame, face and vision processing.",
    Librosa: "Audio feature extraction and analysis.",
    "Node.js": "Server runtime for the restaurant platform.",
    "Express.js": "REST API layer over the database.",
    MySQL: "Relational store for users, menus, orders and reservations.",
    JavaScript: "Client interactivity and Node.js services.",
    "Computer Vision": "Face, frame and expression analysis.",
  } as Record<string, string>,

  projects: [
    {
      id: 1,
      slug: "deepfake-ai-real-recognizer",
      title: "Deepfake & AI Real Recognizer",
      shortTitle: "Deepfake & AI Real Recognizer",
      number: "01",
      category: "AI / Machine Learning / Computer Vision",
      description:
        "An AI-based system focused on identifying whether multimedia content is real or manipulated, with additional emotion analysis capabilities.",
      problem:
        "As generative media becomes easier to produce, verifying whether video and audio are authentic is increasingly difficult without a structured analysis pipeline.",
      solution:
        "A multimodal system that extracts frames and audio, inspects facial and acoustic features, and runs dedicated models for deepfake analysis and emotion analysis before presenting a final result.",
      features: [
        "Deepfake video detection",
        "Real/fake classification",
        "Face emotion detection",
        "Voice emotion detection",
        "Audio analysis",
        "Frame-by-frame analysis",
        "Multimodal analysis",
        "Explainability and visualization",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "OpenCV",
        "FFmpeg",
        "Librosa",
        "Streamlit",
        "CNN",
        "LSTM",
        "EfficientNet",
        "Xception",
        "MTCNN",
      ],
      contribution:
        "Designed and implemented the analysis pipeline, model integration and visualization flow as an end-to-end system.",
      architecture: {
        kind: "flow" as const,
        nodes: [
          {
            id: "input",
            label: "Video / Audio Input",
            detail: "Source media enters the pipeline for inspection.",
          },
          {
            id: "extract",
            label: "Frame / Audio Extraction",
            detail: "FFmpeg and processing tools split visual frames and audio.",
          },
          {
            id: "features",
            label: "Face / Audio Features",
            detail: "MTCNN, OpenCV and Librosa isolate faces and acoustic features.",
          },
          {
            id: "models",
            label: "AI Models",
            detail: "CNN, LSTM, EfficientNet and Xception inspect the extracted signals.",
          },
          {
            id: "deepfake",
            label: "Deepfake Analysis",
            detail: "Classification toward real or manipulated media.",
          },
          {
            id: "emotion",
            label: "Emotion Analysis",
            detail: "Face and voice emotion signals are interpreted in parallel.",
          },
          {
            id: "result",
            label: "Final Result",
            detail: "A combined readout with visualization for explainability.",
          },
        ],
        edges: [
          ["input", "extract"],
          ["extract", "features"],
          ["features", "models"],
          ["models", "deepfake"],
          ["models", "emotion"],
          ["deepfake", "result"],
          ["emotion", "result"],
        ] as [string, string][],
      },
    },
    {
      id: 2,
      slug: "grillhouse-zomspy",
      title: "GrillHouse / Zomspy",
      shortTitle: "GrillHouse / Zomspy",
      number: "02",
      category: "Full-Stack Web Application / Restaurant Platform / DBMS",
      description:
        "A full-stack restaurant platform designed for restaurant discovery, menu browsing, cart management, orders, reservations, authentication and database-driven restaurant management.",
      problem:
        "Restaurant discovery, ordering, reservations and administration need a single database-backed application rather than disconnected pages.",
      solution:
        "A full-stack platform where the frontend talks to a Node.js and Express REST API, with MySQL storing users, restaurants, menus, orders, reservations and OTP records.",
      features: [
        "User authentication",
        "OTP verification",
        "Restaurant browsing",
        "Menu browsing",
        "Cart management",
        "Order management",
        "Restaurant reservations",
        "Admin functionality",
        "Database management",
        "Payment integration",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MySQL",
      ],
      contribution:
        "Built the application layers from interface through API routes to relational data modeling.",
      architecture: {
        kind: "stack" as const,
        nodes: [
          {
            id: "user",
            label: "User",
            detail: "Customer or administrator interacting with the platform.",
          },
          {
            id: "frontend",
            label: "Frontend",
            detail: "HTML5, CSS3, JavaScript and Tailwind CSS interface.",
          },
          {
            id: "node",
            label: "Node.js",
            detail: "Runtime for the application server.",
          },
          {
            id: "express",
            label: "Express.js",
            detail: "HTTP routing and middleware.",
          },
          {
            id: "api",
            label: "REST API",
            detail: "Endpoints for auth, menus, cart, orders and reservations.",
          },
          {
            id: "mysql",
            label: "MySQL",
            detail: "Persistent relational store for the platform.",
          },
        ],
        edges: [
          ["user", "frontend"],
          ["frontend", "node"],
          ["node", "express"],
          ["express", "api"],
          ["api", "mysql"],
        ] as [string, string][],
        entities: [
          { id: "users", label: "Users", related: ["otp", "orders", "reservations"] },
          { id: "restaurants", label: "Restaurants", related: ["menu", "reservations"] },
          { id: "menu", label: "Menu", related: ["restaurants", "orders"] },
          { id: "orders", label: "Orders", related: ["users", "menu"] },
          { id: "reservations", label: "Reservations", related: ["users", "restaurants"] },
          { id: "otp", label: "OTP", related: ["users"] },
        ],
      },
    },
    {
      id: 3,
      slug: "mood-detector-music-suggestor",
      title: "Mood Detector + Music Suggestor",
      shortTitle: "Mood Detector + Music Suggestor",
      number: "03",
      category: "AI / Computer Vision / Music Recommendation",
      description:
        "An AI-based application that accesses the user's camera and analyzes facial expressions for approximately 10 seconds, detects the user's mood, and recommends music based on the detected mood.",
      problem:
        "Music recommendations are more useful when they respond to how someone currently looks and feels, not only to static listening history.",
      solution:
        "A computer-vision workflow that samples facial expressions for about ten seconds, classifies mood, and then surfaces music suggestions for that mood.",
      features: [
        "Camera access",
        "Timed facial analysis",
        "Face detection",
        "Emotion / mood detection",
        "Mood classification",
        "Music recommendation",
      ],
      technologies: ["Computer Vision", "Machine Learning", "OpenCV", "Python"],
      contribution:
        "Implemented the analysis workflow from camera sampling through mood classification and recommendation presentation.",
      workflow: [
        "Camera Access",
        "10 Second Analysis",
        "Face Detection",
        "Emotion / Mood Detection",
        "Mood Classification",
        "Music Recommendation",
      ],
      architecture: {
        kind: "workflow" as const,
        nodes: [
          {
            id: "camera",
            label: "Camera Access",
            detail: "The application requests a camera feed for analysis.",
          },
          {
            id: "timer",
            label: "10 Second Analysis",
            detail: "Expressions are sampled for approximately ten seconds.",
          },
          {
            id: "face",
            label: "Face Detection",
            detail: "The face is located within the frame.",
          },
          {
            id: "emotion",
            label: "Emotion / Mood Detection",
            detail: "Facial cues are read as emotional signal.",
          },
          {
            id: "class",
            label: "Mood Classification",
            detail: "Signals are mapped to a mood class.",
          },
          {
            id: "music",
            label: "Music Recommendation",
            detail: "Tracks or playlists are suggested for that mood.",
          },
        ],
        edges: [
          ["camera", "timer"],
          ["timer", "face"],
          ["face", "emotion"],
          ["emotion", "class"],
          ["class", "music"],
        ] as [string, string][],
      },
    },
  ],

  education: [
    {
      id: "pcce",
      status: "Current",
      institution: "Padre Conceição College of Engineering",
      degree: "B.E. Information Technology",
      location: "Verna, Goa",
      period: "August 2023 – June 2027",
      scoreLabel: "CGPA",
      score: "8.7 / 10",
      scoreValue: 8.7,
      note: "Currently Pursuing",
      current: true,
    },
    {
      id: "hss",
      status: "Higher Secondary",
      institution: "Mushtifund Higher Secondary School",
      degree: "Science",
      location: "",
      period: "June 2021 – May 2022",
      scoreLabel: "Score",
      score: "74%",
      scoreValue: 74,
      note: "",
      current: false,
    },
    {
      id: "ssc",
      status: "10th",
      institution: "Mushtifund High School",
      degree: "",
      location: "",
      period: "June 2019 – May 2020",
      scoreLabel: "Score",
      score: "72%",
      scoreValue: 72,
      note: "",
      current: false,
    },
  ],

  leadership: [
    {
      event: "Techyon 2025",
      organization: "Padre Conceição College of Engineering",
      type: "Technical Fest",
      role: "Finance Head",
    },
  ],

  resume: {
    url: "/resume.pdf",
    note: "Place your résumé PDF at public/resume.pdf to enable download.",
  },

  contact: {
    heading: "Let's connect",
    text: "Have an opportunity, project or idea? I'd love to hear from you.",
    linkedin: "https://www.linkedin.com/in/aditya-verlekar-81990b287/",
    github: "https://github.com/adiitya20",
    instagram: "https://www.instagram.com/adityaverlekar_/",
    phone: "",
    email: "",
  },

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ],

  progress: [
    { id: "intro", label: "Intro", target: "hero" },
    { id: "skills", label: "Skills", target: "skills" },
    { id: "projects", label: "Projects", target: "projects" },
    { id: "education", label: "Education", target: "education" },
    { id: "contact", label: "Contact", target: "contact" },
  ],
} as const;

export type PortfolioData = typeof portfolioData;
export type Project = (typeof portfolioData.projects)[number];
export type SkillCategoryId = (typeof portfolioData.skillCategories)[number]["id"];

export function getProjectBySlug(slug: string) {
  return portfolioData.projects.find((project) => project.slug === slug);
}

export const allSkills = portfolioData.skillCategories.flatMap((category) =>
  portfolioData.skills[category.id].map((name) => ({
    name,
    category: category.id,
    categoryLabel: category.label,
  })),
);

export const projectSkillMap: Record<string, string[]> = {
  "deepfake-ai-real-recognizer": [
    "Python",
    "TensorFlow",
    "OpenCV",
    "Librosa",
    "CNN",
    "LSTM",
  ],
  "grillhouse-zomspy": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MySQL",
  ],
  "mood-detector-music-suggestor": ["Python", "OpenCV", "Computer Vision", "Machine Learning"],
};
