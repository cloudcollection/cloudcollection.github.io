import { useEffect, useRef, useState } from "react";

const focusAreas = [
  "Applied statistical modeling",
  "Time-series forecasting",
  "Financial risk modeling",
  "Geospatial data analytics"
];

const projects = [
  {
    title: "VaR Forecasting and Backtesting for SPY Returns",
    type: "Financial risk modeling",
    summary: "A comparative workflow across historical simulation, econometric models, quantile regression, and neural quantile methods, with backtesting as the core evidence layer.",
    situation: "Measuring downside risk for SPY returns requires models that can be compared under the same backtesting protocol.",
    action: "Implemented traditional, econometric, quantile, and neural forecasting approaches with consistent evaluation.",
    result: "Produced a risk-modeling study centered on exceedance behavior, coverage tests, and model-risk interpretation.",
    methods: ["Historical Simulation", "GARCH", "Quantile Regression", "MLP", "QRNN", "Kupiec Test", "Christoffersen Test"]
  },
  {
    title: "Influenza Activity Forecasting with Time-Series Models",
    type: "Time-series modeling",
    summary: "A public-health forecasting project comparing statistical and machine-learning models while tracking lag structure, external signals, and interpretability.",
    situation: "Influenza activity has seasonal structure, trend shifts, and public-health reporting noise.",
    action: "Compared classical time-series models and machine-learning baselines while reviewing external signals and lag relationships.",
    result: "Created a thesis-oriented forecasting framework with interpretable model comparisons and reproducible analysis notes.",
    methods: ["SARIMA", "SARIMAX", "Prophet", "LightGBM", "Granger Causality", "ECM"]
  },
  {
    title: "UNESCO Heritage Boundary Data Processing",
    type: "Spatial data processing",
    summary: "A geospatial data project focused on source verification, boundary retrieval, coordinate validation, and reproducible GeoJSON packaging.",
    situation: "Heritage-site boundary data often lacks clean, directly reusable polygons across public sources.",
    action: "Checked source reliability, retrieved boundaries, validated coordinates, and packaged outputs with provenance notes.",
    result: "Built evidence for careful data engineering, spatial validation, and reproducible geospatial processing.",
    methods: ["Web crawling", "GeoJSON", "GIS validation", "Spatial cleaning", "Coordinate matching"]
  },
  {
    title: "Foshan Lion Dance Cultural IP Market Research",
    type: "Survey analytics",
    summary: "End-to-end research analytics from survey design and 800+ responses to segmentation, statistical modeling, and report recommendations.",
    situation: "The museum needed evidence on audience awareness, preferences, and engagement willingness for cultural-IP promotion.",
    action: "Designed surveys, cleaned responses, modeled audience segments, and translated findings into report recommendations.",
    result: "Delivered a data-backed research contribution connecting public perception, segmentation, and cultural-tourism strategy.",
    methods: ["Survey design", "Clustering", "Logistic Regression", "Factor Analysis", "Report writing"]
  }
];


const modelingPapers = [
  {
    title: "Sustainable Tourism Capacity Assessment and Policy Optimization",
    event: "MCM/ICM 2025",
    background: "A quantitative framework for evaluating tourism sustainability under environmental, economic, and social pressure.",
    contributions: ["Designed a three-dimensional indicator system covering environmental, economic, and social factors.", "Applied CRITIC and entropy weighting, then constructed a TOPSIS-based composite sustainability index.", "Conducted sensitivity analysis and validated transferability with a Macau case study."],
    methods: ["CRITIC", "Entropy Weighting", "TOPSIS", "Sensitivity Analysis", "MATLAB"]
  },
  {
    title: "Industrial Investment Structure and Sustainable Development in China",
    event: "HUASHU 2025",
    background: "An empirical modeling study on long-term industrial investment, growth, employment, and environmental performance.",
    contributions: ["Conducted ADF stationarity tests on investment data from 1979 to 2023.", "Built multiple regression models to estimate marginal investment effects.", "Supported scenario analysis using multi-objective optimization."],
    methods: ["Time Series", "ADF Test", "Multiple Regression", "Optimization", "Python", "MATLAB"]
  },
  {
    title: "Demand Forecasting and Warehouse Allocation for E-commerce",
    event: "MathorCup 2025",
    background: "A demand forecasting and capacity planning project for volatile e-commerce logistics systems.",
    contributions: ["Conducted correlation analysis and product category classification.", "Compared SARIMA, Random Forest, and GM(1,1) forecasting models.", "Used forecast outputs to support warehouse allocation decisions."],
    methods: ["SARIMA", "Random Forest", "GM(1,1)", "Forecast Error Analysis", "Multi-objective Programming", "Python"]
  },
  {
    title: "Sampling Inspection and Multi-stage Decision Optimization",
    event: "National Mathematical Modeling Competition 2025",
    background: "A decision optimization model for balancing quality assurance and cost efficiency in multi-stage manufacturing.",
    contributions: ["Developed sampling inspection schemes under varying confidence levels.", "Analyzed statistical properties of alternative inspection strategies.", "Built a multi-stage decision model for long-term cost-benefit trade-offs."],
    methods: ["Sampling Inspection", "Statistical Decision Analysis", "Dynamic Programming", "MATLAB", "Python"]
  }
];

