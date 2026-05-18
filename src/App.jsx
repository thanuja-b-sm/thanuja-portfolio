import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const projects = [
  {
    name: "SmartEats – Online Food Delivery Platform",
    category: "Full-Stack Web Application",
    summary:
      "A connected food delivery system for customers, restaurants, delivery partners, and admins, designed to manage ordering, menus, tracking, and business operations smoothly.",
    points: [
      "Customer, restaurant, and delivery modules",
      "Order and menu management",
      "Business and delivery tracking",
    ],
    accent: "from-zinc-950 via-slate-900 to-blue-950",
  },
  {
    name: "Nivārana – Hospital Management System",
    category: "Desktop System Development",
    summary:
      "A hospital management system built with Java Swing, SQL, and Jasper Reports, focused on clean workflows for records, operations, and reporting.",
    points: [
      "Java Swing interface",
      "SQL-driven data handling",
      "Jasper report generation",
    ],
    accent: "from-neutral-950 via-stone-900 to-emerald-950",
  },
  {
    name: "Data Analysis Algorithm Project",
    category: "AI + Business Analytics",
    summary:
      "A microbusiness-focused analytics concept using Python and AI to help small businesses understand patterns, make better decisions, and work smarter.",
    points: [
      "Python-based data logic",
      "AI-assisted insights",
      "Small business analytics",
    ],
    accent: "from-zinc-950 via-slate-900 to-violet-950",
  },
];

const stack = [
  {
    name: "HTML",
    desc: "Structure, semantics, clean foundations",
    value: 92,
    logo: "/logos/html5.svg",
  },
  {
    name: "CSS",
    desc: "Layout, responsive polish, visual rhythm",
    value: 90,
    logo: "/logos/css3.svg",
  },
  {
    name: "JavaScript",
    desc: "Logic, interaction, UI behavior",
    value: 88,
    logo: "/logos/javascript.svg",
  },
  {
    name: "React",
    desc: "Backend workflows and web systems",
    value: 78,
    logo: "/logos/react.svg",
  },
  {
    name: "Java",
    desc: "Desktop apps, OOP, system thinking",
    value: 82,
    logo: "/logos/java.svg",
  },
  {
    name: "MySQL",
    desc: "Database design and query handling",
    value: 80,
    logo: "/logos/mysql.svg",
  },
];

const timelineNodes = [
  {
    year: "2016 – 2023",
    title: "Gankanda Central College, Ratnapura",
    desc: "Built a strong academic foundation and completed school education with discipline and curiosity.",
    x: 250,
    y: 180,
    side: "left",
    badge: "STC",
    threshold: 0.08,
  },
  {
    year: "2024 – Present",
    title: "University of Colombo",
    desc: "Pursuing BICT(Hons) in Information and Communication Technology, currently in the second year.",
    x: 1250,
    y: 430,
    side: "right",
    badge: "UOC",
    threshold: 0.32,
  },
  {
    year: "2023 – Present",
    title: "Java Institute for Advanced Technology",
    desc: "Studying Software Engineering with a focus on programming, practical systems, and development workflows.",
    x: 250,
    y: 780,
    side: "left",
    badge: "JAT",
    threshold: 0.56,
  },
  {
    year: "Now",
    title: "Creative + Technical Growth",
    desc: "Building skills in web development, AI/ML, cybersecurity, data science, content creation, and personal branding.",
    x: 1250,
    y: 1120,
    side: "right",
    badge: "GRO",
    threshold: 0.78,
  },
  {
    year: "Future",
    title: "Entrepreneur + Remote Work Path",
    desc: "Focused on launching useful products, building a stronger online identity, and creating a future that offers freedom and stability.",
    x: 250,
    y: 1450,
    side: "left",
    badge: "FUT",
    threshold: 0.94,
  },
];

const floatParticles = [
  { left: "8%", top: "16%", size: 8, delay: 0.2, duration: 11 },
  { left: "18%", top: "64%", size: 6, delay: 1.2, duration: 13 },
  { left: "34%", top: "28%", size: 7, delay: 0.7, duration: 10 },
  { left: "48%", top: "72%", size: 5, delay: 1.8, duration: 12 },
  { left: "58%", top: "22%", size: 9, delay: 0.4, duration: 14 },
  { left: "66%", top: "58%", size: 6, delay: 1.1, duration: 10 },
  { left: "76%", top: "12%", size: 7, delay: 0.9, duration: 15 },
  { left: "84%", top: "46%", size: 5, delay: 0.6, duration: 13 },
  { left: "10%", top: "82%", size: 6, delay: 1.5, duration: 11 },
  { left: "26%", top: "44%", size: 5, delay: 0.3, duration: 14 },
  { left: "42%", top: "88%", size: 8, delay: 1.9, duration: 12 },
  { left: "74%", top: "78%", size: 6, delay: 0.8, duration: 13 },
];

