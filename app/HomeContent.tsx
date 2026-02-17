"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaLaptopCode,
  FaTools,
  FaChalkboardTeacher,
  FaChartLine,
  FaCheckCircle,
  FaHandshake,
} from "react-icons/fa";

// ================= REVIEWS =================
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase";


export default function HomeContent() {
  // ================= LANGUE =================
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openService, setOpenService] = useState<number | null>(null);



  useEffect(() => {
    const storedLang = localStorage.getItem("msm-lang");
    if (storedLang === "fr" || storedLang === "en") setLang(storedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("msm-lang", newLang);
  };

  // ================= SCROLL =================
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

 const services = [
  {
    title: lang === "fr" ? "Analyse & Conception" : "Analysis & Design",
    description:
      lang === "fr"
        ? "Nous définissons précisément vos besoins avant tout développement."
        : "We clearly define your needs before any development.",
    details:
      lang === "fr"
        ? "Nous rédigeons un cahier de charges simple et structuré pour clarifier vos objectifs, éviter les erreurs coûteuses et garantir que le projet correspond exactement à vos attentes."
        : "We create structured specifications to clarify objectives, avoid costly mistakes, and ensure the project matches your expectations.",
    icon: <FaChartLine size={42} />,
  },
  {
    title: lang === "fr" ? "Développement sur Mesure" : "Custom Development",
    description:
      lang === "fr"
        ? "Création d'applications adaptées à votre activité."
        : "Creation of applications tailored to your business.",
    details:
      lang === "fr"
        ? "Nous développons des solutions web et mobiles personnalisées qui améliorent votre productivité, automatisent vos tâches et modernisent votre entreprise."
        : "We develop custom web and mobile solutions to improve productivity, automate tasks and modernize your business.",
    icon: <FaLaptopCode size={42} />,
  },
  {
    title: lang === "fr" ? "Support & Maintenance" : "Support & Maintenance",
    description:
      lang === "fr"
        ? "Assistance continue et mise à jour de vos systèmes."
        : "Continuous assistance and system updates.",
    details:
      lang === "fr"
        ? "Nous surveillons, mettons à jour et sécurisons vos systèmes pour éviter les pannes, pertes de données ou problèmes techniques."
        : "We monitor, update and secure your systems to prevent breakdowns and data loss.",
    icon: <FaTools size={42} />,
  },
  {
    title: lang === "fr" ? "Formation & Accompagnement" : "Training & Coaching",
    description:
      lang === "fr"
        ? "Renforcement des compétences de votre équipe."
        : "Strengthening your team's skills.",
    details:
      lang === "fr"
        ? "Nous formons vos équipes pour qu’elles comprennent et utilisent efficacement les outils numériques, augmentant ainsi leur performance."
        : "We train your team to efficiently use digital tools and increase performance.",
    icon: <FaChalkboardTeacher size={42} />,
  },
];

const [loadingReviews, setLoadingReviews] = useState(true);

useEffect(() => {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetched = snapshot.docs.map(doc => doc.data() as { name: string; rating: number; comment: string });
    setReviews(fetched);
    setLoadingReviews(false);
  });
  return () => unsubscribe();
}, []);

