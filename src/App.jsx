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
    evidence: ["Unified backtesting protocol", "Exceedance and coverage diagnostics", "Model-risk interpretation"],
    methods: ["Historical Simulation", "GARCH", "Quantile Regression", "MLP", "QRNN", "Kupiec Test", "Christoffersen Test"]
  },
  {
    title: "Influenza Activity Forecasting with Time-Series Models",
    type: "Time-series modeling",
    summary: "A public-health forecasting project comparing statistical and machine-learning models while tracking lag structure, external signals, and interpretability.",
    situation: "Influenza activity has seasonal structure, trend shifts, and public-health reporting noise.",
    action: "Compared classical time-series models and machine-learning baselines while reviewing external signals and lag relationships.",
    result: "Created a thesis-oriented forecasting framework with interpretable model comparisons and reproducible analysis notes.",
    evidence: ["Seasonality and lag structure", "Baseline-to-ML model comparison", "Forecast interpretation notes"],
    methods: ["SARIMA", "SARIMAX", "Prophet", "LightGBM", "Granger Causality", "ECM"]
  },
  {
    title: "Foshan Lion Dance Cultural IP Market Research",
    type: "Survey analytics",
    summary: "End-to-end research analytics from survey design and 800+ responses to segmentation, statistical modeling, and report recommendations.",
    situation: "The museum needed evidence on audience awareness, preferences, and engagement willingness for cultural-IP promotion.",
    action: "Designed surveys, cleaned responses, modeled audience segments, and translated findings into report recommendations.",
    result: "Delivered a data-backed research contribution connecting public perception, segmentation, and cultural-tourism strategy.",
    evidence: ["800+ survey responses", "Audience segmentation", "Regression-based engagement analysis"],
    methods: ["Survey design", "Clustering", "Logistic Regression", "Factor Analysis", "Report writing"]
  },
  {
    title: "UNESCO Heritage Boundary Data Processing",
    type: "Reproducible data engineering",
    summary: "A supporting geospatial data project focused on source verification, boundary retrieval, coordinate validation, and reusable GeoJSON packaging.",
    situation: "Heritage-site boundary data often lacks clean, directly reusable polygons across public sources.",
    action: "Checked source reliability, retrieved boundaries, validated coordinates, and packaged outputs with provenance notes.",
    result: "Built evidence for careful data engineering, spatial validation, and reproducible research support.",
    evidence: ["Source reliability checks", "Coordinate validation", "Provenance notes"],
    methods: ["Web crawling", "GeoJSON", "GIS validation", "Spatial cleaning", "Coordinate matching"]
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
    dates: "Jul 2026 - Present",
    category: "Research and analytics",
    logo: "/assets/logos/hkust-gz.png",
    logoTone: "dark",
    logoShape: "fill",
    points: [
      "Task: Support a research workflow where heritage-site spatial data required source verification and reusable boundary packages.",
      "Action: Processed structured geospatial materials, checked source reliability, validated coordinates, and organized reproducible GeoJSON outputs.",
      "Result: Improved data traceability and reduced ambiguity in research-support materials for downstream spatial analysis."
    ]
  },
  {
    organization: "Foshan Ancestral Temple Museum",
    role: "Data Analysis and Research Assistant",
    dates: "Nov 2024 - Apr 2025",
    category: "Research and analytics",
    logo: "/assets/logos/fszm-new.png",
    points: [
      "Situation: The museum needed evidence on audience awareness, preferences, and engagement willingness for Foshan lion dance cultural IP promotion.",
      "Action: Designed and distributed surveys, collected 800+ responses, supported interviews, and cleaned data in Python, R, and SPSS.",
      "Result: Applied clustering, logistic regression, and factor analysis to produce audience segmentation and engagement insights for report recommendations."
    ]
  },
  {
    organization: "Zhongyan Technology",
    role: "Data Analysis Assistant",
    dates: "Sep 2025",
    category: "Research and analytics",
    logo: "/assets/logos/wjx-new.png",
    points: [
      "Task: Help convert multivariate statistical methods into applied SPSSPRO case materials for business-analysis users.",
      "Action: Organized examples covering PCA, K-Means clustering, regression, discriminant analysis, factor analysis, and association rules.",
      "Result: Produced clearer method-to-scenario materials that made statistical workflows easier for applied users to follow."
    ]
  },
  {
    organization: "DataPi, School of Software, Tsinghua University",
    role: "Technical Writing Contributor",
    dates: "Mar 2025 - Present",
    category: "Research and analytics",
    logo: "/assets/logos/tsinghua-datapi-2026.png",
    logoShape: "wide",
    points: [
      "Task: Make AI topics such as Transformer visualization, AI agents, multi-armed bandits, and AI for time-series data accessible to Chinese technical readers.",
      "Action: Translated, reorganized, and rewrote technical material into structured explainers with clearer logic and visual explanation.",
      "Result: Published 4 tracked DataPi articles with 10,181 recorded reads, 1,677 shares, and 77 saves; the Transformer explainer reached 7,013 reads and 1,294 shares."
    ]
  },
  {
    organization: "Cainiao Network",
    role: "Operations Trainee, cross-border logistics market research",
    dates: "Jan 2026 - Mar 2026",
    category: "Research and analytics",
    logo: "/assets/logos/cainiao.png",
    points: [
      "Situation: Cainiao's U.S. cross-border consolidation research needed a bounded view of China/Asia-to-U.S. small parcels, consolidation, overseas-warehouse replenishment, and reverse logistics.",
      "Action: Organized U.S. Census, policy, news, and Cainiao network sources to support demand framing, de minimis policy-risk analysis, and competitive positioning.",
      "Result: Contributed to TAM/SAM/SOM sizing, scenario and sensitivity analysis, customer-scenario segmentation, KPI dashboard design, and A/B test planning recommendations."
    ]
  },
  {
    organization: "NetEase Media",
    role: "Campus Content Creator",
    dates: "Mar 2026 - May 2026",
    category: "Additional experience",
    logo: "/assets/logos/netease-bee-2026.png",
    logoShape: "wide",
    points: [
      "Task: Support campus content operation and community engagement through regular feature-story production and ranking-list activities.",
      "Action: Published 20+ original feature stories, organized 210+ candidate profiles, and supported 350+ interactive comments for NetEase Little Bee operations.",
      "Result: Used post-performance data to adjust publishing rhythm and copy style according to platform features and user preferences."
    ]
  }
];


