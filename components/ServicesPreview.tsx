// components/ServicesPreview.tsx
export default function ServicesPreview() {
  const services = [
    {
      title: "Développement",
      description:
        "Création de sites web, applications mobiles et solutions sur mesure pour répondre à vos besoins.",
    },
    {
      title: "Maintenance",
      description:
        "Support et maintenance informatique pour assurer la continuité et la sécurité de vos systèmes.",
    },
    {
      title: "Formation",
      description:
        "Formations personnalisées pour vos équipes afin de maîtriser les outils numériques et logiciels.",
    },
    {
      title: "Analyse de données",
      description:
        "Exploitation et visualisation de vos données pour prendre des décisions éclairées et stratégiques.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Nos Services</h2>
      <div style={styles.grid}>
        {services.map((service, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  title: {
    color: "var(--msm-orange)",
    marginBottom: "50px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    background: "#fff",
    transition: "transform 0.3s",
  },
  cardTitle: {
    color: "var(--msm-orange)",
    marginBottom: "15px",
  },
};
