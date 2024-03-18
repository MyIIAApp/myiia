import { IonSpinner } from "@ionic/react";
import "../styles/Common.css";

interface ContainerProps {}

const Loading: React.FC<ContainerProps> = () => {
  return <IonSpinner name="lines" class="spin limitContent" />;
};

export default Loading;