const skillGroups = [
  {
    icon: "ST",
    group: "Statistical Modeling",
    summary: "Model selection, diagnostics, and uncertainty-focused evaluation for forecasting, risk, and survey data.",
    tools: ["Regression", "Time Series", "SARIMA/SARIMAX", "Quantile Regression", "GARCH", "VaR Backtesting", "ADF/Granger", "Factor Analysis", "Welch t-test", "A/B Power Planning"]
  },
  {
    icon: "Py",
    group: "Programming and Data Workflow",
    summary: "Daily analysis stack for cleaning, modeling, notebooks, and reproducible project organization.",
    tools: ["Python", "R", "SQL", "MATLAB", "Pandas", "NumPy", "Jupyter", "VS Code"]
  },
  {
    icon: "AI",
    group: "Machine Learning and AI Tools",
    summary: "Applied ML methods plus AI-assisted coding, reading, translation, and technical explanation workflows.",
    tools: ["scikit-learn", "LightGBM", "XGBoost", "PyTorch basics", "Transformer literacy", "AI agents", "Multi-armed bandits", "ChatGPT/Codex", "GitHub Copilot", "Prompt-assisted research"]
  },
  {
    icon: "DB",
    group: "Databases and Reproducibility",
    summary: "Versioned analysis materials, database access, and clean handoff files for academic or team review.",
    tools: ["MySQL", "PostgreSQL", "Navicat", "Git", "GitHub", "Markdown", "LaTeX", "EndNote"]
  },
  {
    icon: "VIS",
    group: "Visualization, BI, and GIS",
    summary: "Visualization and spatial-data tools used for reports, dashboards, geospatial validation, and survey outputs.",
    tools: ["Matplotlib", "Power BI", "Excel PivotTables", "Origin", "SPSS", "KPI Dashboards", "ArcGIS", "QGIS", "GeoJSON"]
  },
  {
    icon: "WR",
    group: "Research Communication",
    summary: "Turning statistical and AI work into readable reports, technical notes, competition papers, and public-facing explainers.",
    tools: ["Report Writing", "Technical Translation", "Market Research", "TAM/SAM/SOM", "WeChat Articles", "CSDN Notes", "Survey Design", "Research Slides", "Visual Explanation", "Article Analytics"]
  }
];

