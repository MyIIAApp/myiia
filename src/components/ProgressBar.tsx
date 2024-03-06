import { IonProgressBar } from "@ionic/react";
import "../styles/Common.css";

interface ContainerProps {}

const ProgressBar: React.FC<ContainerProps> = () => {
  return (
    <IonProgressBar
      value={0.5}
      type="indeterminate"
      style={{ position: "fixed", top: "50%" }}
    ></IonProgressBar>
  );
};

export default ProgressBar;
