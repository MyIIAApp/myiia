import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonGrid,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import MembershipProfile from "../../components/Membership/MembershipProfile";
import SubmittedProfileCard from "../../components/Membership/SubmittedProfileCard";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import { ApproveMembershipPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";

interface ApproveMembershipStates {
  membershipProfileList: MembershipProfileModel[];
  showMembershipProfile: boolean;
  membershipProfileView: MembershipProfileModel;
  showProgress: boolean;
}

interface ApproveMembershipProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

class ApproveMembership extends React.Component<
  ApproveMembershipProps,
  ApproveMembershipStates
> {
  constructor(props: ApproveMembershipProps) {
    super(props);
    this.state = {
      membershipProfileList: [],
      showProgress: true,
      showMembershipProfile: false,
      membershipProfileView: new MembershipProfileModel(
        this.props.loginMetadata.tokenString,
        0,
        -1
      ),
    };
  }

  componentDidMount() {
    this.getData();
    //console.log(this.state.membershipProfileView);
  }
  protected getData() {
    this.setState({ showProgress: true });
    MembershipService.getMembershipProfilesByStatus(
      this.props.loginMetadata,
      MembershipProfileStatus.SubmittedMembershipProfile
    )
      .then((response: MembershipProfileModel[]) => {
        if (this.props.loginMetadata.chapterId != 82) {
          response = response.filter(
            (profile) =>
              profile.chapterId === this.props.loginMetadata.chapterId
          );
        }
        this.setState({ membershipProfileList: response, showProgress: false });
      })
      .catch(() => {});
  }
  public setMembershipProfileView(membershipProfile: MembershipProfileModel) {
    this.setState({
      membershipProfileView: membershipProfile,
      showMembershipProfile: true,
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
      showMembershipProfile: false,
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
    } else if (this.state.showMembershipProfile) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {
              this.setState({ showMembershipProfile: false });
            }}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            <MembershipProfile
              loginMetadata={this.props.loginMetadata}
              membershipProfile={this.state.membershipProfileView}
              disabled={true}
              gstCheck={false}
              page={ApproveMembershipPage.Page}
              setMembershipStatusFunction={(value: number) =>
                this.stateChangesAfterAction(value)
              }
              setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                this.props.setLoginStateFunction(loginMetadata)
              }
              changePage={(value: string) => this.props.changePage(value)}
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
        {this.state.membershipProfileList.length == 0 ? (
          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode="md" class="logoSegment">
                <IonItem lines="none">
                  <IonIcon ios={warningOutline} md={warningOutline} />
                </IonItem>
              </IonSegment>
              <IonSegment mode="md">
                <IonLabel>No Submissions</IonLabel>
              </IonSegment>
            </IonGrid>
          </IonContent>
        ) : (
          <IonContent>
            <IonGrid className="limitContent">
              <IonList class="submittedMembershipList">
                <IonGrid>
                  {this.state.membershipProfileList.map(
                    (profile: MembershipProfileModel) => {
                      return (
                        <IonItem key={profile.id} lines="none">
                          <SubmittedProfileCard
                            membershipProfile={profile}
                            buttonString="View &amp; Approve"
                            buttonFunction={(event) =>
                              this.setMembershipProfileView(profile)
                            }
                          />
                        </IonItem>
                      );
                    }
                  )}
                </IonGrid>
              </IonList>
            </IonGrid>
          </IonContent>
        )}
      </IonPage>
    );
  }
}

export default ApproveMembership;
