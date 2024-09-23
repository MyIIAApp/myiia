import { IonContent, IonGrid, IonPage } from "@ionic/react";
import "../styles/Elements.css";
import HeaderToolbar from "../components/HeaderToolbar";
import { useEffect } from "react";
import { Browser } from "@capacitor/browser";
const IIADivisonalLogin: React.FC = () => {

    useEffect(()=>{
        Browser.open({url:"http://divisional.iiaonline.in/"});
      },[])
      
  return (
    <IonPage id="main">
      <HeaderToolbar
        refreshPage={() => {}}
        previousPage={() => {}}
        showBackButton={false}
        showRefreshButton={false}
      />
      <IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default IIADivisonalLogin;