const addReviewFirebase = async (name: string, rating: number, comment: string) => {
  try {
    await addDoc(collection(db, "reviews"), {
      name,
      rating,
      comment,
      createdAt: serverTimestamp(), // OK ici, car c’est un doc unique
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'avis :", err);
  }
};



 const partners = [
  {
    name: "EYIMO SERVICES AUTO",
    years: "4 ans d’existence",
    field: "Transport & logistique",
    description:
      "Entreprise spécialisée dans les services de transport, la logistique et la gestion de flotte automobile pour entreprises et particuliers.",
    website: "https://eyimoservices.com",
    logo: "/partners/eyimo.jpeg",
  },
  {
    name: "INFO TELECOM GENERAL BUSINESS",
    years: "Plus de 10 ans d’existence",
    field: "Services informatiques",
    description:
      "Entreprise spécialisée dans les solutions informatiques, télécommunications et services numériques pour entreprises.",
    website: "https://infotelecom.com",
    logo: "/partners/info.jpeg",
  },
  {
    name: "GOMSU GENERAL BUSINESS COMPANY",
    years: "1 an d’existence",
    field: "Prestations de services divers",
    description:
      "Société polyvalente proposant divers services professionnels et solutions adaptées aux besoins des entreprises locales.",
    website: "https://gomsucompany.com",
    logo: "/partners/gomsu.jpeg",
  },
];


// ================= REVIEWS =================
const [reviews, setReviews] = useState<
  { name: string; rating: number; comment: string }[]
>([]);

useEffect(() => {
  const savedReviews = localStorage.getItem("msm-reviews");
  if (savedReviews) setReviews(JSON.parse(savedReviews));
}, []);

const addReview = (name: string, rating: number, comment: string) => {
  const newReview = { name, rating, comment };
  const updatedReviews = [newReview, ...reviews]; // le plus récent en premier
  setReviews(updatedReviews);
  localStorage.setItem("msm-reviews", JSON.stringify(updatedReviews));
};



  return (
    <main>
      {/* ================= HEADER ================= */}
     <header style={styles.header}>
  {/* LOGO */}
  <div style={styles.logo}>
    <Image
      src="/logo.png"
      alt="MSM ACTIVITY"
      width={70}
      height={70}
      style={{ borderRadius: "50%" }}
    />
  </div>
  

  {/* NAV DESKTOP */}
  <nav style={styles.nav} className="desktop-nav">
    <button style={styles.link} onClick={() => scrollToSection("hero")}>
      {lang === "fr" ? "Accueil" : "Home"}
    </button>
    <button style={styles.link} onClick={() => scrollToSection("services")}>
      {lang === "fr" ? "Services" : "Services"}
    </button>
    <button style={styles.link} onClick={() => scrollToSection("why")}>
      {lang === "fr" ? "Pourquoi nous" : "Why us"}
    </button>
    <button style={styles.link} onClick={() => scrollToSection("partners")}>
      {lang === "fr" ? "Partenaires" : "Partners"}
    </button>
    <button style={styles.link} onClick={() => scrollToSection("process")}>
      {lang === "fr" ? "Méthode" : "Process"}
    </button>
    <button style={styles.link} onClick={() => scrollToSection("contact")}>
      {lang === "fr" ? "Contact" : "Contact"}
    </button>
  </nav>

  {/* ACTIONS (LANG + BURGER) */}
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <button style={styles.langButton} onClick={toggleLang}>
      {lang === "fr" ? "EN" : "FR"}
    </button>

    {/* BURGER MOBILE */}
    <button
      className="burger"
      style={styles.burger}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Menu"
    >
      {menuOpen ? "✕" : "☰"}
    </button>
  </div>

  {/* MENU MOBILE */}
  {menuOpen && (
    <div style={styles.mobileMenu}>
      {[
        ["hero", "Accueil", "Home"],
        ["services", "Services", "Services"],
        ["why", "Pourquoi nous", "Why us"],
        ["partners", "Partenaires", "Partners"],
        ["process", "Méthode", "Process"],
        ["contact", "Contact", "Contact"],
      ].map(([id, fr, en]) => (
        <button
          key={id}
          style={styles.mobileLink}
          onClick={() => {
            scrollToSection(id);
            setMenuOpen(false);
          }}
        >
          {lang === "fr" ? fr : en}
        </button>
      ))}
    </div>
  )}
</header>


     {/* ================= HERO ================= */}
<section id="hero" style={styles.hero}>
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {lang === "fr"
      ? "Solutions informatiques & innovation numérique"
      : "IT Solutions & Digital Innovation"}
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
  >
    {lang === "fr"
      ? "MSM ACTIVITY accompagne entreprises et particuliers dans le développement, les services numériques, la formation et le conseil informatique. Nos services sont disponibles partout dans le monde."
      : "MSM ACTIVITY supports businesses and individuals in development, digital services, training, and IT consulting. Our services are available worldwide."}
  </motion.p>

  <motion.button
    style={styles.ctaButton}
    onClick={() => scrollToSection("contact")}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(251,146,60,0.5)" }}
  >
    {lang === "fr" ? "Nous contacter" : "Contact Us"}
  </motion.button>
</section>

{/* ================= INTRO ================= */}
<section style={styles.introSection}>
  <div style={styles.introContainer}>
    
    <div style={styles.introLeft}>
      <h3 style={styles.introTitle}>
        {lang === "fr" ? "Qui sommes-nous ?" : "Who are we?"}
      </h3>
      <div style={styles.introUnderline}></div>

      <p style={styles.introText}>
        {lang === "fr"
          ? "MSM ACTIVITY est une entreprise innovante spécialisée dans le développement d’applications informatiques, les services numériques, la formation et le conseil stratégique."
          : "MSM ACTIVITY is an innovative company specializing in IT application development, digital services, training, and strategic consulting."}
      </p>

      <p style={styles.introText}>
        {lang === "fr"
          ? "Nous combinons expertise technique et vision métier pour créer des solutions modernes, fiables et évolutives."
          : "We combine technical expertise and business vision to create modern, reliable, and scalable solutions."}
      </p>
    </div>

    <div style={styles.introRight}>
      <div style={styles.introHighlight}>
        <span style={styles.highlightNumber}>+5</span>
        <p style={styles.highlightText}>
          {lang === "fr"
            ? "Domaines d'expertise stratégiques"
            : "Strategic areas of expertise"}
        </p>
      </div>

      <div style={styles.introHighlight}>
        <span style={styles.highlightNumber}>100%</span>
        <p style={styles.highlightText}>
          {lang === "fr"
            ? "Solutions sur mesure"
            : "Tailored solutions"}
        </p>
      </div>
    </div>

  </div>
</section>



     {/* ================= STATS ================= */}
<section style={styles.statsSection}>
  <div style={styles.statsContainer}>
    {[
      { value: 10, labelFR: "Projets livrés", labelEN: "Projects delivered" },
      { value: 100, labelFR: "Solutions sur mesure", labelEN: "Custom solutions" },
      { value: 1, labelFR: "Interlocuteur dédié", labelEN: "Dedicated contact" },
    ].map((stat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        style={styles.statCard}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: i * 0.2 }}
          style={styles.statNumber}
        >
          {stat.value}
          {stat.labelFR === "Solutions sur mesure" && "%"}
        </motion.div>

        <h4 style={styles.statLabel}>
          {lang === "fr" ? stat.labelFR : stat.labelEN}
        </h4>

        <p style={styles.statDesc}>
          {lang === "fr"
            ? stat.labelFR === "Projets livrés"
              ? "Des solutions réussies pour des entreprises locales et internationales."
              : stat.labelFR === "Solutions sur mesure"
              ? "Chaque projet est conçu pour répondre exactement aux besoins uniques de nos clients."
              : "Un point de contact unique pour un suivi simple et efficace."
            : stat.labelEN === "Projects delivered"
              ? "Successful solutions for local and international businesses."
              : stat.labelEN === "Custom solutions"
              ? "Every project is designed to perfectly meet our clients' unique needs."
              : "A single point of contact for simple and efficient follow-up."}
        </p>
      </motion.div>
    ))}
  </div>
</section>

    <section id="services" style={styles.section}>
  <h2 style={styles.title}>{lang === "fr" ? "Nos expertises" : "Our Expertise"}</h2>
  <div style={styles.grid}>
    {services.map((service, index) => (
      <motion.div
        key={index}
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{
          y: -10,
          scale: 1.03,
          boxShadow: "0 20px 50px rgba(15,23,42,0.2)",
        }}
      >
        <motion.div
          style={{ color: "var(--msm-orange)", marginBottom: 16 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {service.icon}
        </motion.div>

        <h3 style={{ marginBottom: 12 }}>{service.title}</h3>
        <p style={{ marginBottom: 12, color: "#475569" }}>{service.description}</p>

        <motion.button
          onClick={() =>
            setOpenService(openService === index ? null : index)
          }
          style={{
            background: "none",
            border: "none",
            color: "var(--msm-orange)",
            cursor: "pointer",
            fontWeight: 600,
          }}
          whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(251,146,60,0.7)" }}
        >
          {openService === index
            ? lang === "fr" ? "Voir moins" : "See less"
            : lang === "fr" ? "Voir plus" : "See more"}
        </motion.button>

        {openService === index && (
          <motion.div
            style={{
              marginTop: 12,
              padding: 12,
              background: "#f8fafc",
              borderRadius: 8,
              fontSize: 14,
              color: "#334155",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {service.details}
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
</section>



      {/* ================= POURQUOI NOUS ================= */}
<section id="why" style={styles.why}>
  <h2>{lang === "fr" ? "Pourquoi choisir MSM ACTIVITY ?" : "Why choose MSM ACTIVITY?"}</h2>

  <div style={styles.grid}>
    {[
      {
        title: lang === "fr" ? "Approche orientée business" : "Business-oriented approach",
        desc: lang === "fr"
          ? "Nous analysons d’abord vos objectifs commerciaux avant de proposer une solution technique. La technologie doit générer des résultats concrets."
          : "We analyze your business goals first before proposing any technical solution. Technology must generate real results.",
      },
      {
        title: lang === "fr" ? "Solutions évolutives et durables" : "Scalable & sustainable solutions",
        desc: lang === "fr"
          ? "Nos solutions sont conçues pour grandir avec votre entreprise et éviter les reconstructions coûteuses à long terme."
          : "Our solutions are designed to grow with your business and avoid costly rebuilds in the future.",
      },
      {
        title: lang === "fr" ? "Communication claire et transparente" : "Clear & transparent communication",
        desc: lang === "fr"
          ? "Nous expliquons chaque étape de manière simple afin que vous compreniez parfaitement votre projet, même sans être informaticien."
          : "We explain every step in simple terms so you fully understand your project, even without technical knowledge.",
      },
      {
        title: lang === "fr" ? "Partenariats stratégiques solides" : "Strong strategic partnerships",
        desc: lang === "fr"
          ? "Nous collaborons avec des entreprises complémentaires pour offrir des solutions complètes et fiables."
          : "We collaborate with complementary companies to deliver complete and reliable solutions.",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        style={styles.whyCard}
        whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <FaCheckCircle size={26} style={{ color: "var(--msm-orange)" }} />
        <div>
          <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
          <p style={{ opacity: 0.85, fontSize: "15px" }}>{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* ================= PARTENAIRES ================= */}
<section id="partners" style={styles.section}>
  <h2 style={styles.title}>{lang === "fr" ? "Ils nous font confiance" : "Our Partners"}</h2>
  <p style={styles.lead}>
    {lang === "fr"
      ? "MSM ACTIVITY s’appuie sur un réseau de partenaires solides, issus de secteurs complémentaires, afin d’offrir des solutions complètes et fiables."
      : "MSM ACTIVITY relies on a strong network of partners across complementary sectors to offer complete and reliable solutions."}
  </p>

  <div style={styles.partnersGrid}>
    {partners.map((p, i) => (
      <motion.div
        key={i}
        style={styles.partnerCard}
        whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Image
          src={p.logo}
          alt={p.name}
          width={90}
          height={90}
          style={{ objectFit: "cover", borderRadius: "50%", marginBottom: "16px" }}
        />

        <h3 style={{ ...styles.cardTitle }}>{p.name}</h3>
        <p style={styles.partnerField}><strong>{p.field}</strong></p>
        <p style={styles.partnerDescription}>{p.description}</p>
        <span style={styles.partnerYears}>{p.years}</span>
        {p.website && (
          <a href={p.website} target="_blank" rel="noopener noreferrer" style={styles.partnerButton}>
            {lang === "fr" ? "Visiter le site" : "Visit website"}
          </a>
        )}
      </motion.div>
    ))}
  </div>

  <button style={{ ...styles.ctaButton, marginTop: 30 }} onClick={() => scrollToSection("contact")}>
    {lang === "fr" ? "Devenir partenaire" : "Become a partner"}
  </button>
</section>


    {/* ================= PROCESS ================= */}
<section id="process" style={styles.section}>
  <h2 style={styles.processTitle}>
  {lang === "fr" ? "Notre méthode de travail" : "Our Work Process"}
  <div style={styles.titleUnderline}></div>
</h2>


  <ol style={styles.processGrid}>
    {[
      {
        title:
          lang === "fr"
            ? "Analyse de vos besoins et enjeux"
            : "Analyze your needs & challenges",
        desc:
          lang === "fr"
            ? "Nous commençons chaque projet par une étude approfondie de vos objectifs, contraintes et attentes. Cette étape nous permet de définir un cahier des charges clair."
            : "We start every project with a thorough study of your goals, constraints, and expectations.",
      },
      {
        title:
          lang === "fr"
            ? "Proposition de solution claire et chiffrée"
            : "Propose a clear & budgeted solution",
        desc:
          lang === "fr"
            ? "Nous vous présentons une solution sur mesure avec budget détaillé et planning précis."
            : "We present a tailored solution with detailed budget and timeline.",
      },
      {
        title:
          lang === "fr"
            ? "Développement et mise en œuvre"
            : "Development & implementation",
        desc:
          lang === "fr"
            ? "Nos équipes techniques mettent en œuvre la solution avec rigueur et expertise."
            : "Our technical teams implement the solution with rigor and expertise.",
      },
      {
        title:
          lang === "fr"
            ? "Tests, livraison et accompagnement"
            : "Testing, delivery & support",
        desc:
          lang === "fr"
            ? "Nous effectuons des tests complets, livrons clé en main et assurons un suivi personnalisé."
            : "We perform testing, deliver turnkey and provide personalized support.",
      },
    ].map((step, index) => (
      <li key={index} style={styles.processCard}>
        <div style={styles.stepNumber}>{index + 1}</div>
        <h3 style={styles.stepTitle}>{step.title}</h3>
        <p style={styles.stepDesc}>{step.desc}</p>
      </li>
    ))}
  </ol>
</section>


{/* ================= À PROPOS ================= */}
<section id="about" style={styles.aboutSection}>
  <div style={styles.aboutContainer}>
    
    <div style={styles.aboutLeft}>
      <h2 style={styles.aboutTitle}>
        {lang === "fr" ? "À propos de MSM ACTIVITY" : "About MSM ACTIVITY"}
      </h2>
      <div style={styles.titleUnderline}></div>

      <p style={styles.aboutText}>
        {lang === "fr"
          ? "MSM ACTIVITY est née d’une conviction forte : la technologie doit être un levier de croissance, et non une contrainte."
          : "MSM ACTIVITY was born from a strong belief: technology should be a growth driver, not a constraint."}
      </p>

      <p style={styles.aboutText}>
        {lang === "fr"
          ? "Nous combinons expertise technique, vision stratégique et accompagnement humain pour garantir des solutions efficaces et durables."
          : "We combine technical expertise, strategic vision, and human support to ensure effective and sustainable solutions."}
      </p>

      <p style={styles.aboutText}>
        {lang === "fr"
          ? "Nous privilégions transparence, qualité et innovation pour générer un impact concret sur votre activité."
          : "We prioritize transparency, quality, and innovation to generate real impact on your business."}
      </p>
    </div>

    <div style={styles.aboutRight}>
      <div style={styles.aboutCard}>
        <h3 style={{ marginBottom: "10px" }}>
          {lang === "fr" ? "Notre engagement" : "Our Commitment"}
        </h3>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>
          {lang === "fr"
            ? "Vous accompagner à chaque étape avec des solutions modernes, performantes et évolutives."
            : "Support you at every stage with modern, high-performance, and scalable solutions."}
        </p>
      </div>
    </div>

  </div>
</section>

{/* ================= RÉALISATIONS ================= */}
<section id="projects" style={styles.section}>
  <h2 style={styles.title}>{lang === "fr" ? "Nos réalisations" : "Our Projects"}</h2>
  <p style={styles.lead}>
    {lang === "fr"
      ? "Découvrez quelques-uns des projets que nous avons réalisés pour nos clients."
      : "Check out some of the projects we have delivered for our clients."}
  </p>

  <div style={styles.projectsGrid}>
    {[
      {
        title: "Application de gestion de flotte",
        description: lang === "fr"
          ? "Solution complète pour le suivi et la gestion des véhicules d'entreprise."
          : "Comprehensive solution for tracking and managing company vehicles.",
        image: "/projects/fleet-app.jpg",
        link: "#",
      },
      {
        title: "Plateforme de formation en ligne",
        description: lang === "fr"
          ? "Portail interactif pour l’inscription et le suivi des formations."
          : "Interactive portal for course registration and tracking.",
        image: "/projects/elearning.jpg",
        link: "#",
      },
      {
        title: "Site e-commerce",
        description: lang === "fr"
          ? "Boutique en ligne optimisée pour le commerce digital."
          : "Online store optimized for digital commerce.",
        image: "/projects/ecommerce.jpg",
        link: "#",
      },
    ].map((project, i) => (
      <motion.div
        key={i}
        style={styles.projectCard}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        whileHover={{ y: -6, scale: 1.03, boxShadow: "0 16px 36px rgba(0,0,0,0.15)" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={300}
          height={180}
          style={{ borderRadius: "12px", objectFit: "cover", marginBottom: "16px" }}
        />
        <h3 style={{ marginBottom: 8, color: "var(--msm-orange)" }}>{project.title}</h3>
        <p style={{ fontSize: "14px", opacity: 0.85 }}>{project.description}</p>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={styles.partnerButton}>
            {lang === "fr" ? "Voir le projet" : "View Project"}
          </a>
        )}
      </motion.div>
    ))}
  </div>
</section>


      {/* ================= CTA ================= */}
      <section style={{ ...styles.cta, background: "var(--msm-blue)" }}>
        <h2>{lang === "fr" ? "Un projet ? Une idée ? Un partenariat ?" : "A project? An idea? A partnership?"}</h2>
        <p>{lang === "fr" ? "Parlons-en et construisons une solution efficace ensemble." : "Let's talk and build an effective solution together."}</p>
        <button style={styles.ctaButton} onClick={() => scrollToSection("contact")}>
          {lang === "fr" ? "Discuter avec un expert" : "Talk to an expert"}
        </button>
      </section>

   {/* ================= CONTACT ================= */}
<section id="contact" style={styles.contactSection}>
  <div style={styles.contactContainer}>

    {/* LEFT SIDE */}
    <div style={styles.contactLeft}>
      <h2 style={styles.contactTitle}>
        {lang === "fr" ? "Contactez-nous" : "Contact Us"}
      </h2>
      <div style={styles.contactUnderline}></div>

      <p style={styles.contactLead}>
        {lang === "fr"
          ? "Discutons de votre projet et trouvons ensemble la meilleure solution."
          : "Let's discuss your project and find the best solution together."}
      </p>

      <div style={styles.contactInfoBox}>
        <strong>WhatsApp</strong>
        <p>+237 677 315 024</p>
      </div>

      <div style={styles.contactInfoBox}>
        <strong>Email</strong>
        <p>activitymsm@gmail.com</p>
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <form style={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
      <input
        name="name"
        placeholder={lang === "fr" ? "Nom complet" : "Full Name"}
        style={styles.contactInput}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        style={styles.contactInput}
        required
      />
      <input
        name="phone"
        placeholder={lang === "fr" ? "Téléphone" : "Phone"}
        type="tel"
        style={styles.contactInput}
        required
      />
      <textarea
        name="message"
        placeholder={lang === "fr" ? "Votre message..." : "Your message..."}
        style={styles.contactTextarea}
        required
      />

      <div style={styles.contactButtons}>
        <button type="button" style={styles.whatsappButton}>
          WhatsApp
        </button>
        <button type="button" style={styles.emailButton}>
          Email
        </button>
      </div>
    </form>

  </div>
</section>


    {/* ================= REVIEWS ================= */}
<section id="reviews" style={styles.reviewsSection}>
  <div style={styles.reviewsContainer}>

    <h2 style={styles.reviewsTitle}>
      {lang === "fr" ? "Avis clients" : "Customer Reviews"}
    </h2>
    <div style={styles.reviewsUnderline}></div>

    <p style={styles.reviewsLead}>
      {lang === "fr"
        ? "Découvrez ce que nos clients pensent de MSM ACTIVITY."
        : "See what our customers say about MSM ACTIVITY."}
    </p>

    {/* FORM CARD */}
    <div style={styles.reviewFormCard}>
      <form
        style={styles.reviewForm}
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const name = (form.elements.namedItem("name") as HTMLInputElement).value;
          const rating = parseInt((form.elements.namedItem("rating") as HTMLSelectElement).value);
          const comment = (form.elements.namedItem("comment") as HTMLTextAreaElement).value;
          await addReviewFirebase(name, rating, comment);
          form.reset();
        }}
      >
        <input
          name="name"
          placeholder={lang === "fr" ? "Nom" : "Name"}
          style={styles.reviewInput}
          required
        />

        <select name="rating" style={styles.reviewInput} defaultValue="5">
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          name="comment"
          placeholder={lang === "fr" ? "Votre avis" : "Your review"}
          style={styles.reviewTextarea}
          required
        />

        <button type="submit" style={styles.reviewButton}>
          {lang === "fr" ? "Envoyer" : "Submit"}
        </button>
      </form>
    </div>

    {/* LISTE DES AVIS */}
    <div style={styles.reviewList}>
      {loadingReviews && (
        <p>{lang === "fr" ? "Chargement des avis..." : "Loading reviews..."}</p>
      )}

      {!loadingReviews && reviews.length === 0 && (
        <p style={{ opacity: 0.7 }}>
          {lang === "fr"
            ? "Aucun avis pour le moment, soyez le premier !"
            : "No reviews yet, be the first!"}
        </p>
      )}

      {!loadingReviews &&
        reviews.map((r, i) => (
          <div key={i} style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <strong>{r.name}</strong>
              <span style={styles.reviewStars}>
                {'⭐'.repeat(r.rating)}
              </span>
            </div>
            <p style={styles.reviewText}>{r.comment}</p>
          </div>
        ))}
    </div>

  </div>
</section>


      {/* ================= FOOTER ================= */}
     <footer style={styles.footer}>
      <div style={styles.info}>
        <p>📍 Yaoundé, Cameroun</p>
      </div>
      <p style={styles.copyright}>
        © {new Date().getFullYear()} MSM ACTIVITY. Tous droits réservés.
      </p>
      <p style={{marginTop: "6px", fontSize: "14px", opacity: 0.8}}>
  🌍 Nous offrons nos services au Cameroun et à l’international
</p>

    </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // ================= HEADER =================
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "var(--msm-blue)",
    zIndex: 1000,
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  },
  logo: { display: "flex", alignItems: "center" },
  nav: { display: "flex", gap: "25px" },
  link: {
    background: "none",
    border: "none",
    color: "var(--msm-orange)",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "5px 10px",
    transition: "color 0.3s ease",
  },
  langButton: {
    background: "var(--msm-orange)",
    border: "none",
    color: "#fff",
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  // ================= SECTIONS =================
  section: {
    padding: "100px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    textAlign: "center",
    transition: "all 0.4s ease",
  },
  hero: {
    padding: "140px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
  },
  intro: {
    padding: "100px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    padding: "80px 20px",
    background: "#fff",
    flexWrap: "wrap",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
    transition: "all 0.3s ease",
  },

  // ================= CARDS =================
  card: {
  padding: "36px",
  borderRadius: "16px",
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  cursor: "pointer",
  textAlign: "left",
  borderLeft: "6px solid #0f172a", // <-- bordure gauche bleu marine
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
},

  cardHover: {
  transform: "translateY(-8px)",
  boxShadow: "0 16px 40px rgba(15,23,42,0.15)",
  borderLeftColor: "#fba432", // change la bordure à l’orange MSM au hover
},

  icon: { color: "var(--msm-orange)", marginBottom: "20px" },
  cardTitle: { marginBottom: "12px", color: "var(--msm-orange)" },

  // ================= POURQUOI =================
  why: {
    padding: "100px 20px",
    background: "#0f172a",
    color: "#fff",
    textAlign: "center",
  },
  whyCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    background: "#111827",
    padding: "28px",
    borderRadius: "14px",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  whyCardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },

  // ================= PARTENAIRES =================
  partnersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
    marginTop: "50px",
    justifyItems: "center",
    transition: "all 0.3s ease",
  },
  partnerCard: {
  padding: "30px",
  borderRadius: "14px",
  background: "#fff",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  cursor: "pointer",
  textAlign: "center",
  borderRight: "6px solid #0f172a", // <-- bordure droite bleu marine
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
},
partnerCardHover: {
  transform: "translateY(-6px)",
  boxShadow: "0 16px 36px rgba(0,0,0,0.15)",
  borderRightColor: "#fba432", // orange au hover
},

  partnerDescription: {
    marginTop: "12px",
    fontSize: "14px",
    lineHeight: 1.6,
    opacity: 0.85,
  },
  partnerButton: {
    display: "inline-block",
    marginTop: "16px",
    padding: "10px 18px",
    borderRadius: "8px",
    background: "var(--msm-orange)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  partnerField: { marginTop: "10px", fontWeight: 500 },
  partnerYears: { display: "block", marginTop: "8px", fontSize: "14px", opacity: 0.7 },

  // ================= PROCESS =================
  process: { maxWidth: "600px", margin: "0 auto", textAlign: "left", lineHeight: 2 },

  // ================= CTA =================
  cta: { padding: "110px 20px", color: "#fff", textAlign: "center" },
  ctaButton: {
    marginTop: "24px",
    padding: "16px 38px",
    fontSize: "18px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "var(--msm-orange)",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  ctaButtonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  // ================= FORM =================
 contactSection: {
  padding: "120px 20px",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  color: "#ffffff",
},

contactContainer: {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center",
},

contactTitle: {
  fontSize: "36px",
  fontWeight: 700,
  marginBottom: "10px",
},

contactUnderline: {
  width: "70px",
  height: "4px",
  background: "linear-gradient(to right, #ff7a00, #ffffff)",
  borderRadius: "4px",
  marginBottom: "30px",
},

contactLead: {
  fontSize: "16px",
  opacity: 0.9,
  marginBottom: "30px",
  lineHeight: 1.7,
},

contactInfoBox: {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.1)",
},

contactForm: {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
},

contactInput: {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
},

contactTextarea: {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  minHeight: "120px",
},

contactButtons: {
  display: "flex",
  gap: "15px",
},

whatsappButton: {
  flex: 1,
  padding: "14px",
  background: "#25D366",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
},

emailButton: {
  flex: 1,
  padding: "14px",
  background: "#0f172a",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
},

reviewsSection: {
  padding: "120px 20px",
  background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
},

reviewsContainer: {
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
},

reviewsTitle: {
  fontSize: "34px",
  fontWeight: 700,
},

reviewsUnderline: {
  width: "70px",
  height: "4px",
  background: "linear-gradient(to right, #0f172a, #ff7a00)",
  margin: "15px auto 30px",
  borderRadius: "4px",
},

reviewsLead: {
  marginBottom: "40px",
  opacity: 0.8,
},

reviewFormCard: {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  marginBottom: "60px",
},

reviewForm: {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
},

reviewInput: {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
},

reviewTextarea: {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
  minHeight: "120px",
},

reviewButton: {
  padding: "14px",
  background: "#0f172a",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: 600,
  cursor: "pointer",
},

reviewList: {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  textAlign: "left",
},

reviewCard: {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  borderLeft: "5px solid #ff7a00",
},

reviewHeader: {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
},

reviewStars: {
  color: "#ffb400",
},

reviewText: {
  fontSize: "14px",
  lineHeight: 1.6,
  opacity: 0.85,
},


  // ================= FOOTER =================
  footer: { padding: "30px 20px", textAlign: "center", background: "#0f172a", color: "#fff" },

  // ================= BURGER =================
  burger: { display: "none", fontSize: "28px", background: "none", border: "none", color: "#fff", cursor: "pointer" },

  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    background: "var(--msm-blue)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    zIndex: 999,
  },
  mobileLink: {
    padding: "14px 0",
    background: "none",
    border: "none",
    color: "var(--msm-orange)",
    fontSize: "18px",
    cursor: "pointer",
  },

  processTitle: {
  fontSize: "34px",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "60px",
  position: "relative",
},

titleUnderline: {
  width: "80px",
  height: "4px",
  background: "linear-gradient(to right, #0f172a, #ff7a00)",
  margin: "12px auto 0",
  borderRadius: "4px",
},


  processGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  marginTop: "60px",
  listStyle: "none",
  padding: 0,
},

processCard: {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  borderLeft: "6px solid #0f172a", // bleu marine pep's
  transition: "all 0.3s ease",
  cursor: "pointer",
  
},

stepNumber: {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ff7a00", // ton orange MSM
  marginBottom: "10px",
},

stepTitle: {
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "10px",
},

stepDesc: {
  fontSize: "14px",
  opacity: 0.75,
  lineHeight: 1.6,
},

aboutSection: {
  padding: "100px 20px",
  background: "linear-gradient(135deg, #f5f7fa, #e9eef5)",
},

aboutContainer: {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "60px",
  alignItems: "center",
},

aboutTitle: {
  fontSize: "36px",
  fontWeight: 700,
  marginBottom: "10px",
},

aboutTitleUnderline: {
  width: "80px",
  height: "4px",
  background: "linear-gradient(to right, #0f172a, #ff7a00)",
  borderRadius: "4px",
  marginBottom: "30px",
},


aboutText: {
  fontSize: "16px",
  lineHeight: 1.7,
  marginBottom: "20px",
  color: "#333",
},

aboutRight: {
  display: "flex",
  justifyContent: "center",
},

aboutCard: {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
  borderTop: "6px solid #0f172a",
  transition: "0.3s ease",
},

introSection: {
  padding: "100px 20px",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  color: "#ffffff",
},

introContainer: {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "60px",
  alignItems: "center",
},

introTitle: {
  fontSize: "38px",
  fontWeight: 700,
  marginBottom: "10px",
},

introUnderline: {
  width: "70px",
  height: "4px",
  background: "linear-gradient(to right, #ff7a00, #ffffff)",
  borderRadius: "4px",
  marginBottom: "30px",
},

introText: {
  fontSize: "16px",
  lineHeight: 1.8,
  marginBottom: "20px",
  opacity: 0.9,
},

introRight: {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
},

introHighlight: {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "16px",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.1)",
},

highlightNumber: {
  fontSize: "36px",
  fontWeight: 700,
  color: "#ff7a00",
  display: "block",
},

highlightText: {
  marginTop: "8px",
  fontSize: "14px",
  opacity: 0.85,
},

statsSection: {
  padding: "100px 20px",
  background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
},

statsContainer: {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "40px",
},

statCard: {
  background: "#ffffff",
  padding: "40px 30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
  borderTop: "5px solid #0f172a",
  transition: "all 0.3s ease",
},

statNumber: {
  fontSize: "48px",
  fontWeight: 700,
  background: "linear-gradient(to right, #0f172a, #ff7a00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "15px",
},

statLabel: {
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "10px",
},

statDesc: {
  fontSize: "14px",
  opacity: 0.8,
  lineHeight: 1.6,
},

projectsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
  marginTop: "40px",
  justifyItems: "center",
  transition: "all 0.3s ease",
},

projectCard: {
  padding: "20px",
  borderRadius: "16px",
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
},



};