function SplitReveal({ text }) {
  const words = text.split(" ");
  return (
    <span className="split-reveal" aria-label={text}>
      {words.map((word, index) => (
        <span className="word-wrap" aria-hidden="true" key={`${word}-${index}`}>
          <span className="word" style={{ "--delay": `${index * 38}ms` }}>{word}</span>{index < words.length - 1 ? " " : ""}
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
    <button className="icon-button theme-toggle" type="button" aria-label="Toggle color theme" onClick={() => setDark((value) => !value)}>
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
                <div><dt>GPA</dt><dd>3.64 / 4.00; 6 / 77, Top 8%</dd></div>
                <div><dt>Focus</dt><dd>Applied statistics and data science</dd></div>
                <div><dt>Location</dt><dd>Guangzhou, Guangdong</dd></div>
              </dl>
            </div>
          </SpotlightCard>
        </section>

        <section className="section shell" id="projects">
          <Reveal className="section-heading">
            <p className="section-label">Selected work</p>
            <h2>Flagship projects with data, diagnostics, and validation.</h2>
            <p>The first two projects define my main academic line: applied statistics for forecasting and risk measurement. Supporting projects show survey modeling and reproducible data work.</p>
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
                  <ul className="evidence-list" aria-label={`${project.title} evidence`}>
                    {project.evidence.map((item) => <li key={item}>{item}</li>)}
                  </ul>
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
            <h2>Research and analytics experience first.</h2>
            <p>Academic and data-analysis roles are separated from broader operations and content experience so the statistics signal stays clear.</p>
          </Reveal>
          <div className="timeline">
            {["Research and analytics", "Additional experience"].map((category) => (
              <div className="experience-group" key={category}>
                <h3>{category}</h3>
                {experiences.filter((item) => item.category === category).map((item) => (
                  <Reveal className={category === "Additional experience" ? "experience-item secondary-experience" : "experience-item"} key={item.organization}>
                    <div className="experience-aside">
                      <div className={["logo-shell", item.logoTone === "dark" ? "logo-dark" : "", item.logoShape === "wide" ? "logo-wide" : "", item.logoShape === "fill" ? "logo-fill" : ""].filter(Boolean).join(" ")}>
                        {item.logo ? <img src={item.logo} alt={`${item.organization} logo`} /> : <span className="text-logo">{item.logoText || "RA"}</span>}
                      </div>
                      <span className="date-chip">{item.dates}</span>
                    </div>
                    <div>
                      <h4>{item.organization}</h4>
                      <p className="role">{item.role}</p>
                      <ul>
                        {item.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section shell" id="education">
          <Reveal className="section-heading">
            <p className="section-label">Education</p>
            <h2>Academic foundation in statistics.</h2>
            <p>Education is presented with the same evidence-first layout as the rest of the portfolio: degree context, ranking signal, core coursework, and selected recognition.</p>
          </Reveal>
          <div className="education-grid compact-education-grid">
            <SpotlightCard className="education-card degree-card compact-degree-card">
              <div className="degree-header">
                <div>
                  <p className="project-type">Undergraduate education</p>
                  <h3>B.Sc. in Statistics</h3>
                  <p><strong>School of Economics and Statistics</strong>, Guangzhou University, Sep 2022 - Jun 2026.</p>
                </div>
                <img className="education-logo compact-education-logo" src="/assets/logos/gzhu-2026.png" alt="Guangzhou University logo" />
              </div>
              <dl className="education-facts compact-education-facts">
                <div><dt>GPA</dt><dd>3.64 / 4.00</dd></div>
                <div><dt>Average</dt><dd>90.16 / 100</dd></div>
                <div><dt>Rank</dt><dd>6 / 77, Top 8%</dd></div>
              </dl>
              <div className="coursework-block">
                <p className="mini-label">Core coursework</p>
                <ul className="tag-list education-tags" aria-label="Core coursework">
                  {["Mathematical Analysis", "Advanced Algebra", "Probability and Statistics", "Regression Analysis", "Time Series Analysis", "Statistical Computing", "Data Mining"].map((course) => <li key={course}>{course}</li>)}
                </ul>
              </div>
            </SpotlightCard>
            <SpotlightCard className="education-card recognition-card compact-recognition-card">
              <p className="project-type">Recognition</p>
              <h3>Selected awards and scholarships</h3>
              <ul>
                <li><strong>MCM/ICM</strong><span>Honorable Mention, May 2025</span></li>
                <li><strong>Market Survey and Analysis Competition</strong><span>National First Prize, May 2025</span></li>
                <li><strong>Business Elite Challenge Competition</strong><span>National Second Prize, Nov 2025</span></li>
                <li><strong>Mathematical Modeling Competition</strong><span>Guangdong Second Prize, Dec 2024</span></li>
                <li><strong>Statistical Modeling Competition</strong><span>Guangdong Second Prize, Jul 2024</span></li>
                <li><strong>Lanqiao Cup</strong><span>Guangdong Third Prize, Apr 2024</span></li>
                <li><strong>Scholarships and honors</strong><span>First-Class Comprehensive Scholarship and Outstanding Student, 2025-2026</span></li>
              </ul>
            </SpotlightCard>
          </div>
        </section>

        <section className="section shell skills-section" id="skills">
          <Reveal className="skills-panel">
            <p className="section-label">Technical skills</p>
            <h2>Tools organized by research workflow.</h2>
            <p>Skills are grouped by how they support modeling, data work, AI-assisted research, visualization, and evidence-based communication.</p>
          </Reveal>
          <div className="skill-grid">
            {skillGroups.map(({ group, summary, tools }) => (
              <SpotlightCard className="skill-card" key={group}>
                <div className="skill-heading"><h3>{group}</h3></div>
                <p>{summary}</p>
                <ul className="skill-tags" aria-label={`${group} tools`}>
                  {tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <span>Copyright 2026 Ziyi ZHOU. Academic portfolio. Updated Jul 2026.</span>
          <span><a href="mailto:XiaoZhou_013@outlook.com">XiaoZhou_013@outlook.com</a> / <a href="https://github.com/cloudcollection" target="_blank" rel="noreferrer">github.com/cloudcollection</a> / <a href="https://blog.csdn.net/2401_83712180?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer">CSDN Blog</a></span>
        </div>
      </footer>
    </>
  );
}

export default App;
