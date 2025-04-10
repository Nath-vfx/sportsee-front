import styles from "./Container.module.scss";

function Container({ children }) {
  return (
    <>
      <main className={styles.Container}>{children}</main>
    </>
  );
}

export default Container;
