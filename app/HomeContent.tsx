"use client";

import Image from "next/image";
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
    website: "https://eyimo-services.com", // Mets le vrai lien ici
    logo: "/partners/eyimo.jpeg",
  },
  {
    name: "MOKOLI GROUP",
    years: "5 ans d’existence",
    field: "Assurances & services financiers",
    description:
      "Cabinet proposant des solutions d’assurance, de protection financière et d’accompagnement stratégique pour entreprises et particuliers.",
    website: "https://mokoligroup.com",
    logo: "/partners/mokoli.jpeg",
  },
  {
    name: "BELIFE INSURANCE GENERAL",
    years: "Entreprise reconnue",
    field: "Assurances",
    description:
      "Compagnie d’assurance offrant des produits adaptés aux besoins des particuliers et professionnels.",
    website: "https://belifeinsurance.com",
    logo: "/partners/belife.jpeg",
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
  <h2>
    {lang === "fr"
      ? "Solutions informatiques & innovation numérique"
      : "IT Solutions & Digital Innovation"}
  </h2>
  <p>
    {lang === "fr"
      ? "MSM ACTIVITY accompagne entreprises et particuliers dans le développement, les services numériques, la formation et le conseil informatique. Nos services sont disponibles partout dans le monde."
      : "MSM ACTIVITY supports businesses and individuals in development, digital services, training, and IT consulting. Our services are available worldwide."}
  </p>
  <button style={styles.ctaButton} onClick={() => scrollToSection("contact")}>
    {lang === "fr" ? "Nous contacter" : "Contact Us"}
  </button>
</section>

{/* ================= INTRO ================= */}
<section style={styles.intro}>
  <h3>{lang === "fr" ? "Qui sommes-nous ?" : "Who are we?"}</h3>
  <p>
    {lang === "fr"
      ? "MSM ACTIVITY est une entreprise innovante dédiée au développement d’applications informatiques, aux services numériques, à la formation et au conseil stratégique. Nous combinons expertise technique et compréhension des besoins métiers pour fournir des solutions modernes, fiables et évolutives, conçues pour accompagner la croissance de votre entreprise et optimiser vos processus."
      : "MSM ACTIVITY is an innovative company dedicated to IT application development, digital services, training, and strategic consulting. We combine technical expertise with business understanding to deliver modern, reliable, and scalable solutions designed to drive your company's growth and optimize your processes."}
  </p>
  <p>
    {lang === "fr"
      ? "Notre approche est centrée sur le client : chaque projet est analysé en profondeur afin de proposer des solutions sur mesure, efficaces et pérennes. Nous mettons un point d’honneur à fournir un accompagnement personnalisé à chaque étape, garantissant la réussite et la satisfaction de nos partenaires."
      : "Our approach is client-focused: every project is carefully analyzed to offer tailored, effective, and sustainable solutions. We are committed to providing personalized support at every stage, ensuring the success and satisfaction of our partners."}
  </p>
</section>



      {/* ================= STATS ================= */}
<section style={styles.stats}>
  <div>
    <strong>+10</strong>
    <span>
      {lang === "fr" 
        ? "Projets livrés" 
        : "Projects delivered"}
    </span>
    <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
      {lang === "fr"
        ? "Des solutions réussies pour des entreprises locales et internationales."
        : "Successful solutions for local and international businesses."}
    </p>
  </div>

  <div>
    <strong>100%</strong>
    <span>
      {lang === "fr" 
        ? "Solutions sur mesure" 
        : "Custom solutions"}
    </span>
    <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
      {lang === "fr"
        ? "Chaque projet est conçu pour répondre exactement aux besoins uniques de nos clients."
        : "Every project is designed to perfectly meet our clients' unique needs."}
    </p>
  </div>

  <div>
    <strong>1</strong>
    <span>
      {lang === "fr" 
        ? "Interlocuteur dédié" 
        : "Dedicated contact"}
    </span>
    <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
      {lang === "fr"
        ? "Un point de contact unique pour un suivi simple et efficace."
        : "A single point of contact for simple and efficient follow-up."}
    </p>
  </div>
</section>


      {/* ================= SERVICES ================= */}
      <section id="services" style={styles.section}>
        <h2 style={styles.title}>{lang === "fr" ? "Nos expertises" : "Our Expertise"}</h2>
        <div style={styles.grid}>
          {services.map((service, index) => (
  <div
    key={index}
    style={styles.card}
    onMouseEnter={(e) =>
      (e.currentTarget.style.transform = "translateY(-8px)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.transform = "translateY(0)")
    }
  >
    <div style={{ color: "var(--msm-orange)", marginBottom: "16px" }}>
      {service.icon}
    </div>

    <h3 style={{ marginBottom: "12px" }}>{service.title}</h3>
    <p style={{ marginBottom: "12px", color: "#475569" }}>
      {service.description}
    </p>

    <button
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
    >
      {openService === index
        ? lang === "fr" ? "Voir moins" : "See less"
        : lang === "fr" ? "Voir plus" : "See more"}
    </button>

    {openService === index && (
      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          background: "#f8fafc",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#334155",
          transition: "all 0.3s ease",
        }}
      >
        {service.details}
      </div>
    )}
  </div>
))}

        </div>
      </section>

      {/* ================= POURQUOI NOUS ================= */}
