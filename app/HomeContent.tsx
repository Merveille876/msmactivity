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

export default function HomeContent() {
  // ================= LANGUE =================
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);


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

  // ================= SERVICES =================
  const services = [
    {
      title: lang === "fr" ? "Développement sur mesure" : "Custom Development",
      description:
        lang === "fr"
          ? "Sites web, applications et outils métiers performants, conçus pour évoluer avec votre activité."
          : "Websites, apps and business tools designed to scale with your business.",
      icon: <FaLaptopCode size={42} />,
    },
    {
      title: lang === "fr" ? "Maintenance & support" : "Maintenance & Support",
      description:
        lang === "fr"
          ? "Sécurisation, mises à jour et assistance continue pour garantir la stabilité de vos systèmes."
          : "Security, updates and continuous support to ensure system stability.",
      icon: <FaTools size={42} />,
    },
    {
      title: lang === "fr" ? "Formation professionnelle" : "Professional Training",
      description:
        lang === "fr"
          ? "Formations pratiques et personnalisées pour rendre vos équipes autonomes et efficaces."
          : "Practical and tailored training to make your teams autonomous and efficient.",
      icon: <FaChalkboardTeacher size={42} />,
    },
    {
      title:
        lang === "fr"
          ? "Analyse & valorisation des données"
          : "Data Analysis & Insights",
      description:
        lang === "fr"
          ? "Tableaux de bord, reporting et analyses pour transformer vos données en décisions stratégiques."
          : "Dashboards, reporting and analysis to turn data into strategic decisions.",
      icon: <FaChartLine size={42} />,
    },
  ];

  // ================= PARTENAIRES =================
const partners = [
  { name: "EYIMO SERVICES AUTO", years: "4 ans d’existence", field: "Transport & logistique", logo: "/partners/eyimo.jpeg" },
  { name: "MOKOLI GROUP", years: "5 ans d’existence", field: "Assurances & services financiers", logo: "/partners/mokoli.jpeg" },
  { name: "BELIFE INSURANCE GENERAL", years: "Entreprise reconnue", field: "Assurances", logo: "/partners/belife.jpeg" },
  { name: "INFO TELECOM GENERAL BUSINESS", years: "Plus de 10 ans d’existence", field: "Services informatiques", logo: "/partners/info.jpeg" }, 
  { name: "GOMSU GENERAL BUSINESS COMPANY", years: "1 an d’existence", field: "Prestations de services divers", logo: "/partners/gomsu.jpeg" },
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
      ? "MSM ACTIVITY est une entreprise spécialisée dans le développement d’applications informatiques, les services numériques, la formation et le conseil. Nous proposons des solutions modernes, fiables et évolutives adaptées à vos besoins."
      : "MSM ACTIVITY is a company specialized in developing IT applications, digital services, training, and consulting. We provide modern, reliable, and scalable solutions tailored to your needs."}
  </p>
