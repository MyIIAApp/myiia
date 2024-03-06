import { IonContent, IonGrid, IonPage } from "@ionic/react";
import "../styles/Elements.css";
import ExploreContainer from "./ExploreContainer";
import HeaderToolbar from "./HeaderToolbar";
const ComingSoon: React.FC = () => {
  return (
    <IonPage id="main">
      <HeaderToolbar
        refreshPage={() => {}}
        previousPage={() => {}}
        showBackButton={false}
        showRefreshButton={false}
      />
      <IonContent>
        <IonGrid className="limitContent">
          <ExploreContainer name="Team is at work!" />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ComingSoon;
