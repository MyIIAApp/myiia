import {
  IonSlides,
  IonSlide,
  IonToolbar,
  IonGrid,
  IonButton,
  IonImg,
} from "@ionic/react";
import nextIcon from "../../images/nextIcon.svg";
import previousicon from "../../images/previousicon.svg";
import React from "react";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";
import MembershipProfileA from "./MembershipProfileCompanyDetails";
import MembershipProfileB from "./MembershipProfileProductDetails";
import MembershipProfileC from "./MembershipProfileMemberDetails";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import productData from "../../JsonFiles/ProductJson.json";
import statesData from "../../JsonFiles/IndianStates.json";
import { LoginMetadata } from "../../models/LoginMetadata";
import MembershipProfileFileUploads from "./MembershipProfileFileUploads";
import Loading from "../Loading";

interface MembershipProfileStates {
  chapters: any;
  productData: any;
  indianStates: any;
  slidesRef: any;
  showError: boolean;
  showNextIcon: boolean;
  showPreviousIcon: boolean;
  showLoading: boolean;
}

interface MembershipProfileProps {
  membershipProfile: MembershipProfileModel;
  disabled: boolean;
  gstCheck: boolean;
  page: string;
  loginMetadata: LoginMetadata;
  setMembershipStatusFunction: (value: number) => void;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};
class MembershipProfile extends React.Component<
  MembershipProfileProps,
  MembershipProfileStates
> {
  constructor(props: MembershipProfileProps) {
    super(props);

    this.state = {
      chapters: [],
      productData: productData.products,
      indianStates: statesData.states,
      showError: false,
      slidesRef: React.createRef(),
      showNextIcon: true,
      showPreviousIcon: false,
      showLoading: true,
      
    };
  }

  componentDidMount() {
    MembershipService.getChapters(this.props.loginMetadata)
      .then((response: any) => {
        this.setState({ chapters: response.chapters, showLoading: false });
      })
      .catch(() => {});
  }
  setShowError(value: boolean) {
    this.setState({ showError: value });
  }
  slideNext() {
    this.state.slidesRef.current.slideNext();
    this.state.slidesRef.current.isEnd().then((res: boolean) => {
      this.setState({ showNextIcon: !res });
    });
    this.state.slidesRef.current.isBeginning().then((res: boolean) => {
      this.setState({ showPreviousIcon: !res });
    });
  }
  slidePrev() {
    this.state.slidesRef.current.slidePrev();
    this.state.slidesRef.current.isEnd().then((res: boolean) => {
      this.setState({ showNextIcon: !res });
    });
    this.state.slidesRef.current.isBeginning().then((res: boolean) => {
      this.setState({ showPreviousIcon: !res });
    });
  }
  render() {
    if (this.state.showLoading) {
      return <Loading></Loading>;
    }
    return (
      <IonGrid className="limitContent">
        <IonSlides
          pager={true}
          options={slideOpts}
          ref={this.state.slidesRef}
          class="membershipProfileSlide"
          onIonSlideDidChange={(e) => {
            this.state.slidesRef.current.isEnd().then((res: boolean) => {
              this.setState({ showNextIcon: !res });
            });
            this.state.slidesRef.current.isBeginning().then((res: boolean) => {
              this.setState({ showPreviousIcon: !res });
            });
          }}
        >
          <IonSlide>
            <MembershipProfileA
              membershipProfile={this.props.membershipProfile}
              loginMetadata={this.props.loginMetadata}
              indianStates={this.state.indianStates}
              showError={this.state.showError}
              disabled={this.props.disabled}
              gstCheck={this.props.gstCheck}
            />
          </IonSlide>
          <IonSlide>
            <MembershipProfileB
              membershipProfile={this.props.membershipProfile}
              productData={this.state.productData}
              showError={this.state.showError}
              disabled={this.props.disabled}
              gstCheck={this.props.gstCheck}
            />
          </IonSlide>
          <IonSlide>
            <MembershipProfileC
              membershipProfile={this.props.membershipProfile}
              chapters={this.state.chapters}
              disabled={this.props.disabled}
              showError={this.state.showError}
              gstCheck={this.props.gstCheck}
            />
          </IonSlide>
          <IonSlide>
            <MembershipProfileFileUploads
              loginMetadata={this.props.loginMetadata}
              membershipProfile={this.props.membershipProfile}
              slidesRef={this.state.slidesRef}
              disabled={this.props.disabled}
              page={this.props.page}
              showError={this.state.showError}
              setShowError={(value: boolean) => this.setShowError(value)}
              setMembershipStatusFunction={(value: number) =>
                this.props.setMembershipStatusFunction(value)
              }
              setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                this.props.setLoginStateFunction(loginMetadata)
              }
              changePage={(value: string) => this.props.changePage(value)}
            />
          </IonSlide>
        </IonSlides>
        <IonToolbar class="membershipProfileFooter limitContent">
          {this.state.showPreviousIcon ? (
            <IonButton
              class="basicButton previousButton"
              onClick={() => this.slidePrev()}
              slot="start"
            >
              <IonImg src={previousicon} alt="" />
            </IonButton>
          ) : null}
          {this.state.showNextIcon ? (
            <IonButton
              class="basicButton nextButton"
              onClick={() => this.slideNext()}
              slot="end"
            >
              <IonImg src={nextIcon} alt="" />
            </IonButton>
          ) : null}
        </IonToolbar>
      </IonGrid>
    );
  }
}

export default MembershipProfile;
