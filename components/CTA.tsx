import Link from "next/link";

export default function CTA() {
  return (
    <section style={styles.cta}>
      <h3>Un projet ? Parlons-en.</h3>
      <p>Contactez-nous pour discuter de vos besoins informatiques.</p>

      <Link href="/contact">
        <button style={styles.button}>Contact</button>
      </Link>
    </section>
  );
}

const styles = {
  cta: {
    padding: "80px 20px",
    textAlign: "center" as const,
    background: "var(--msm-blue)",
    color: "var(--msm-white)",
  },
  button: {
    marginTop: "20px",
    padding: "14px 28px",
    background: "var(--msm-orange)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};
