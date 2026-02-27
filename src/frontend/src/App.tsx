import { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
  Music,
  UtensilsCrossed,
  HeartPulse,
  Tv2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronDown,
  Quote,
  GraduationCap,
  Users,
  Award,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Twitter,
  Youtube,
  Loader2,
} from "lucide-react";
import type { PrincipalMessage, NewsArticle, Facility } from "./backend.d";
import { useActor } from "./hooks/useActor";

// ── Icon mapping for facilities ──────────────────────────────────────────────
function getFacilityIcon(iconName: string) {
  const name = iconName.toLowerCase();
  if (name.includes("library") || name.includes("book")) return BookOpen;
  if (name.includes("science") || name.includes("lab")) return FlaskConical;
  if (name.includes("computer")) return Monitor;
  if (name.includes("sport") || name.includes("ground")) return Trophy;
  if (name.includes("auditorium") || name.includes("hall")) return Music;
  if (name.includes("canteen") || name.includes("food")) return UtensilsCrossed;
  if (name.includes("medical") || name.includes("health")) return HeartPulse;
  if (name.includes("classroom") || name.includes("smart")) return Tv2;
  return Building2;
}

// ── Scroll animation hook ─────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Animated Section Wrapper ─────────────────────────────────────────────
function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Academics", href: "#academics" },
    { label: "Admissions", href: "#admissions" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "oklch(0.22 0.09 264)" : "oklch(0.27 0.09 264)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            aria-label="Shree Naulin Secondary School home"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-sm leading-tight block">
                Shree Naulin
              </span>
              <span
                className="text-xs font-medium leading-tight block"
                style={{ color: "oklch(0.85 0.10 82)" }}
              >
                Secondary School
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 relative group"
                  style={{
                    color: activeSection === link.href ? "oklch(0.72 0.14 82)" : "rgba(255,255,255,0.85)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.72 0.14 82)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      activeSection === link.href ? "oklch(0.72 0.14 82)" : "rgba(255,255,255,0.85)";
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-200 scale-x-0 group-hover:scale-x-100"
                    style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
                  />
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("#admissions")}
                className="ml-2 px-5 py-2 rounded-md text-sm font-bold transition-all duration-200 hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: "oklch(0.72 0.14 82)",
                  color: "oklch(0.22 0.09 264)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.80 0.14 82)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.72 0.14 82)";
                }}
              >
                Apply Now
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileOpen ? "320px" : "0" }}
        >
          <div className="pb-4 pt-1 border-t border-white/10">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-md transition-colors block"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("#admissions")}
              className="w-full mt-2 px-4 py-3 rounded-md text-sm font-bold transition-all duration-200"
              style={{
                backgroundColor: "oklch(0.72 0.14 82)",
                color: "oklch(0.22 0.09 264)",
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-school-campus.dim_1600x900.jpg')" }}
        aria-hidden="true"
      />
      {/* Navy overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, oklch(0.22 0.09 264 / 0.72) 0%, oklch(0.20 0.09 264 / 0.85) 100%)" }}
        aria-hidden="true"
      />

      {/* Decorative grain texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{
            backgroundColor: "oklch(0.72 0.14 82 / 0.15)",
            borderColor: "oklch(0.72 0.14 82 / 0.40)",
            color: "oklch(0.88 0.10 82)",
            animation: "fade-up 0.5s ease forwards",
            opacity: 0,
          } as React.CSSProperties}
        >
          <Award className="w-3.5 h-3.5" />
          Established 1985 · Sindhupalchok, Nepal
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          style={{
            fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
            animation: "fade-up 0.6s ease 0.1s forwards",
            opacity: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          } as React.CSSProperties}
        >
          Shree Naulin
          <br />
          <span style={{ color: "oklch(0.72 0.14 82)" }}>Secondary School</span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl font-medium mb-8 max-w-2xl mx-auto"
          style={{
            color: "oklch(0.88 0.06 82)",
            animation: "fade-up 0.6s ease 0.2s forwards",
            opacity: 0,
          } as React.CSSProperties}
        >
          Nurturing Excellence, Building Future Leaders
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            animation: "fade-up 0.6s ease 0.3s forwards",
            opacity: 0,
          } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => document.querySelector("#admissions")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "oklch(0.72 0.14 82)",
              color: "oklch(0.22 0.09 264)",
              boxShadow: "0 4px 20px oklch(0.72 0.14 82 / 0.40)",
            }}
          >
            Explore Admissions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 border-2 text-white hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.35)" }}
          >
            Discover More
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
          style={{
            animation: "fade-up 0.6s ease 0.4s forwards",
            opacity: 0,
          } as React.CSSProperties}
        >
          {[
            { value: "1200+", label: "Students" },
            { value: "80+", label: "Faculty Members" },
            { value: "38+", label: "Years of Excellence" },
            { value: "98%", label: "Pass Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center border"
              style={{
                backgroundColor: "oklch(1 0 0 / 0.07)",
                borderColor: "oklch(1 0 0 / 0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "oklch(0.72 0.14 82)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/70 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        style={{ animation: "fade-in 1s ease 1s forwards", opacity: 0 } as React.CSSProperties}
        aria-hidden="true"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

// ── About Us Section ─────────────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    { icon: Users, value: "1,200+", label: "Students Enrolled" },
    { icon: Award, value: "80+", label: "Dedicated Faculty" },
    { icon: BarChart3, value: "38+", label: "Years of Excellence" },
    { icon: CheckCircle2, value: "98%", label: "Annual Pass Rate" },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection delay={0}>
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-10"
                style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full opacity-8"
                style={{ backgroundColor: "oklch(0.27 0.09 264)" }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/about-school.dim_800x600.jpg"
                  alt="Students learning at Shree Naulin Secondary School"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Badge overlay */}
                <div
                  className="absolute bottom-6 left-6 right-6 rounded-xl p-4 flex items-center gap-3"
                  style={{
                    backgroundColor: "oklch(0.27 0.09 264)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
                  >
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Established 1985</div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.72 0.14 82)" }}
                    >
                      38 Years of Academic Legacy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={150}>
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{
                  backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                  color: "oklch(0.58 0.12 82)",
                }}
              >
                About Us
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{
                  color: "oklch(0.27 0.09 264)",
                  fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
                }}
              >
                Education at the Heart of the Himalayas
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                Shree Naulin Secondary School has been a cornerstone of quality education in
                Sindhupalchok district since 1985. Nestled in the beautiful Himalayan foothills,
                we provide a nurturing environment where students from diverse backgrounds
                discover their potential and grow into responsible citizens.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Our dedicated faculty combines traditional Nepali values with modern pedagogical
                practices, ensuring every child receives a holistic education that prepares them
                for higher studies and life's challenges. From science labs to sports fields,
                we invest in every dimension of student development.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-xl p-4 border transition-all duration-200 hover:shadow-md group"
                      style={{ borderColor: "oklch(0.90 0.01 260)" }}
                    >
                      <Icon
                        className="w-5 h-5 mb-2"
                        style={{ color: "oklch(0.72 0.14 82)" }}
                        aria-hidden="true"
                      />
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "oklch(0.27 0.09 264)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ── Latest News Section ───────────────────────────────────────────────────────
function NewsSection() {
  const { actor, isFetching } = useActor();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getNewsArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      });
  }, [actor, isFetching]);

  // Fallback news if backend returns empty or errors
  const fallbackArticles: NewsArticle[] = [
    {
      id: 1n,
      category: "Academic",
      date: "March 15, 2026",
      title: "Annual Science Exhibition 2026 Showcases Student Innovation",
      shortDescription:
        "Students from grades 9-12 presented groundbreaking science projects at this year's annual exhibition, impressing judges with their creativity and scientific rigor.",
    },
    {
      id: 2n,
      category: "Sports",
      date: "February 28, 2026",
      title: "Naulin School Wins District Football Championship",
      shortDescription:
        "Our school football team brought pride to the institution by clinching the district-level championship title after a thrilling final match.",
    },
    {
      id: 3n,
      category: "Admissions",
      date: "February 10, 2026",
      title: "Enrollment Open for Academic Year 2026-27",
      shortDescription:
        "Applications are now being accepted for the upcoming academic year across all grades. Early bird scholarship opportunities available for meritorious students.",
    },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;

  return (
    <section id="news" className="section-padding" style={{ backgroundColor: "oklch(0.97 0.005 260)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                color: "oklch(0.58 0.12 82)",
              }}
            >
              Stay Informed
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: "oklch(0.27 0.09 264)",
                fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              }}
            >
              Latest News & Updates
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Stay connected with the latest happenings, achievements, and announcements from our school.
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex items-center gap-3 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "oklch(0.27 0.09 264)" }} />
              <span>Loading news articles…</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article, i) => (
              <AnimatedSection key={String(article.id)} delay={i * 100}>
                <article
                  className="bg-white rounded-2xl overflow-hidden border transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                  style={{
                    borderColor: "oklch(0.90 0.01 260)",
                    boxShadow: "0 2px 12px rgba(26,43,94,0.06)",
                  }}
                >
                  {/* Gold top accent */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
                    aria-hidden="true"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                          color: "oklch(0.58 0.12 82)",
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="text-gray-400 text-xs">{article.date}</span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-3 leading-snug group-hover:underline underline-offset-2"
                      style={{ color: "oklch(0.27 0.09 264)" }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {article.shortDescription}
                    </p>

                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group/btn"
                      style={{ color: "oklch(0.27 0.09 264)" }}
                      aria-label={`Read more about ${article.title}`}
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Principal Message Section ────────────────────────────────────────────────
function PrincipalSection() {
  const { actor, isFetching } = useActor();
  const [message, setMessage] = useState<PrincipalMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getPrincipalMessage()
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage({
          title: "Principal",
          name: "Mr. Ramesh Kumar Sharma",
          imageUrl: "/assets/generated/principal-portrait.dim_400x500.jpg",
          message:
            "At Shree Naulin Secondary School, we believe every child carries within them the seeds of greatness. Our mission is to create an environment where curiosity flourishes, character is built, and dreams take flight. For over three decades, we have been privileged to guide thousands of young minds toward their highest potential. Education is not merely the filling of a pail, but the lighting of a fire — and that sacred flame burns brightly here in the Himalayas.",
        });
        setLoading(false);
      });
  }, [actor, isFetching]);

  return (
    <section
      id="principal"
      className="section-padding"
      style={{ background: "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.30 0.10 270) 100%)" }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.72 0.14 82 / 0.20)",
                color: "oklch(0.85 0.10 82)",
              }}
            >
              Leadership
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
            >
              Message from the Principal
            </h2>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-white/60" />
          </div>
        ) : message ? (
          <AnimatedSection delay={100}>
            <div
              className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1px solid oklch(1 0 0 / 0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Portrait */}
                <div className="relative overflow-hidden">
                  <img
                    src="/assets/generated/principal-portrait.dim_400x500.jpg"
                    alt={`${message.name}, Principal`}
                    className="w-full h-72 md:h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, oklch(0.22 0.09 264 / 0.7) 0%, transparent 50%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 left-4 right-4 md:hidden">
                    <div
                      className="font-bold text-lg"
                      style={{ color: "oklch(0.72 0.14 82)" }}
                    >
                      {message.name}
                    </div>
                    <div className="text-white/70 text-sm">{message.title}</div>
                  </div>
                </div>

                {/* Message content */}
                <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                  <Quote
                    className="w-10 h-10 mb-4 opacity-30"
                    style={{ color: "oklch(0.72 0.14 82)" }}
                    aria-hidden="true"
                  />
                  <blockquote
                    className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 italic"
                    style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
                  >
                    "{message.message}"
                  </blockquote>

                  <div className="hidden md:block mt-auto">
                    <div
                      className="text-xl font-bold"
                      style={{ color: "oklch(0.72 0.14 82)" }}
                    >
                      {message.name}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.70 0.01 260)" }}
                    >
                      {message.title}, Shree Naulin Secondary School
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
}