const experiences = [
  {
    organization: "The Hong Kong University of Science and Technology (Guangzhou)",
    role: "Research Assistant, geospatial data processing",
    dates: "Apr 2026 - Present",
    logo: "/assets/logos/hkust-gz.png",
    logoTone: "dark",
    logoShape: "fill",
    points: [
      "Supported structured data processing, source verification, and reproducible boundary packaging for heritage-site spatial data.",
      "Worked with data reliability, automation, and GIS validation in a research-support setting."
    ]
  },
  {
    organization: "Foshan Ancestral Temple Museum",
    role: "Data Analysis and Research Assistant",
    dates: "Nov 2024 - Apr 2025",
    logo: "/assets/logos/fszm-new.png",
    points: [
      "Designed and distributed surveys, collected 800+ responses, and supported expert interviews.",
      "Cleaned and visualized survey data in Python, R, and SPSS.",
      "Applied clustering, logistic regression, and factor analysis to segment audiences and evaluate engagement willingness."
    ]
  },
  {
    organization: "Zhongyan Technology",
    role: "Data Analysis Assistant",
    dates: "Jun 2025 - Sep 2025",
    logo: "/assets/logos/wjx-new.png",
    points: [
      "Contributed to SPSSPRO case materials connecting multivariate statistical methods with practical business-analysis scenarios.",
      "Worked with PCA, K-Means clustering, regression, discriminant analysis, and association-rule examples."
    ]
  },
  {
    organization: "DataPi, School of Software, Tsinghua University",
    role: "Technical Writing Contributor",
    dates: "Mar 2025 - Present",
    logo: "/assets/logos/tsinghua-datapi-2026.png",
    logoShape: "wide",
    points: [
      "Translated and wrote technical articles on Transformer visualization, AI agents, and multi-armed bandits.",
      "Produced one Chinese Transformer article with 2,000+ views and 400+ shares."
    ]
  },
  {
    organization: "Cainiao Network",
    role: "Operations Trainee",
    dates: "Jan 2026 - Mar 2026",
    logo: "/assets/logos/cainiao.png",
    points: [
      "Completed cross-border logistics practice work involving user-behavior analysis, competitive research, and content planning."
    ]
  },
  {
    organization: "NetEase Media",
    role: "Campus Content Creator",
    dates: "Mar 2026 - May 2026",
    logo: "/assets/logos/netease-bee-2026.png",
    logoShape: "wide",
    points: [
      "Planned and published 20+ original feature stories, supporting campus content operation and community engagement.",
      "Managed NetEase Little Bee ranking-list operations, organizing 210+ candidate profiles and supporting 350+ interactive comments.",
      "Reviewed post-performance data and adjusted publishing rhythm and copy style based on platform features and user preferences."
    ]
  }
];

const skillGroups = [
  { icon: "Py", group: "Programming and Data", skills: "Python, R, SQL, MATLAB" },
  { icon: "R", group: "Statistical Modeling", skills: "Regression, Time Series, SARIMA, SARIMAX, Quantile Regression, VaR Backtesting" },
  { icon: "ML", group: "Machine Learning", skills: "LightGBM, XGBoost, scikit-learn, PyTorch basics" },
  { icon: "GIS", group: "Visualization and GIS", skills: "Power BI, ArcGIS, Origin, Matplotlib, SPSS" },
  { icon: "TeX", group: "Writing and Reproducibility", skills: "LaTeX, Markdown, GitHub, EndNote" }
];

