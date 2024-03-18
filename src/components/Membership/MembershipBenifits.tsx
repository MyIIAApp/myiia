import { IonContent, IonPage,IonGrid } from "@ionic/react";
import React from "react";
import "../../styles/Membership.css";
import DropDownButton from "../DropDownButton";
import benifitJson from "../../JsonFiles/MembershipBenifit.json";
import HeaderToolbar from "../HeaderToolbar";

interface MembershipBenifitsProps {}

interface MembershipBenifitsStates {
  showState: boolean;
  imgcssClass: string;
}

class MembershipBenifits extends React.Component<
  MembershipBenifitsProps,
  MembershipBenifitsStates
> {
  constructor(props: MembershipBenifitsProps) {
    super(props);
    this.state = {
      showState: false,
      imgcssClass: "rotate0",
    };
  }

  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={false}
        />
        <IonContent className="benifitContent">
          <IonGrid className="limitContent">  
          {benifitJson.benifits.map((benifit: any) => {
            return (
              <DropDownButton
                title={benifit.title}
                subtitle={benifit.subtitle}
                key={benifit.title}
              />
            );
          })}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

export default MembershipBenifits;
