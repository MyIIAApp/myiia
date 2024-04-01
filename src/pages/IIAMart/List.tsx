import {
  IonContent,
  IonCard,
  IonCardContent,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonList,
} from "@ionic/react";
import React from "react";
import Vector from "../../images/Vector.svg";
import { details } from "../../models/IIAMart/details";
import "../../styles/IIAMart.css";

interface ListStates {}
interface ListProps {
  enquiryList: details[];
  heading: String;
  setProduct: (product: any, index: number) => void;
  status: string;
  index: number;
}

class List extends React.Component<ListProps, ListStates> {
  constructor(props: ListProps) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <IonContent>
        <IonGrid className="limitContent">
          <IonRow>
            <IonCol class="heading ion-text-center">{this.props.heading}</IonCol>
          </IonRow>
          <IonList>
            {this.props.enquiryList.map((buyer: details, index: number) => {
              return buyer.EnquiryStatus == this.props.status ? (
                <IonCard key={buyer.EnquiryId} class=" br">
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="10">
                          <IonRow className="buyerrow">
                            <IonCol size="6">
                              <IonLabel className="buyerlabel ion-text-wrap">
                                {buyer.FirstName}
                                {buyer.LastName}
                              </IonLabel>
                            </IonCol>
                            <IonCol class="floatright" size="6">
                              <IonLabel className="buyerlabel timer">
                                {buyer.Time}
                              </IonLabel>
                            </IonCol>
                          </IonRow>
                        </IonCol>
                        <IonCol size="2" class="floatright">
                          <IonButton
                            class="btn"
                            onClick={() => {
                              this.props.setProduct(buyer, index);
                            }}
                          >
                            <IonImg class="arrowbtn" src={Vector} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ) : null;
            })}
          </IonList>
        </IonGrid>
      </IonContent>
    );
  }
}

export default List;
