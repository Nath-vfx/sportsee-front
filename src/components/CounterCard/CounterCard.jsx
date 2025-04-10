import styles from "./CounterCard.module.scss";

function CounterCard({ icon, number, type }) {
  const getTypeClass = (type) => {
    switch (type) {
      case "Calories":
        return styles.red;
      case "Proteines":
        return styles.blue;
      case "Glucides":
        return styles.yellow;
      case "Lipides":
        return styles.pink;
      default:
        return "";
    }
  };
  return (
    <>
      <div className={styles.CounterCard}>
        <div className={`${styles.CounterCard__icon} ${getTypeClass(type)}`}>
          <img src={icon} alt="" />
        </div>
        <div className={styles.CounterCard__infos}>
          <h3 className={styles.CounterCard__infos__number}>{number}</h3>
          <p className={styles.CounterCard__infos__type}>{type}</p>
        </div>
      </div>
    </>
  );
}

export default CounterCard;
