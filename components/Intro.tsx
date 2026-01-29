export default function Intro() {
  return (
    <section style={styles.section}>
      <h3>Qui sommes-nous ?</h3>
      <p>
        MSM ACTIVITY est une entreprise spécialisée dans le développement
        d’applications informatiques, les services numériques, la formation et
        le conseil. Nous proposons des solutions modernes, fiables et évolutives
        adaptées à vos besoins.
      </p>
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
};
