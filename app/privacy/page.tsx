import styles from "./Privacy.module.css";

const sections = [
  {
    title: "Information We Collect",
    text: "Add the final categories of account, pet, device, analytics and other information actually collected by the website and app.",
  },
  {
    title: "How We Use Information",
    text: "Add the approved purposes for processing information.",
  },
  {
    title: "Contact",
    text: "Add the official privacy/support contact details.",
  },
];

export default function Privacy() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>Legal</div>

          <h1>
            Privacy <span>Policy</span>
          </h1>

          <p>
            This is a placeholder promotional-site page. Replace this copy
            with the officially approved PetCard privacy policy before
            production.
          </p>
        </div>

        <div className={styles.content}>
          {sections.map((item) => (
            <article
              className={styles.policyCard}
              key={item.title}
            >
              <div className={styles.cardNumber}>
                {String(
                  sections.indexOf(item) + 1
                ).padStart(2, "0")}
              </div>

              <div className={styles.cardContent}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.notice}>
          <span>🔒</span>

          <div>
            <strong>Privacy Notice</strong>
            <p>
              The information on this page is currently placeholder
              content and should be replaced with the officially
              approved PetCard privacy policy before production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}