<section id="why" style={styles.why}>
  <h2>
    {lang === "fr"
      ? "Pourquoi choisir MSM ACTIVITY ?"
      : "Why choose MSM ACTIVITY?"}
  </h2>

  <div style={styles.grid} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
>
    {[
      {
        title:
          lang === "fr"
            ? "Approche orientée business"
            : "Business-oriented approach",
        desc:
          lang === "fr"
            ? "Nous analysons d’abord vos objectifs commerciaux avant de proposer une solution technique. La technologie doit générer des résultats concrets."
            : "We analyze your business goals first before proposing any technical solution. Technology must generate real results.",
      },
      {
        title:
          lang === "fr"
            ? "Solutions évolutives et durables"
            : "Scalable & sustainable solutions",
        desc:
          lang === "fr"
            ? "Nos solutions sont conçues pour grandir avec votre entreprise et éviter les reconstructions coûteuses à long terme."
            : "Our solutions are designed to grow with your business and avoid costly rebuilds in the future.",
      },
      {
        title:
          lang === "fr"
            ? "Communication claire et transparente"
            : "Clear & transparent communication",
        desc:
          lang === "fr"
            ? "Nous expliquons chaque étape de manière simple afin que vous compreniez parfaitement votre projet, même sans être informaticien."
            : "We explain every step in simple terms so you fully understand your project, even without technical knowledge.",
      },
      {
        title:
          lang === "fr"
            ? "Partenariats stratégiques solides"
            : "Strong strategic partnerships",
        desc:
          lang === "fr"
            ? "Nous collaborons avec des entreprises complémentaires pour offrir des solutions complètes et fiables."
            : "We collaborate with complementary companies to deliver complete and reliable solutions.",
      },
    ].map((item, i) => (
      <div key={i} style={styles.whyCard}>
        <FaCheckCircle size={26} style={{ color: "var(--msm-orange)" }} />
        <div>
          <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
          <p style={{ opacity: 0.85, fontSize: "15px" }}>{item.desc}</p>
        </div>
      </div>
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

  <div style={styles.partnersGrid} onMouseEnter={(e) =>
  (e.currentTarget.style.transform = "translateY(-6px)")
}
onMouseLeave={(e) =>
  (e.currentTarget.style.transform = "translateY(0)")
}
>
  <div style={styles.partnersGrid}>
  {partners.map((p, i) => (
    <div key={i} style={styles.partnerCard}>
      <Image
        src={p.logo}
        alt={p.name}
        width={90}
        height={90}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          marginBottom: "16px",
        }}
      />

      <h3 style={{ ...styles.cardTitle }}>{p.name}</h3>

      <p style={styles.partnerField}>
        <strong>{p.field}</strong>
      </p>

      <p style={styles.partnerDescription}>
        {p.description}
      </p>

      <span style={styles.partnerYears}>{p.years}</span>

      {p.website && (
        <a
          href={p.website}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.partnerButton}
        >
          {lang === "fr" ? "Visiter le site" : "Visit website"}
        </a>
      )}
    </div>
  ))}
</div>

</div>



        {/* BOUTON DEVENIR PARTENAIRE */}
        <button style={{...styles.ctaButton, marginTop: 30}} onClick={() => scrollToSection("contact")}>
          {lang === "fr" ? "Devenir partenaire" : "Become a partner"}
        </button>
      </section>

     {/* ================= PROCESS ================= */}