</section>


      {/* ================= STATS ================= */}
      <section style={styles.stats}>
        <div><strong>+10</strong><span>{lang === "fr" ? "Projets livrés" : "Projects delivered"}</span></div>
        <div><strong>100%</strong><span>{lang === "fr" ? "Solutions sur mesure" : "Custom solutions"}</span></div>
        <div><strong>1</strong><span>{lang === "fr" ? "Interlocuteur dédié" : "Dedicated contact"}</span></div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" style={styles.section}>
        <h2 style={styles.title}>{lang === "fr" ? "Nos expertises" : "Our Expertise"}</h2>
        <div style={styles.grid}>
          {services.map((s, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{s.icon}</div>
              <h3 style={styles.cardTitle}>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POURQUOI NOUS ================= */}
      <section id="why" style={styles.why}>
        <h2>{lang === "fr" ? "Pourquoi choisir MSM ACTIVITY ?" : "Why choose MSM ACTIVITY?"}</h2>
        <div style={styles.grid}>
          {[
            lang === "fr" ? "Approche orientée business" : "Business-oriented approach",
            lang === "fr" ? "Solutions évolutives et durables" : "Scalable & sustainable solutions",
            lang === "fr" ? "Communication claire et transparente" : "Clear & transparent communication",
            lang === "fr" ? "Ouverture aux partenariats stratégiques" : "Open to strategic partnerships",
          ].map((item, i) => (
            <div key={i} style={styles.whyCard}>
              <FaCheckCircle /> <span>{item}</span>
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

  <div style={styles.partnersGrid}>
  {partners.map((p, i) => (
    <div key={i} style={styles.partnerCard}>
      <Image
        src={p.logo}        // chemin du logo
        alt={p.name}        // description pour l'accessibilité
        width={80}          // largeur
        height={80}         // hauteur
        style={{
          objectFit: "cover",   // pour que l'image remplisse le rond sans déformation
          borderRadius: "50%",  // rend l'image ronde
          marginBottom: "12px",
        }}
      />
      <h3 style={{ ...styles.cardTitle, marginTop: 12 }}>{p.name}</h3>
      <p style={styles.partnerField}>{p.field}</p>
      <span style={styles.partnerYears}>{p.years}</span>
    </div>
  ))}
</div>



        {/* BOUTON DEVENIR PARTENAIRE */}
        <button style={{...styles.ctaButton, marginTop: 30}} onClick={() => scrollToSection("contact")}>
          {lang === "fr" ? "Devenir partenaire" : "Become a partner"}
        </button>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" style={styles.section}>
        <h2 style={styles.title}>{lang === "fr" ? "Notre méthode de travail" : "Our Work Process"}</h2>
        <ol style={styles.process}>
          <li>{lang === "fr" ? "Analyse de vos besoins et enjeux" : "Analyze your needs & challenges"}</li>
          <li>{lang === "fr" ? "Proposition de solution claire et chiffrée" : "Propose a clear & budgeted solution"}</li>
          <li>{lang === "fr" ? "Développement et mise en œuvre" : "Development & implementation"}</li>
          <li>{lang === "fr" ? "Tests, livraison et accompagnement" : "Testing, delivery & support"}</li>
        </ol>
      </section>

      {/* ================= À PROPOS ================= */}
      <section id="about" style={{ ...styles.section, background: "#f5f7fa" }}>
        <h2 style={styles.title}>{lang === "fr" ? "À propos de MSM ACTIVITY" : "About MSM ACTIVITY"}</h2>
        <p>
          {lang === "fr"
            ? "MSM ACTIVITY est née d’une conviction forte : la technologie doit être un levier de croissance, pas une contrainte."
            : "MSM ACTIVITY was born from a strong belief: technology should be a growth driver, not a constraint."}
        </p>
        <p>
          {lang === "fr"
            ? "Nous combinons expertise technique, vision stratégique et accompagnement humain pour créer des solutions réellement utiles."
            : "We combine technical expertise, strategic vision and human support to create truly useful solutions."}
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
        <h2 style={styles.title}>{lang === "fr" ? "Contactez-nous" : "Contact Us"}</h2>
        <p style={styles.lead}>
          {lang === "fr" ? "Remplissez le formulaire ci-dessous ou choisissez votre moyen de contact préféré :" : "Fill out the form below or choose your preferred contact method:"}
        </p>

        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input name="name" placeholder={lang === "fr" ? "Nom" : "Name"} style={styles.input} required />
          <input name="email" placeholder="Email" type="email" style={styles.input} required />
          <textarea name="message" placeholder={lang === "fr" ? "Message" : "Message"} style={styles.textarea} required />

          <div style={styles.contactButtons}>
            <button
              type="button"
              style={styles.contactButton}
              onClick={() => {
                const form = document.querySelector<HTMLFormElement>("form")!;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                const whatsappMessage = `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`;
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
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                const emailMessage = `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`;
                const mailtoLink = `mailto:activitymsm@gmail.com?subject=Contact depuis MSM&body=${encodeURIComponent(emailMessage)}`;
                window.location.href = mailtoLink;
              }}
            >
              Email
            </button>
          </div>
        </form>
      </section>

      {/* ================= REVIEWS ================= */}
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
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const rating = parseInt(
        (form.elements.namedItem("rating") as HTMLSelectElement).value
      );
      const comment = (form.elements.namedItem("comment") as HTMLTextAreaElement).value;
      addReview(name, rating, comment);
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
  <div style={{ marginTop: "40px" }}>
    {reviews.length === 0 && (
      <p style={{ opacity: 0.7 }}>
        {lang === "fr"
          ? "Aucun avis pour le moment, soyez le premier à commenter !"
          : "No reviews yet, be the first to comment!"}
      </p>
    )}
    {reviews.map((r, i) => (
      <div
        key={i}
        style={{
          padding: "20px",
          borderBottom: "1px solid #ccc",
          textAlign: "left",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
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

// ================= STYLES =================
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: "sticky" as const,
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "var(--msm-blue)",
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: { display: "flex", alignItems: "center" },
  nav: { display: "flex", gap: "25px" },
  link: { background: "none", border: "none", color: "var(--msm-orange)", fontSize: "16px", fontWeight: 500, cursor: "pointer", padding: "5px 10px" },
  langButton: { background: "var(--msm-orange)", border: "none", color: "#fff", fontWeight: 500, padding: "6px 12px", borderRadius: 8, cursor: "pointer" },

  section: { padding: "90px 20px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" },
  hero: { padding: "120px 20px", textAlign: "center" },
  title: { color: "var(--msm-orange)", marginBottom: "30px" },
  lead: { fontSize: "18px", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 },
stats: {
  display: "flex",
  flexDirection: "row", // par défaut
  justifyContent: "center",
  gap: "60px",
  padding: "60px 20px",
  background: "#fff",
  flexWrap: "wrap", // ajoute wrap pour que ça passe en ligne suivante si besoin
  textAlign: "center",
},
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" },
  card: { padding: "32px", borderRadius: "14px", background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", transition: "all 0.3s ease", cursor: "pointer" },
  icon: { color: "var(--msm-orange)", marginBottom: "20px" },
  cardTitle: { marginBottom: "12px", color: "var(--msm-orange)" },
  why: { padding: "90px 20px", background: "#0f172a", color: "#fff", textAlign: "center" },
  whyCard: { display: "flex", alignItems: "center", gap: "12px", background: "#111827", padding: "22px", borderRadius: "12px" },
partnersGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "30px",
  marginTop: "50px",
  justifyItems: "center", // centre les logos et textes
},
partnerCard: {
  padding: "30px",
  borderRadius: "14px",
  background: "#fff",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  textAlign: "center",
},
partnerField: { marginTop: "10px", fontWeight: 500 },
partnerYears: { display: "block", marginTop: "8px", fontSize: "14px", opacity: 0.7 },

  process: { maxWidth: "600px", margin: "0 auto", textAlign: "left", lineHeight: 2 },
  cta: { padding: "110px 20px", color: "#fff", textAlign: "center" },
  ctaButton: { marginTop: "24px", padding: "16px 38px", fontSize: "18px", borderRadius: "30px", border: "none", cursor: "pointer", background: "var(--msm-orange)", color: "#fff" },
  form: { display: "flex", flexDirection: "column", gap: "20px", maxWidth: "500px", margin: "0 auto" },
  input: { padding: "14px", borderRadius: "8px", border: "1px solid #ccc" },
  textarea: { padding: "14px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "120px" },
  contactButtons: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" },
  contactButton: { padding: "14px 28px", borderRadius: "8px", background: "var(--msm-orange)", color: "#fff", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease" },
  footer: { padding: "30px 20px", textAlign: "center", background: "#0f172a", color: "#fff" },

  intro: {
  padding: "80px 20px",
  maxWidth: "900px",
  margin: "0 auto",
  textAlign: "center",
},
burger: {
  display: "none",
  fontSize: "28px",
  background: "none",
  border: "none",
  color: "#fff",
  cursor: "pointer",
},

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
