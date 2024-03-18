import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import MempershipPaymentPage from "../../components/Membership/MempershipPaymentPage";
import SubmittedProfileCard from "../../components/Membership/SubmittedProfileCard";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipPaymentModel } from "../../models/Membership/MembershipPaymentModel";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";

interface RecordpaymentStates {
  membershipProfileList: MembershipProfileModel[];
  showRecordPaymentView: boolean;
  showProgress: boolean;
  membershipPaymentModel: MembershipPaymentModel;
}

interface RecordpaymentProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

class Recordpayment extends React.Component<
  RecordpaymentProps,
  RecordpaymentStates
> {
  constructor(props: RecordpaymentProps) {
    super(props);
    this.state = {
      membershipProfileList: [],
      membershipPaymentModel: new MembershipPaymentModel(-1),
      showProgress: true,
      showRecordPaymentView: false,
    };
  }

  componentDidMount() {
    this.getData();
  }
  protected getData() {
    this.setState({ showProgress: true });
    MembershipService.getMembershipProfilesByStatus(
      this.props.loginMetadata,
      MembershipProfileStatus.ApprovedMembershipProfile
    )
      .then((response: any[]) => {
        this.setState({ membershipProfileList: response, showProgress: false });
      })
      .catch(() => {});
  }
  public setRecordPaymentView(membershipPaymentModel: MembershipPaymentModel) {
    this.setState({
      membershipPaymentModel: membershipPaymentModel,
      showRecordPaymentView: true,
    });
  }
  public stateChangesAfterAction(id: number) {
    let membershipProfileList = this.state.membershipProfileList;
    const removeIndex = membershipProfileList.findIndex(
      (item) => item.id === id
    );
    membershipProfileList.splice(removeIndex, 1);
    this.setState({
      membershipProfileList: membershipProfileList,
      showRecordPaymentView: false,
    });
  }
  render() {
    if (this.state.showProgress) {
      return (
        <IonContent>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <Loading />
        </IonContent>
      );
    } else if (this.state.showRecordPaymentView) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => this.setState({ showRecordPaymentView: false })}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            <MempershipPaymentPage
              loginMetadata={this.props.loginMetadata}
              membershipPaymentModel={this.state.membershipPaymentModel}
              setFunction={() =>
                this.stateChangesAfterAction(
                  this.state.membershipPaymentModel.userId
                )
              }
            />
          </IonContent>
        </IonPage>
      );
    } else {
      return this.populateMembershipProfileList();
    }
  }

  populateMembershipProfileList() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => this.getData()}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={true}
        />
        {this.state.membershipProfileList.length === 0 ? (
          <IonContent>
            <IonSegment mode ="md" class="logoSegment">
              <IonItem>
                <IonIcon ios={warningOutline} md={warningOutline} />
              </IonItem>
            </IonSegment>
            <IonSegment mode ="md">
              <IonLabel>No Submissions</IonLabel>
            </IonSegment>
          </IonContent>
        ) : (
          <IonContent>
            <IonList>
              {this.state.membershipProfileList.map(
                (profile: MembershipProfileModel) => {
                  return (
                    <IonItem key={profile.id}>
                      <IonSegment mode ="md">
                        <SubmittedProfileCard
                          membershipProfile={profile}
                          buttonString="Record Payment"
                          buttonFunction={(event) =>
                            this.setRecordPaymentView(
                              new MembershipPaymentModel(profile.id)
                            )
                          }
                        />
                      </IonSegment>
                    </IonItem>
                  );
                }
              )}
            </IonList>
          </IonContent>
        )}
      </IonPage>
    );
  }
}

export default Recordpayment;
