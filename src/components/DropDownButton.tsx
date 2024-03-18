import {
    IonSegment,
    IonContent,
    IonButton,
    IonLabel,
    IonGrid,
    IonIcon,
    IonCol,
    IonRow,
  } from "@ionic/react";
  import React from "react";
  import "../styles/Membership.css";
  import beniftsarrow from "../images/benifitsArrow.svg";
import { chevronDownOutline } from "ionicons/icons";
  
  interface DropDownButtonProps {
      title : string,
      subtitle : string
  }
  
  interface DropDownButtonStates {
  
    showState: boolean;
    imgcssClass: string
  }
  
  
  class DropDownButton extends React.Component<DropDownButtonProps,DropDownButtonStates> {
    constructor(props: DropDownButtonProps) {
      super(props);
    this.state = {
  
      showState: false,
      imgcssClass: 'rotate0',
  
    };
  }
  
  
  toggleDetails() {
    this.setState({showState: !this.state.showState});
    if (this.state.showState)
    {
      this.setState({imgcssClass: 'rotate0'});
    }
    else{
      this.setState({imgcssClass: 'rotate180'});
    }
  }
    render() {
      return (
        
          <IonGrid>
          <IonSegment mode ="md">

        <IonButton className='benifitBttn' onClick={(e)=>this.toggleDetails()} >
        <IonGrid>  
            <IonRow>
            <IonCol size="11">
        <IonLabel className="ion-text-wrap">{this.props.title}</IonLabel></IonCol>
        <IonCol className="ion-align-self-center" size="1">
            <img className={this.state.imgcssClass} src={beniftsarrow} alt=""/>
        </IonCol></IonRow></IonGrid>
        </IonButton>
        </IonSegment>
        
        <IonSegment mode ="md">
          {this.state.showState==true ? (
       
        <IonLabel className='benifitLabel'>
{this.props.subtitle}  </IonLabel> 
          ):null}</IonSegment>
          </IonGrid>
      
      );
    }
  }
  
  export default DropDownButton;
  