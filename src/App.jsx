import Header from "./components/Header/Header.jsx";
import Headline from "./components/Headline/Headline.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import Container from "./components/Container/Container.jsx";
import Panel from "./components/Panel/Panel.jsx";
import CounterCard from "./components/CounterCard/CounterCard.jsx";
import PerDayActivity from "./components/PerDayActivity/PerDayActivity.jsx";
import DomainsRadar from "./components/DomainsRadar/DomainsRadar.jsx";
import PieScore from "./components/PieScore/PieScore.jsx";

import energy from "./assets/energy.svg";
import cheeseburger from "./assets/cheeseburger.svg";
import chicken from "./assets/chicken.svg";
import apple from "./assets/apple.svg";

import styles from "./App.module.scss";
import DurationChart from "@/components/DurationChart/DurationChart.jsx";

function App() {
  return (
    <>
      <Header />
      <div className={styles.App__content}>
        <SideBar />
        <Container>
          <Headline
            title="Thomas"
            text="Félicitation ! Vous avez explosé vos objectifs hier 👏"
          />
          <Panel>
            <div className={styles.App__activity}>
              <PerDayActivity />
            </div>
            <div className={styles.App__side}>
              <CounterCard number="1,930kCal" type="Calories" icon={energy} />
              <CounterCard number="155g" type="Proteines" icon={chicken} />
              <CounterCard number="290g" type="Glucides" icon={apple} />
              <CounterCard number="50g" type="Lipides" icon={cheeseburger} />
            </div>
            <div className={styles.App__duration}>
              <DurationChart/>
            </div>
            <div className={styles.App__domains}>
              <DomainsRadar />
            </div>
            <div className={styles.App__score}>
              <PieScore/>
            </div>
          </Panel>
        </Container>
      </div>
    </>
  );
}

export default App;