function buildCurve(a, b) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

function TimelineRoadmap() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 22 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;
      const total = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const next = Math.max(0, Math.min(1, current / total));

      setProgress((prev) => prev + (next - prev) * 0.08);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const segmentProgress = useMemo(() => {
    return timelineNodes.slice(0, -1).map((_, index) => {
      const start = index * 0.18;
      const end = start + 0.24;
      return Math.max(0, Math.min(1, (progress - start) / (end - start)));
    });
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - 210);
        mouseY.set(e.clientY - 210);
      }}
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <motion.div
        className="pointer-events-none fixed z-0 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.16), rgba(59,130,246,0.08), transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {floatParticles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-cyan-400/70"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow: "0 0 18px rgba(34,211,238,0.75)",
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, 10, 0],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_30%),radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_40%)]" />
      <div className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl md:mb-20">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-cyan-300/70">
            Education & Growth
          </p>
          <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">
            A journey through
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
              learning, systems & ambition.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            A connected roadmap of education, practical development, and the
            creative-technical path I am building for the future.
          </p>
        </div>

        <div className="relative h-[1700px]">
          <svg
            viewBox="0 0 1600 1700"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="timelineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <filter id="timelineGlow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {timelineNodes.slice(0, -1).map((node, index) => {
              const next = timelineNodes[index + 1];
              const d = buildCurve(node, next);
              const p = segmentProgress[index];

              return (
                <g key={index}>
                  <path
                    d={d}
                    pathLength={1}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={d}
                    pathLength={1}
                    stroke="url(#timelineGradient)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#timelineGlow)"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1 - p,
                      transition: "stroke-dashoffset 0.55s ease-out",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {timelineNodes.map((item) => {
            const active = progress >= item.threshold;
            const translateClass = active
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-40";
            const sideClass =
              item.side === "left"
                ? "left-0 md:left-[2%]"
                : "right-0 md:right-[2%]";
            const badgeSide = item.side === "left" ? "right-6" : "left-6";

            return (
              <div
                key={item.title}
                className={`absolute w-full transition-all duration-700 md:w-[420px] ${sideClass}`}
                style={{ top: `${item.y - 90}px` }}
              >
                <div
                  className={`relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-700 ${translateClass}`}
                >
                  <motion.img
                    src={
                      {
                        STC: "/logos/stc.png",
                        UOC: "/logos/uoc.png",
                        JAT: "/logos/uk.png",
                        GRO: "/logos/growth.png",
                        FUT: "/logos/future.png",
                      }[item.badge]
                    }
                    alt={item.title}
                    className={`absolute -top-14 ${badgeSide} h-14 w-14 rounded-2xl object-cover border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.35)]`}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="absolute -top-5 left-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_34px_rgba(34,211,238,0.5)]">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>

                  <p className="mt-1 text-xs uppercase tracking-[0.35em] text-cyan-300/90">
                    {item.year}
                  </p>
                  <h3 className="mt-5 text-2xl font-bold leading-tight text-white md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-white/65">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const stackSectionRef = useRef(null);
  const [stackVisible, setStackVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStackVisible(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (stackSectionRef.current) {
      observer.observe(stackSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#06070a] text-white">
      <header className="relative z-20 px-6 pt-6 md:px-12 md:pt-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur">
            <span className="text-xs uppercase tracking-[0.25em] text-white/75">
              Portfolio
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/45 md:flex">
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#timeline" className="transition hover:text-white">
              Timeline
            </a>
            <a href="#stack" className="transition hover:text-white">
              Tech Stack
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </header>

      <section className="relative px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/45">
              Software • Data • Design • Brand
            </p>
            <h1 className="text-[4.5rem] font-black leading-[0.82] tracking-[-0.06em] text-white md:text-[8rem]">
              Thanuja
            </h1>
            <h1 className="mt-0 bg-clip-text text-[4.5rem] font-black leading-[0.82] tracking-[-0.06em] text-transparent opacity-85 md:text-[8rem] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
              Bandara
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              I build thoughtful digital experiences with a strong technical
              backbone — blending software engineering, data-minded structure,
              and a clean editorial aesthetic.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 text-white shadow-lg transition hover:-translate-y-0.5"
              >
                View Selected Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <img
                src="/profile.png"
                alt="Profile"
                className="h-[520px] w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                  Personal Identity
                </p>
                <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight md:text-3xl">
                  Somewhere between a tech builder, a creative mind, and a
                  future brand.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            [
              "Software Engineering",
              "Building practical systems with clean structure, logic, and problem-solving.",
            ],
            [
              "Creative + Analytical",
              "Interested in web development, AI, machine learning, cybersecurity, and data science.",
            ],
            [
              "Personal Brand Builder",
              "Focused on content creation, confidence, entrepreneurship, and a stronger future identity.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-18 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">
              About
            </p>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Curious mind,
              <span className="block text-white/45">
                clean code, future-focused energy.
              </span>
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur md:p-10">
            <p className="text-lg leading-relaxed text-white/75">
              I am a second-year BICT(Hons) student at the University of Colombo
              and also studying Software Engineering at the Java Institute for
              Advanced Technology. My interests move across web development,
              game design, AI, machine learning, cybersecurity, data science,
              content creation, music production, and entrepreneurship.
            </p>
            <blockquote className="mt-8 border-l-2 border-cyan-400 pl-5 text-2xl font-semibold leading-snug text-white md:text-3xl">
              Build useful things. Make them elegant. Make them feel
              intentional.
            </blockquote>
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-18 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">
                Projects
              </p>
              <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
                Experimental systems & digital artifacts.
              </h2>
            </div>
            <div className="hidden max-w-sm text-right text-sm text-white/45 md:block">
              Built to communicate not just what you made, but why it matters.
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(0,0,0,0.4)]"
              >
                <div
                  className={`relative h-56 bg-gradient-to-br ${project.accent} p-6 text-white`}
                >
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="leading-relaxed text-white/65">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white">
                    View case study{" "}
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TimelineRoadmap />

      <section
        id="stack"
        ref={stackSectionRef}
        className="px-6 py-18 md:px-12 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">
                Tech Stack
              </p>

              <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
                Capabilities & technologies.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
                Not a boring list — more like a living control panel for what I
                build with, think with, and ship with.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                Focus
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                Build. Analyze. Polish.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT ORBIT */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_30%)]" />

              <div className="relative flex min-h-[720px] items-center justify-center md:min-h-[760px]">
                <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/20" />
                <div className="absolute h-[420px] w-[420px] rounded-full border border-fuchsia-400/10" />
                <div className="absolute h-[540px] w-[540px] rounded-full border border-white/5" />

                {/* CENTER CORE */}
                <motion.div
                  className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 p-[1px] shadow-[0_0_60px_rgba(34,211,238,0.35)]"
                  animate={{
                    scale: [1, 1.04, 1],
                    rotate: [0, 6, -6, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#06070a]/90 text-center backdrop-blur-xl">
                    <span className="text-[0.7rem] uppercase tracking-[0.4em] text-white/45">
                      Core
                    </span>

                    <span className="mt-2 text-3xl font-black text-white">
                      Stack
                    </span>

                    <span className="mt-1 text-xs text-white/50">
                      signal map
                    </span>
                  </div>
                </motion.div>

                {/* ORBIT ITEMS */}
                {stack.map((item, index) => {
                  const angle =
                    (index / stack.length) * Math.PI * 2 - Math.PI / 2;

                  const radius = 235;

                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  const isBright = index % 2 === 0;

                  return (
                    <motion.div
                      key={item.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      whileHover={{
                        scale: 1.06,
                        y: -4,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <div className="w-[190px] rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5 text-left shadow-[0_10px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-cyan-400/30">
                        <div className="flex items-center justify-between gap-3">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              isBright ? "bg-cyan-400" : "bg-fuchsia-400"
                            } shadow-[0_0_16px_currentColor]`}
                          />

                          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-white/35">
                            {item.value}%
                          </span>
                        </div>

                        {/* LOGO + TITLE */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur">
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white">
                              {item.name}
                            </h3>

                            <p className="text-xs leading-relaxed text-white/50">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* ANIMATED BAR */}
                       
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT LIST */}
            <div className="space-y-4">
              {stack.map((item, index) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 6 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="min-h-[120px] rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur"
                >
                  <div className="flex h-full items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-4">
                        {/* LOGO */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-2">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <span
                          className={`h-3 w-3 rounded-full ${
                            index % 2 === 0 ? "bg-cyan-400" : "bg-fuchsia-400"
                          } shadow-[0_0_16px_currentColor]`}
                        />

                        <div>
                          <h3 className="truncate text-xl font-semibold text-white">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-sm text-white/45">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* ANIMATED BAR */}
                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: stackVisible ? `${item.value}%` : "0%",
                          }}
                          transition={{
                            duration: 1.2,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    <div className="shrink-0 text-right text-xs uppercase tracking-[0.35em] text-white/35">
                      {item.value}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-10 pt-16 md:px-12">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/45">
                Contact
              </p>
              <div className="space-y-2 text-white/75">
                <p>Email: junoxnujan@gmail.com</p>
                <p>GitHub: github.com/Junox</p>
                <p>Location: Colombo, Sri Lanka</p>
              </div>
            </div>

            <div className="select-none text-right">
              <div className="text-[4rem] leading-none font-black text-white md:text-[7rem]">
                Thanuja
              </div>
              <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-[4rem] leading-none font-black text-transparent opacity-90 md:text-[7rem]">
                Bandara
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Thanuja Bandara Portfolio</p>
            <p>Designed as a digital identity system — not just a portfolio.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
