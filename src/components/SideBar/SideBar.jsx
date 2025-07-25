import styles from "./SideBar.module.scss";
import IconButton from "../IconButton/IconButton";
import biking from "../../assets/biking.svg";
import lifting from "../../assets/lifting.svg";
import relaxing from "../../assets/relaxing.svg";
import swimming from "../../assets/swimming.svg";

function SideBar() {
  return (
    <>
      <aside className={styles.SideBar}>
        <nav className={styles.SideBar__nav}>
          <ul className={styles.SideBar__nav__list}>
            <li className={styles.SideBar__nav__list__item}>
              <IconButton icon={relaxing} />
            </li>
            <li className={styles.SideBar__nav__list__item}>
              <IconButton icon={swimming} />
            </li>
            <li className={styles.SideBar__nav__list__item}>
              <IconButton icon={biking} />
            </li>
            <li className={styles.SideBar__nav__list__item}>
              <IconButton icon={lifting} />
            </li>
          </ul>
        </nav>
        <p className={styles.SideBar__copyright}>Copiryght, SportSee 2020</p>
      </aside>
    </>
  );
}

export default SideBar;