<section id="process" style={styles.section}>
  <h2 style={styles.title}>
    {lang === "fr" ? "Notre méthode de travail" : "Our Work Process"}
  </h2>
  <ol style={styles.process}>
    <li>
      <strong>{lang === "fr" ? "Analyse de vos besoins et enjeux" : "Analyze your needs & challenges"}</strong>
      <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
        {lang === "fr"
          ? "Nous commençons chaque projet par une étude approfondie de vos objectifs, contraintes et attentes. Cette étape nous permet de définir un cahier des charges clair et de prévenir tout risque d'erreur."
          : "We start every project with a thorough study of your goals, constraints, and expectations. This step allows us to define clear specifications and prevent any risk of error."}
      </p>
    </li>
    <li>
      <strong>{lang === "fr" ? "Proposition de solution claire et chiffrée" : "Propose a clear & budgeted solution"}</strong>
      <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
        {lang === "fr"
          ? "Nous vous présentons une solution sur mesure, accompagnée d’un budget détaillé et d’un planning précis, afin que vous sachiez exactement ce que vous obtiendrez et à quel coût."
          : "We present you with a tailored solution, along with a detailed budget and a precise timeline, so you know exactly what you will get and at what cost."}
      </p>
    </li>
    <li>
      <strong>{lang === "fr" ? "Développement et mise en œuvre" : "Development & implementation"}</strong>
      <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
        {lang === "fr"
          ? "Nos équipes techniques mettent en œuvre la solution avec rigueur et expertise, en respectant les standards modernes et en garantissant performance, sécurité et évolutivité."
          : "Our technical teams implement the solution with rigor and expertise, adhering to modern standards and ensuring performance, security, and scalability."}
      </p>
    </li>
    <li>
      <strong>{lang === "fr" ? "Tests, livraison et accompagnement" : "Testing, delivery & support"}</strong>
      <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "4px" }}>
        {lang === "fr"
          ? "Nous effectuons des tests complets pour garantir la qualité, livrons le projet clé en main et assurons un suivi personnalisé pour vous accompagner dans la prise en main et l’évolution de votre solution."
          : "We perform comprehensive testing to ensure quality, deliver the project turnkey, and provide personalized support to help you adopt and evolve your solution."}
      </p>
    </li>
  </ol>
</section>