// ── Facilities Section ────────────────────────────────────────────────────────
function FacilitiesSection() {
  const { actor, isFetching } = useActor();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getFacilities()
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [actor, isFetching]);

  const fallbackFacilities: Facility[] = [
    {
      id: 1n,
      name: "Science Laboratory",
      description: "Fully equipped physics, chemistry and biology labs for hands-on learning.",
      iconName: "science",
    },
    {
      id: 2n,
      name: "Digital Library",
      description: "Extensive collection of books, journals, and e-resources for research.",
      iconName: "library",
    },
    {
      id: 3n,
      name: "Computer Center",
      description: "Modern computer lab with high-speed internet for digital literacy.",
      iconName: "computer",
    },
    {
      id: 4n,
      name: "Sports Ground",
      description: "Multi-purpose sports facilities for football, basketball, and athletics.",
      iconName: "sports",
    },
    {
      id: 5n,
      name: "School Auditorium",
      description: "700-seat auditorium for cultural events, debates, and performances.",
      iconName: "auditorium",
    },
    {
      id: 6n,
      name: "Health Center",
      description: "On-site medical room with qualified nurse and first-aid facilities.",
      iconName: "medical",
    },
    {
      id: 7n,
      name: "Smart Classrooms",
      description: "Interactive display boards and modern AV equipment for dynamic learning.",
      iconName: "smart",
    },
    {
      id: 8n,
      name: "School Canteen",
      description: "Hygienic, nutritious meals and snacks served in a welcoming dining hall.",
      iconName: "canteen",
    },
  ];

  const displayFacilities = facilities.length > 0 ? facilities : fallbackFacilities;

  return (
    <section id="facilities" className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                color: "oklch(0.58 0.12 82)",
              }}
            >
              Infrastructure
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: "oklch(0.27 0.09 264)",
                fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              }}
            >
              Our Facilities
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              World-class infrastructure designed to support every aspect of student learning and development.
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "oklch(0.27 0.09 264)" }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFacilities.map((facility, i) => {
              const Icon = getFacilityIcon(facility.iconName);
              return (
                <AnimatedSection key={String(facility.id)} delay={i * 60}>
                  <div
                    className="group bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default h-full flex flex-col"
                    style={{
                      borderColor: "oklch(0.90 0.01 260)",
                      borderTopColor: "oklch(0.72 0.14 82)",
                      borderTopWidth: "4px",
                      boxShadow: "0 2px 12px rgba(26,43,94,0.06)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 duration-300"
                      style={{ backgroundColor: "oklch(0.27 0.09 264 / 0.08)" }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: "oklch(0.27 0.09 264)" }}
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ color: "oklch(0.27 0.09 264)" }}
                    >
                      {facility.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {facility.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Academics Section ────────────────────────────────────────────────────────
function AcademicsSection() {
  const programs = [
    {
      icon: BookOpen,
      title: "Primary School",
      grades: "Grades 1 – 5",
      color: "oklch(0.27 0.09 264)",
      subjects: [
        "Nepali Language & Literature",
        "English Language",
        "Mathematics",
        "Environmental Science",
        "Social Studies",
        "Health & Physical Education",
        "Arts & Crafts",
        "Computer Fundamentals",
      ],
      highlight: "Foundation for lifelong learning",
    },
    {
      icon: GraduationCap,
      title: "Middle School",
      grades: "Grades 6 – 8",
      color: "oklch(0.72 0.14 82)",
      subjects: [
        "Nepali & English Literature",
        "Advanced Mathematics",
        "General Science",
        "Social Studies & History",
        "Sanskrit / Optional Language",
        "Computer Science",
        "Physical Education",
        "Creative Arts",
      ],
      highlight: "Building critical thinking",
    },
    {
      icon: Award,
      title: "Secondary School",
      grades: "Grades 9 – 12",
      color: "oklch(0.27 0.09 264)",
      subjects: [
        "Physics, Chemistry & Biology",
        "Advanced Mathematics",
        "Nepali & English",
        "Computer Science / Accounting",
        "Social Studies & Economics",
        "Optional Mathematics",
        "EPH / Population Education",
        "Board Exam Preparation",
      ],
      highlight: "SLC & Higher Secondary preparation",
    },
  ];

  return (
    <section
      id="academics"
      className="section-padding"
      style={{ backgroundColor: "oklch(0.97 0.005 260)" }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                color: "oklch(0.58 0.12 82)",
              }}
            >
              Programs
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: "oklch(0.27 0.09 264)",
                fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              }}
            >
              Academic Programs
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A comprehensive curriculum from foundational learning to higher secondary education.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <AnimatedSection key={program.title} delay={i * 120}>
                <div
                  className="group rounded-2xl p-8 border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default h-full flex flex-col"
                  style={{
                    borderColor: "oklch(0.90 0.01 260)",
                    boxShadow: "0 2px 12px rgba(26,43,94,0.06)",
                  }}
                >
                  {/* Icon & Grade Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "oklch(0.27 0.09 264 / 0.10)" }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: program.color }}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `oklch(0.72 0.14 82 / 0.12)`,
                        color: "oklch(0.58 0.12 82)",
                      }}
                    >
                      {program.grades}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  >
                    {program.title}
                  </h3>
                  <p
                    className="text-xs font-semibold mb-5 italic"
                    style={{ color: "oklch(0.58 0.12 82)" }}
                  >
                    {program.highlight}
                  </p>

                  <ul className="space-y-2 flex-1">
                    {program.subjects.map((subject) => (
                      <li key={subject} className="flex items-center gap-2 text-sm text-gray-600">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
                          aria-hidden="true"
                        />
                        {subject}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 h-1 w-full rounded-full transition-all duration-300 group-hover:w-2/3"
                    style={{ backgroundColor: program.color }}
                    aria-hidden="true"
                  />
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Admissions Section ───────────────────────────────────────────────────────
function AdmissionsSection() {
  const steps = [
    {
      step: "01",
      icon: CheckCircle2,
      title: "Apply Online",
      desc: "Complete our simple online application form with your basic information and documents.",
    },
    {
      step: "02",
      icon: BookOpen,
      title: "Document Verification",
      desc: "Submit required documents: birth certificate, previous marksheets, and character certificate.",
    },
    {
      step: "03",
      icon: GraduationCap,
      title: "Entrance Test",
      desc: "Appear for a grade-appropriate entrance test to assess your academic readiness.",
    },
    {
      step: "04",
      icon: Award,
      title: "Admission Confirmation",
      desc: "Receive your offer letter and complete enrollment by paying the fee within the deadline.",
    },
  ];

  return (
    <section
      id="admissions"
      className="section-padding"
      style={{
        background: "linear-gradient(135deg, oklch(0.72 0.14 82) 0%, oklch(0.80 0.16 88) 100%)",
      }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.27 0.09 264 / 0.15)",
                color: "oklch(0.22 0.09 264)",
              }}
            >
              Enrollment 2026–27
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: "oklch(0.22 0.09 264)",
                fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              }}
            >
              Begin Your Journey With Us
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.28 0.09 264 / 0.80)" }}
            >
              Admissions are open for all grades for the 2026-27 academic year. Join our
              vibrant community of learners and embark on a journey of excellence and discovery.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedSection key={s.step} delay={i * 100}>
                <div
                  className="rounded-2xl p-6 h-full flex flex-col border"
                  style={{
                    backgroundColor: "oklch(0.22 0.09 264 / 0.12)",
                    borderColor: "oklch(0.22 0.09 264 / 0.25)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "oklch(0.22 0.09 264)" }}
                    >
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <span
                      className="text-3xl font-black opacity-20"
                      style={{ color: "oklch(0.22 0.09 264)", fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.22 0.09 264)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.25 0.09 264 / 0.75)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={200}>
          <div className="text-center">
            <button
              type="button"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "oklch(0.27 0.09 264)",
                color: "white",
                boxShadow: "0 4px 24px oklch(0.27 0.09 264 / 0.40)",
              }}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "Naulin, Sindhupalchok District, Bagmati Province, Nepal",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977-11-420XXX / +977-98XXXXXXXX",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@shreenaулin.edu.np",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Sun – Fri: 9:00 AM – 4:30 PM (Nepal Time)",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                color: "oklch(0.58 0.12 82)",
              }}
            >
              Get In Touch
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: "oklch(0.27 0.09 264)",
                fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
              }}
            >
              Contact Us
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We'd love to hear from you. Reach out to us for admissions, inquiries, or any assistance.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection delay={0}>
            <div className="space-y-6">
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "linear-gradient(135deg, oklch(0.22 0.09 264) 0%, oklch(0.30 0.10 270) 100%)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">School Information</h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: "oklch(0.72 0.14 82 / 0.20)" }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: "oklch(0.85 0.10 82)" }}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <div
                            className="text-xs font-bold uppercase tracking-wide mb-0.5"
                            style={{ color: "oklch(0.72 0.14 82)" }}
                          >
                            {item.label}
                          </div>
                          <div className="text-white/80 text-sm leading-relaxed">{item.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden h-48 flex items-center justify-center border"
                style={{
                  background: "linear-gradient(135deg, oklch(0.96 0.01 260), oklch(0.92 0.01 260))",
                  borderColor: "oklch(0.88 0.01 260)",
                }}
              >
                <div className="text-center">
                  <MapPin
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  />
                  <p className="text-sm text-gray-500 font-medium">
                    Naulin, Sindhupalchok
                  </p>
                  <p className="text-xs text-gray-400">Bagmati Province, Nepal</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={150}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 border"
              style={{
                borderColor: "oklch(0.90 0.01 260)",
                boxShadow: "0 4px 24px rgba(26,43,94,0.08)",
              }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "oklch(0.27 0.09 264)" }}
              >
                Send Us a Message
              </h3>

              {submitted && (
                <div
                  className="mb-4 p-4 rounded-xl flex items-center gap-2 text-sm font-medium"
                  style={{
                    backgroundColor: "oklch(0.72 0.14 82 / 0.12)",
                    color: "oklch(0.58 0.12 82)",
                  }}
                  role="alert"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "oklch(0.88 0.01 260)",
                      backgroundColor: "oklch(0.98 0.003 260)",
                      color: "oklch(0.18 0.01 260)",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.27 0.09 264)";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.27 0.09 264 / 0.15)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.01 260)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none"
                    style={{
                      borderColor: "oklch(0.88 0.01 260)",
                      backgroundColor: "oklch(0.98 0.003 260)",
                      color: "oklch(0.18 0.01 260)",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.27 0.09 264)";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.27 0.09 264 / 0.15)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.01 260)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none"
                    style={{
                      borderColor: "oklch(0.88 0.01 260)",
                      backgroundColor: "oklch(0.98 0.003 260)",
                      color: "oklch(0.18 0.01 260)",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.27 0.09 264)";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.27 0.09 264 / 0.15)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.01 260)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "oklch(0.27 0.09 264)" }}
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us more about your inquiry…"
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none resize-none"
                    style={{
                      borderColor: "oklch(0.88 0.01 260)",
                      backgroundColor: "oklch(0.98 0.003 260)",
                      color: "oklch(0.18 0.01 260)",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.27 0.09 264)";
                      (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px oklch(0.27 0.09 264 / 0.15)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.88 0.01 260)";
                      (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "oklch(0.27 0.09 264)",
                    color: "white",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Academics", href: "#academics" },
    { label: "Admissions", href: "#admissions" },
    { label: "Facilities", href: "#facilities" },
    { label: "Latest News", href: "#news" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(180deg, oklch(0.18 0.09 264) 0%, oklch(0.14 0.08 264) 100%)",
      }}
    >
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.72 0.14 82)" }}
              >
                <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Shree Naulin</div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.72 0.14 82)" }}
                >
                  Secondary School
                </div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Nurturing Excellence, Building Future Leaders. Serving the Sindhupalchok community
              with quality education since 1985.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter/X" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={`Shree Naulin Secondary School on ${label}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.72 0.14 82)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(1 0 0 / 0.08)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.72 0.14 82)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Snippet */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.72 0.14 82)" }}
            >
              Contact
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.72 0.14 82)" }}
                  aria-hidden="true"
                />
                <span className="text-white/55 text-sm">
                  Naulin, Sindhupalchok,<br />Bagmati Province, Nepal
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.14 82)" }}
                  aria-hidden="true"
                />
                <span className="text-white/55 text-sm">+977-11-420XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.14 82)" }}
                  aria-hidden="true"
                />
                <span className="text-white/55 text-sm">info@shreenaуlin.edu.np</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
      >
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>
            © {year} Shree Naulin Secondary School. All rights reserved.
          </span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <PrincipalSection />
        <FacilitiesSection />
        <AcademicsSection />
        <AdmissionsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
