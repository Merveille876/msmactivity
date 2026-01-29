// components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Qui sommes-nous ?</h2>
      <p>
        MSM ACTIVITY est une entreprise spécialisée dans les solutions
        informatiques, la formation et le conseil. Nous aidons nos clients à
        réussir dans un monde numérique en constante évolution.
      </p>

      <h3 style={styles.subtitle}>Notre vision</h3>
      <p>
        Apporter des solutions innovantes, fiables et personnalisées pour
        chaque client, en mettant la technologie au service de vos objectifs.
      </p>

      <h3 style={styles.subtitle}>Notre mission</h3>
      <p>
        Accompagner les entreprises et particuliers dans leur transformation
        digitale grâce à un service de qualité, un conseil expert et une
        formation adaptée.
      </p>

      <h3 style={styles.subtitle}>Nos valeurs</h3>
      <p>Professionnalisme, fiabilité, innovation et proximité client.</p>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: 1.7,
  },
  title: {
    color: "var(--msm-orange)",
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  subtitle: {
    color: "var(--msm-orange)",
    marginTop: "30px",
    marginBottom: "15px",
  },
};
