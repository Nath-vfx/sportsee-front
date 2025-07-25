import React from "react";
import Header from "./components/Header/Header.jsx";
import Headline from "./components/Headline/Headline.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import Container from "./components/Container/Container.jsx";
import Panel from "./components/Panel/Panel.jsx";
import CounterCard from "./components/CounterCard/CounterCard.jsx";
import PerDayActivity from "./components/PerDayActivity/PerDayActivity.jsx";
import DomainsRadar from "./components/DomainsRadar/DomainsRadar.jsx";
import ScoreChart from "./components/ScoreChart/ScoreChart.jsx";
import LineChart from "./components/LineChart/LineChart.jsx";
import energy from "./assets/energy.svg";
import cheeseburger from "./assets/cheeseburger.svg";
import chicken from "./assets/chicken.svg";
import apple from "./assets/apple.svg";
import styles from "./App.module.scss";
import UserFetcherWithMock from "./components/fetcher/UserFetcherWithMock.jsx";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className={styles.App__content}>
          <SideBar />
          <Container>
            <UserFetcherWithMock>
              {({ userData, performance, averageSessions, activity }) => {
                // Vérification de la présence des données nécessaires
                const userInfos = userData?.data?.userInfos;
                const keyData = userData?.data?.keyData;

                if (!userInfos || !keyData) {
                  return <div>Données utilisateur indisponibles</div>;
                }

                return (
                  <>
                    <Headline
                      title={userInfos.firstName}
                      text="Félicitation ! Vous avez explosé vos objectifs hier 👏"
                    />
                    <Panel>
                      <div>
                        <PerDayActivity activity={activity} />
                      </div>
                      <div className={styles.App__side}>
                        <CounterCard
                          number={keyData.calorieCount + "kCal"}
                          type="Calories"
                          icon={energy}
                        />
                        <CounterCard
                          number={keyData.proteinCount + "g"}
                          type="Proteines"
                          icon={chicken}
                        />
                        <CounterCard
                          number={keyData.carbohydrateCount + "g"}
                          type="Glucides"
                          icon={apple}
                        />
                        <CounterCard
                          number={keyData.lipidCount + "g"}
                          type="Lipides"
                          icon={cheeseburger}
                        />
                      </div>
                      <div className={styles.App__test}>
                        <LineChart averageSessions={averageSessions} />
                      </div>
                      <div className={styles.App__test__radar}>
                        <DomainsRadar performance={performance} />
                      </div>
                      <div className={styles.App__test__score}>
                        <ScoreChart userData={userData} />
                      </div>
                    </Panel>
                  </>
                );
              }}
            </UserFetcherWithMock>
          </Container>
        </div>
      </>
    );
  }
}

export default App;
