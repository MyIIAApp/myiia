import { IonGrid, IonImg, IonLabel, IonSegment } from "@ionic/react";
import "../styles/Common.css";
import ComingSoon from "../images/ComingSoon.svg";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonGrid className="container">
      <IonImg src={ComingSoon} />
      <IonSegment mode ="md" className="comingsoon">{name}</IonSegment>
      <IonLabel className="comingsoon1">Coming soon!</IonLabel>
    </IonGrid>
  );
};

export default ExploreContainer;
