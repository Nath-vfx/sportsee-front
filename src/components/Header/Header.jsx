import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <>
      <header className={styles.Header}>
        <a href="/">
          <img className={styles.Header__logo} src={logo} alt="" />
        </a>
        <nav className={styles.Header__nav}>
          <ul className={styles.Header__nav__list}>
            <li className={styles.Header__nav__list__item}>Accueil</li>
            <li className={styles.Header__nav__list__item}>Profil</li>
            <li className={styles.Header__nav__list__item}>Réglages</li>
            <li className={styles.Header__nav__list__item}>Communauté</li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
