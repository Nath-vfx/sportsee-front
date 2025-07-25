import styles from "./Headline.module.scss";

function Headline({ title, text }) {
  return (
    <>
      <hgroup className={styles.Headline}>
        <h1 className={styles.Headline__title}>
          {" "}
          Bonjour{" "}
          <span className={styles.Headline__title__accent}>{title}</span>
        </h1>
        <p className={styles.Headline__text}>{text}</p>
      </hgroup>
    </>
  );
}

export default Headline;
