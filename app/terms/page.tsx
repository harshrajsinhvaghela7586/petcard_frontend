import styles from "./Terms.module.css";

const sections = [
  {
    title: "Use of the Service",
    text: "Add the approved terms governing use of the website and app.",
  },
  {
    title: "User Responsibilities",
    text: "Add the final user responsibilities and restrictions.",
  },
  {
    title: "Contact",
    text: "Add the official legal/support contact details.",
  },
];

export default function Terms() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Legal</div>

          <h1>
            Terms of <span>Service</span>
          </h1>

          <p>
            This is a placeholder promotional-site page. Replace this copy
            with the officially approved PetCard Terms of Service before
            production.
          </p>
        </div>

        {/* Terms Sections */}
        <div className={styles.content}>
          {sections.map((item, index) => (
            <article
              className={styles.termsCard}
              key={item.title}
            >
              <div className={styles.cardNumber}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className={styles.cardContent}>
                <h2>{item.title}</h2>

                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Notice */}
        <div className={styles.notice}>
          <span>📋</span>

          <div>
            <strong>Terms Notice</strong>

            <p>
              The information on this page is currently placeholder
              content and should be replaced with the officially
              approved PetCard Terms of Service before production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}