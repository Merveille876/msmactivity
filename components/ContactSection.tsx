// components/ContactSection.tsx
export default function ContactSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Contactez-nous</h2>
      <p>Vous avez un projet ou besoin d’un conseil ?</p>
      <a href="/contact">
        <button style={styles.button}>Envoyer un message</button>
      </a>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  title: {
    color: "var(--msm-orange)",
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "14px 28px",
    background: "var(--msm-orange)",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "6px",
  },
};