{/* ================= À PROPOS ================= */}
<section id="about" style={{ ...styles.section, background: "#f5f7fa" }}>
  <h2 style={styles.title}>
    {lang === "fr" ? "À propos de MSM ACTIVITY" : "About MSM ACTIVITY"}
  </h2>
  <p>
    {lang === "fr"
      ? "MSM ACTIVITY est née d’une conviction forte : la technologie doit être un levier de croissance, et non une contrainte. Nous croyons que chaque entreprise, quelle que soit sa taille, peut tirer parti de solutions numériques innovantes pour se développer et se démarquer."
      : "MSM ACTIVITY was born from a strong belief: technology should be a growth driver, not a constraint. We believe that every business, regardless of size, can leverage innovative digital solutions to grow and stand out."}
  </p>
  <p>
    {lang === "fr"
      ? "Notre force réside dans la combinaison de notre expertise technique, de notre vision stratégique et de notre accompagnement humain. Nous ne nous contentons pas de livrer des solutions, nous vous accompagnons à chaque étape pour garantir leur efficacité, leur adoption et leur évolution dans le temps."
      : "Our strength lies in combining technical expertise, strategic vision, and human support. We don’t just deliver solutions; we guide you at every step to ensure their effectiveness, adoption, and long-term evolution."}
  </p>
  <p>
    {lang === "fr"
      ? "Chez MSM ACTIVITY, nous privilégions la transparence, la qualité et l’innovation pour créer des solutions réellement utiles, adaptées à vos besoins et capables de générer un impact concret sur votre activité."
      : "At MSM ACTIVITY, we prioritize transparency, quality, and innovation to create solutions that are truly valuable, tailored to your needs, and capable of generating a real impact on your business."}
  </p>
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
<section id="contact" style={styles.section}>
  <h2 style={styles.title}>
    {lang === "fr" ? "Contactez-nous" : "Contact Us"}
  </h2>
  <p style={styles.lead}>
    {lang === "fr" 
      ? "Remplissez le formulaire ci-dessous ou choisissez votre moyen de contact préféré :" 
      : "Fill out the form below or choose your preferred contact method:"}
  </p>

  <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
    <input 
      name="name" 
      placeholder={lang === "fr" ? "Nom" : "Name"} 
      style={styles.input} 
      required 
    />
    <input 
      name="email" 
      placeholder="Email" 
      type="email" 
      style={styles.input} 
      required 
    />
    <input 
      name="phone" 
      placeholder={lang === "fr" ? "Numéro de téléphone" : "Phone number"} 
      type="tel" 
      style={styles.input} 
      required 
    />
    <textarea 
      name="message" 
      placeholder={lang === "fr" ? "Message" : "Message"} 
      style={styles.textarea} 
      required 
    />

    <div style={styles.contactButtons}>
      <button
        type="button"
        style={styles.contactButton}
        onClick={() => {
          const form = document.querySelector<HTMLFormElement>("form")!;
          const name = (form.elements.namedItem("name") as HTMLInputElement).value;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
          const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
          const whatsappMessage = `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`;
          const whatsappLink = `https://wa.me/237677315024?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(whatsappLink, "_blank");
        }}
      >
        WhatsApp
      </button>

      <button
        type="button"
        style={styles.contactButton}
        onClick={() => {
          const form = document.querySelector<HTMLFormElement>("form")!;
          const name = (form.elements.namedItem("name") as HTMLInputElement).value;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
          const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
          const emailMessage = `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`;
          const mailtoLink = `mailto:activitymsm@gmail.com?subject=Contact depuis MSM&body=${encodeURIComponent(emailMessage)}`;
          window.location.href = mailtoLink;
        }}
      >
        Email
      </button>
    </div>
  </form>
</section>


      <section id="reviews" style={styles.section}>
  <h2 style={styles.title}>{lang === "fr" ? "Avis clients" : "Customer Reviews"}</h2>
  <p style={styles.lead}>
    {lang === "fr"
      ? "Découvrez ce que nos clients pensent de MSM ACTIVITY."
      : "See what our customers say about MSM ACTIVITY."}
  </p>

  {/* Formulaire */}
  <form
  style={styles.form}
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
      style={styles.input}
      required
    />
    <select name="rating" style={styles.input} defaultValue="5">
      <option value="5">⭐⭐⭐⭐⭐</option>
      <option value="4">⭐⭐⭐⭐</option>
      <option value="3">⭐⭐⭐</option>
      <option value="2">⭐⭐</option>
      <option value="1">⭐</option>
    </select>
    <textarea
      name="comment"
      placeholder={lang === "fr" ? "Votre avis" : "Your review"}
      style={styles.textarea}
      required
    />
    <button type="submit" style={styles.ctaButton}>
      {lang === "fr" ? "Envoyer" : "Submit"}
    </button>
  </form>

  {/* Liste des avis */}
  <div style={{ marginTop: "40px", textAlign: "left", maxWidth: "700px", margin: "40px auto 0" }}>
    {loadingReviews && <p>{lang === "fr" ? "Chargement des avis..." : "Loading reviews..."}</p>}
    {!loadingReviews && reviews.length === 0 && (
      <p style={{ opacity: 0.7 }}>
        {lang === "fr" ? "Aucun avis pour le moment, soyez le premier à commenter !" : "No reviews yet, be the first to comment!"}
      </p>
    )}
    {!loadingReviews && reviews.map((r, i) => (
      <div
        key={i}
        style={{
          padding: "20px",
          borderBottom: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >
        <strong>{r.name}</strong> — <span>{'⭐'.repeat(r.rating)}</span>
        <p>{r.comment}</p>
      </div>
    ))}
  </div>
</section>


      {/* ================= FOOTER ================= */}
     <footer style={styles.footer}>
      <div style={styles.info}>
        <p>📍 Yaoundé, Cameroun</p>
        <p>⏰ Lun-Ven : 8h - 18h</p>
        <p>📞 <a href="tel:+237677315024" style={styles.link}>+237 677 315 024</a></p>
        <p>✉️ <a href="mailto:activitymsm@gmail.com" style={styles.link}>activitymsm@gmail.com</a></p>
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
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    transform: "translateY(0)",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 40px rgba(15,23,42,0.15)",
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
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  partnerCardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 16px 36px rgba(0,0,0,0.15)",
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
  form: { display: "flex", flexDirection: "column", gap: "20px", maxWidth: "500px", margin: "0 auto" },
  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  inputFocus: {
    borderColor: "var(--msm-orange)",
    boxShadow: "0 0 8px rgba(251,146,60,0.4)",
  },
  textarea: {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "120px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  textareaFocus: {
    borderColor: "var(--msm-orange)",
    boxShadow: "0 0 8px rgba(251,146,60,0.4)",
  },
  contactButtons: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" },
  contactButton: {
    padding: "14px 28px",
    borderRadius: "8px",
    background: "var(--msm-orange)",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
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
};

