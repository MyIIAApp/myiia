import {
  IonCard,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import InsuranceCard from "../../components/InsuranceCard";
import "../../styles/Insurance.css";
import { InsuranceService } from "../../services/InsuranceService";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipPage } from "../../constants/MenuConstants";
import Loading from "../../components/Loading";
import IIAInsurancePage from "../../images/IIAInsurancePage.jpg";
import { cloudDownloadOutline } from "ionicons/icons";
interface InsuranceStates {
  isInsured: boolean;
  result: any;
  showLoading: boolean;
}
interface InsuranceProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
}
class Insurance extends React.Component<InsuranceProps, InsuranceStates> {
  constructor(props: InsuranceProps) {
    super(props);
    this.state = {
      isInsured: false,
      result: null,
      showLoading: false,
    };
  }
  componentDidMount() {
    this.getData(true);
  }
  protected getData(forceRefresh: boolean) {
    this.setState({ showLoading: true });
    let getInsuranceDetailsPromise = InsuranceService.getInsuranceDetails(
      this.props.loginMetadata,
      this.props.loginMetadata.phoneNumber,
      forceRefresh
    );
    Promise.all([getInsuranceDetailsPromise])
      .then((result: any) => {
        if(result[0].response!="Unauthorised Aceess Denied"){
          this.setState({
            isInsured: result[0].success,
            result: result[0],
            showLoading: false,
          });
        }else{
          this.setState({ showLoading: false, isInsured: false });
        }
      })
      .catch(() => {
        this.setState({ showLoading: false, isInsured: false });
      });
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {
            this.getData(true);
          }}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonContent>
          {this.state.showLoading ? (
            <Loading />
          ) : this.state.isInsured == true ? (
            <IonGrid class="insurancePageContent">
              <IonRow>
                <InsuranceCard result={this.state.result} />
              </IonRow>
              <IonRow>
                <IonCol class="textClass1">Insured and Dependents</IonCol>
              </IonRow>
              {this.state.result.response.allMembers.map(
                (insuranceDependent: any) => {
                  return (
                    <IonRow>
                      <IonCard class="dependentCard">
                        <IonRow class="dependentName">
                          {insuranceDependent.EMPNAME}
                        </IonRow>
                        {/* <IonRow class="dependentDOB">
                          <label className="bold">DOB:</label>&nbsp;
                          {insuranceDependent.DOB}
                        </IonRow>
                        <IonRow class="dependentRelation">
                          <label className="bold">Relationship:</label>&nbsp;
                          {insuranceDependent.Relation}
                        </IonRow> */}
                      </IonCard>
                    </IonRow>
                  );
                }
              )}
            </IonGrid>
          ) : (
            <IonGrid className="ContentCenters limitContent">
              <IonRow>
                <IonCol class="ion-text-center">
              <IonButton
                      className="insuButton"
                      onClick={() => {window.open("https://sana-iia.s3.ap-south-1.amazonaws.com/IIA.jpg?utm_source=IIA&utm_medium=banner&utm_campaign=IIA_banner")}}
                    >
                      {/* <IonSegment mode ="md" className="hobttntxt"> */}
                      Corporate risks india insurance brockers limited
                      {/* </IonSegment> */}
                    </IonButton>
                    </IonCol>
              </IonRow>
              <br></br>
              <IonRow>
              <IonCol class="ion-text-center">
              <IonButton
                      className="insuButton"
                      onClick={() => {window.open("https://iiaprodstorage.blob.core.windows.net/offers/offerspdf/SANA-%20MAX%20Life%20Insurance.pdf")}}
                    >
                      {/* <IonSegment mode ="md" className="hobttntxt"> */}
                        Max Life Insurance
                      {/* </IonSegment> */}
                    </IonButton>
                    </IonCol>
              </IonRow>
              <br></br>
              <IonRow>
                <IonCol class="ion-text-center">
              <IonButton
                      className="insuButton"
                      onClick={() => {window.open("https://iiaprodstorage.blob.core.windows.net/offers/offerspdf/KMD.jpeg")}}
                    >
                      {/* <IonSegment mode ="md" className="hobttntxt"> */}
                        KMD
                      {/* </IonSegment> */}
                    </IonButton>
                    </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="ion-text-center">
              <IonButton
                      className="insuButton"
                      onClick={() => {window.open("https://iiaonline.in/Uploads/SpecialOfferForMembers/SpecialOfferForMember_1709638335003.pdf")}}
                    >
                      {/* <IonSegment mode ="md" className="hobttntxt"> */}
                      IIA Group Health Insurance Policy effective from 04/03/2024 (ICICI Lombard)
                      {/* </IonSegment> */}
                    </IonButton>
                    </IonCol>
              </IonRow>
              <IonRow>
                <IonCol class="ion-text-center">
              <IonButton
                      className="insuButton"
                      onClick={() => {window.open("https://iiaonline.in/Uploads/SpecialOfferForMembers/SpecialOfferForMember_1709557072372.pdf")}}
                    >
                      {/* <IonSegment mode ="md" className="hobttntxt"> */}
                      IIA Group Health Insurance Policy effective from 04/03/2024 (New India Insurance)
                      {/* </IonSegment> */}
                    </IonButton>
                    </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonPage>
    );
  }
  becomeMember() {
    this.props.changePage(MembershipPage.Page);
  }
}

export default Insurance;