function SplitReveal({ text }) {
  const words = text.split(" ");
  return (
    <span className="split-reveal" aria-label={text}>
      {words.map((word, index) => (
        <span className="word-wrap" aria-hidden="true" key={`${word}-${index}`}>
          <span className="word" style={{ "--delay": `${index * 38}ms` }}>{word}</span>
        </span>
      ))}
    </span>
  );
}

function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  function handlePointerMove(event) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <article ref={ref} className={`spotlight-card ${className}`} onPointerMove={handlePointerMove}>
      {children}
    </article>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="icon-button" type="button" aria-label="Toggle color theme" onClick={() => setDark((value) => !value)}>
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#top" aria-label="Ziyi ZHOU home">
            <span>Ziyi ZHOU</span>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#projects">Projects</a>
            <a href="#modeling">Papers</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="https://github.com/cloudcollection" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://blog.csdn.net/2401_83712180?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer">CSDN</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyeline">B.Sc. Statistics, Guangzhou University</p>
            <h1><SplitReveal text="Applied statistics and data science portfolio." /></h1>
            <p className="hero-summary">
              My work focuses on statistical modeling, time-series forecasting, financial risk measurement, survey analytics, and geospatial data processing. This portfolio collects selected projects, research experience, and technical materials in a concise academic format.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">View selected projects</a>
              <a className="button secondary" href="/documents/ziyi-zhou-cv.pdf" target="_blank" rel="noreferrer">Download CV</a>
              <a className="button secondary" href="mailto:XiaoZhou_013@outlook.com">Contact by email</a>
            </div>
            <div className="link-rail" aria-label="Quick links">
              <a href="https://github.com/cloudcollection" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:XiaoZhou_013@outlook.com">Email</a>
              <a href="https://blog.csdn.net/2401_83712180?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer">CSDN Blog</a>
              <a href="#materials">Academic materials</a>
            </div>
            <div className="focus-strip" aria-label="Academic focus areas">
              {focusAreas.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>

          <SpotlightCard className="profile-card">
            <img className="portrait" src="/assets/images/avatar.jpg" alt="Academic profile visual for Ziyi ZHOU" />
            <div className="profile-body">
              <h2>Ziyi ZHOU</h2>
              <p>B.Sc. in Statistics, Guangzhou University</p>
              <dl className="facts">
                <div><dt>GPA</dt><dd>3.64 / 4.0, Top 10%</dd></div>
                <div><dt>Focus</dt><dd>Applied statistics and data science</dd></div>
                <div><dt>Location</dt><dd>Guangzhou, Guangdong</dd></div>
              </dl>
            </div>
          </SpotlightCard>
        </section>

        <section className="section shell" id="projects">
          <Reveal className="section-heading">
            <p className="section-label">Selected work</p>
            <h2>Projects with methods, data, and validation.</h2>
            <p>Each project is framed around modeling choices, data judgment, and verifiable output, rather than a flat list of activities.</p>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <SpotlightCard className={index === 0 ? "project-card featured" : "project-card"} key={project.title}>
                <div>
                  <p className="project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="case-lines">
                    <p><strong>Situation</strong>{project.situation}</p>
                    <p><strong>Action</strong>{project.action}</p>
                    <p><strong>Result</strong>{project.result}</p>
                  </div>
                </div>
                <ul className="tag-list">
                  {project.methods.map((method) => <li key={method}>{method}</li>)}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section className="section shell materials" id="materials">
          <Reveal className="section-heading compact">
            <p className="section-label">Academic materials</p>
            <h2>Downloadable academic materials.</h2>
          </Reveal>
          <div className="material-row">
            {[
              { title: "CV", body: "Education, projects, competitions, and verified dates.", href: "/documents/ziyi-zhou-cv.pdf", label: "Open CV" },
              { title: "Technical Portfolio", body: "Selected project evidence, technical work, and portfolio materials.", href: "/documents/ziyi-zhou-portfolio.pdf", label: "Open portfolio" },
              { title: "Evidence Portfolio", body: "Internship, project, and competition proof can be added as a separate packet.", href: null, label: null },
              { title: "Writing Sample", body: "Research writing, technical translation, or applied statistical report can be added here.", href: null, label: null }
            ].map(({ title, body, href, label }) => (
              <SpotlightCard className="material-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                {href ? <a className="material-link" href={href} target="_blank" rel="noreferrer">{label}</a> : <span className="material-note">Pending file</span>}
              </SpotlightCard>
            ))}
          </div>
        </section>



        <section className="section shell" id="modeling">
          <Reveal className="section-heading">
            <p className="section-label">Mathematical modeling papers</p>
            <h2>Competition papers with statistical modeling and decision analysis.</h2>
            <p>These papers summarize my modeling competition work across sustainability assessment, investment structure, demand forecasting, and production decision optimization.</p>
          </Reveal>
          <div className="paper-grid">
            {modelingPapers.map((paper) => (
              <SpotlightCard className="paper-card" key={paper.title}>
                <div>
                  <p className="project-type">{paper.event}</p>
                  <h3>{paper.title}</h3>
                  <p>{paper.background}</p>
                </div>
                <ul className="paper-points">
                  {paper.contributions.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <ul className="tag-list">
                  {paper.methods.map((method) => <li key={method}>{method}</li>)}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section className="section shell" id="experience">
          <Reveal className="section-heading">
            <p className="section-label">Experience</p>
            <h2>Research, analytics, and geospatial data processing.</h2>
            <p>Experience is organized by its relevance to research, statistical analysis, and reproducible data work.</p>
          </Reveal>
          <div className="timeline">
            {experiences.map((item) => (
              <Reveal className="experience-item" key={item.organization}>
                <div className="experience-aside">
                  <div className={["logo-shell", item.logoTone === "dark" ? "logo-dark" : "", item.logoShape === "wide" ? "logo-wide" : "", item.logoShape === "fill" ? "logo-fill" : ""].filter(Boolean).join(" ")}>
                    {item.logo ? <img src={item.logo} alt={`${item.organization} logo`} /> : <span className="text-logo">{item.logoText || "RA"}</span>}
                  </div>
                  <span className="date-chip">{item.dates}</span>
                </div>
                <div>
                  <h3>{item.organization}</h3>
                  <p className="role">{item.role}</p>
                  <ul>
                    {item.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section shell split-section" id="education">
          <Reveal className="education-panel">
            <img className="education-logo" src="/assets/logos/gzhu-2026.png" alt="Guangzhou University logo" />
            <p className="section-label">Education</p>
            <h2>Guangzhou University</h2>
            <p><strong>Bachelor of Science in Statistics</strong>, School of Economics and Statistics, Sep 2022 - Jun 2026.</p>
            <p>GPA: 3.64 / 4.0, Top 10%. Core coursework includes Mathematical Analysis, Advanced Algebra, Probability and Statistics, Regression Analysis, Time Series Analysis, Statistical Computing, and Data Mining.</p>
          </Reveal>
          <Reveal className="award-panel">
            <p className="section-label">Recognition</p>
            <ul>
              <li>MCM/ICM, Honorable Mention, May 2025.</li>
              <li>National College Student Market Survey and Analysis Competition, First Prize, May 2025.</li>
              <li>National College Business Elite Challenge, Cultural Tourism and Exhibition Innovation & Entrepreneurship Practice Competition, Second Prize, November 2025.</li>
              <li>National College Students Mathematical Modeling Competition, Second Prize, Guangdong Region, December 2024.</li>
              <li>National College Students Statistical Modeling Competition, Second Prize, Guangdong Region, July 2024.</li>
              <li>Lanqiao Cup National Software and Information Technology Talent Competition, Third Prize, Guangdong Region, April 2024.</li>
              <li>First-Class Comprehensive Scholarship and Outstanding Student honors, 2025 and 2026.</li>
            </ul>
          </Reveal>
        </section>

        <section className="section shell split-section" id="skills">
          <Reveal className="skills-panel">
            <p className="section-label">Technical skills</p>
            <h2>Grouped for academic signal.</h2>
          </Reveal>
          <div className="skill-grid">
            {skillGroups.map(({ icon, group, skills }) => (
              <SpotlightCard className="skill-card" key={group}>
                <div className="skill-heading"><span className="skill-icon" aria-hidden="true">{icon}</span><h3>{group}</h3></div>
                <p>{skills}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <span>Copyright 2026 Ziyi ZHOU. Academic portfolio.</span>
          <span><a href="mailto:XiaoZhou_013@outlook.com">XiaoZhou_013@outlook.com</a> / <a href="https://github.com/cloudcollection" target="_blank" rel="noreferrer">github.com/cloudcollection</a> / <a href="https://blog.csdn.net/2401_83712180?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer">CSDN Blog</a></span>
        </div>
      </footer>
    </>
  );
}

export default App;
