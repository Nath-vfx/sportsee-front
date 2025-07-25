import styles from "./Panel.module.scss";

function Panel({ children }) {
  return (
    <>
      <div className={styles.Panel}>{children}</div>
    </>
  );
}

export default Panel;
