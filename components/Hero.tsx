"use client";

import React from "react";

export default function Hero() {
  // Fonction pour scroller vers la section contact
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={styles.hero} id="hero">
      <h1 style={styles.title}>Solutions informatiques & innovation numérique</h1>
      <p style={styles.subtitle}>
        MSM ACTIVITY accompagne entreprises et particuliers dans le
        développement, les services numériques, la formation et le conseil
        informatique. Transformez vos idées en solutions concrètes.
      </p>

      <button style={styles.button} onClick={scrollToContact}>
        Nous contacter
      </button>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    padding: "140px 20px",
    textAlign: "center",
    background: "var(--msm-blue)",
    color: "var(--msm-white)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  title: {
    fontSize: "42px",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "20px",
    maxWidth: "700px",
    lineHeight: 1.6,
    margin: "0 auto",
  },
  button: {
    marginTop: "30px",
    padding: "16px 36px",
    background: "var(--msm-orange)",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 500,
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
