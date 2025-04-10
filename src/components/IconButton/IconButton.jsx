import styles from "./IconButton.module.scss";

function IconButton({ icon }) {
  return (
    <>
      <button className={styles.IconButton}>
        <img src={icon} alt="" />
      </button>
    </>
  );
}

export default IconButton;
