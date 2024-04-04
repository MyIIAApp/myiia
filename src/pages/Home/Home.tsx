import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonPopover,
  IonRouterLink,
  IonRow,
  IonSegment,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonModal,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import DashBoard from "./Dashboard";
import { LoginMetadata } from "../../models/LoginMetadata";
import "../../styles/Home.css";
import hoNews from "../../images/HoNews.svg";
import hoMart from "../../images/HoMart.svg";
import hoOffers from "../../images/HoOffers.svg";
import hoHelpDesk from "../../images/HoHelpdesk.svg";
import hoGuest from "../../images/HoGuest.svg";
import hoMember from "../../images/HoMember.svg";
import hoTestimonial1 from "../../images/HoTestimonial1.svg";
import hoTestimonial2 from "../../images/HoTestimonial2.svg";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import {
  B2BPage,
  HelpdeskPage,
  MembershipPage,
  NewsPage,
  OffersPage,
} from "../../constants/MenuConstants";
import { StorageService } from "../../services/StorageService";
import { EventPopOverService } from "../../services/EventPopOverService";
import { ShowEventPopOver, ShowEventPopOverExpiry } from "../../constants/StorageConstants";
import Loading from "../../components/Loading";

const slideOpts = {
  autoplay: true,
  loop: true,
  initialSlide: 0,
  speed: 3000,
  grabCursor: true,
};

interface HomeStates {
  membershipStatus: number;
  popUrl: string;
  showEventPop: boolean;
  popRedirectingUrl: string;
  showLoading: boolean;
  showPriceTable:boolean;
}
interface HomeProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
}

class Home extends React.Component<HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      membershipStatus: this.props.loginMetadata.membershipStatus,
      popUrl: "",
      popRedirectingUrl: "",
      showEventPop: false,
      showLoading: true,
      showPriceTable:false,
    };
  }
  componentDidMount() {
    EventPopOverService.GetPopOverURL(this.props.loginMetadata).then((resp) => {

      this.setState({ popUrl: resp.url, popRedirectingUrl: resp.redirectingUrl });
      if (resp.showImage == "1") {
        if (this.state.popUrl != "" && this.state.popUrl != null) {
          StorageService.Get(ShowEventPopOver).then((resp) => {
            if (resp == null || this.state.popUrl != resp.PopUrl) {
              this.setState({ showEventPop: true, showLoading: false });
              StorageService.Set(ShowEventPopOver, { PopUrl: this.state.popUrl }, resp?.expiryYear == undefined || resp?.expiryYear == null ? 24 * 60 * 60 : parseInt(resp.expiryYear) * 60 * 60);
            }
            else {
              this.setState({ showLoading: false })
            }
          })
        }
      }
      this.setState({ showLoading: false })
    })
      .catch((e) => {
        this.setState({ showLoading: false })
      });
  }
  render() {
    if (this.state.showLoading) {
      return (
        <IonPage>
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      )
    }
    if (this.props.loginMetadata.isAdmin) {
      return <DashBoard loginMetadata={this.props.loginMetadata} />;
    } else {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => { }}
            previousPage={() => { }}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <IonGrid className="limitContent">
            <IonPopover showBackdrop={false} isOpen={this.state.showEventPop} onDidDismiss={() => { this.setState({ showEventPop: false }) }} cssClass="eventPop">
                <IonRouterLink href={this.state.popRedirectingUrl}>
                  <IonImg src={this.state.popUrl} />
                  {/* <IonButton class="eventPopButton" onClick={()=>{this.setState({showEventPop:false})}}>Cancel</IonButton> */}
                </IonRouterLink>
              </IonPopover>
              <IonSegment mode ="md" className="welcomeSeg">
                Welcome to My IIA !
              </IonSegment>
              <IonSegment mode ="md" className="msmeSeg">
                In the service of MSME since 1985
              </IonSegment>
              <IonSegment mode ="md" className="hosegment">
                <IonItem
                  routerLink={"/" + NewsPage.Page}
                  lines="none"
                  detail={false}
                  className="hoIonCard"
                >
                  <img
                    src={hoNews}
                    alt=""
                    onClick={(e) => this.props.changePage(NewsPage.Page)}
                  />
                </IonItem>
                <IonItem
                  routerLink={"/" + OffersPage.Page}
                  lines="none"
                  detail={false}
                  className="hoIonCard"
                >
                  <img
                    src={hoOffers}
                    alt=""
                    onClick={(e) => this.props.changePage(OffersPage.Page)}
                  />
                </IonItem>
                <IonItem
                  routerLink={"/" + HelpdeskPage.Page}
                  lines="none"
                  detail={false}
                  className="hoIonCard"
                >
                  <img
                    src={hoHelpDesk}
                    alt=""
                    onClick={(e) => this.props.changePage(HelpdeskPage.Page)}
                  />
                </IonItem>
                <IonItem
                  routerLink={"/" + B2BPage.Page}
                  lines="none"
                  detail={false}
                  className="hoIonCard"
                >
                  <img
                    src={hoMart}
                    alt=""
                    onClick={(e) => this.props.changePage(B2BPage.Page)}
                  />
                </IonItem>
              </IonSegment>

              {this.state.membershipStatus >=
                MembershipProfileStatus.ActiveMembership &&
                this.state.membershipStatus <=
                MembershipProfileStatus.ExpiredMembership ? (
                <div>
                  <IonSegment mode ="md">
                    <img className="homembers" src={hoMember} alt="" />
                  </IonSegment>
                  <IonSegment mode ="md" className="thanksmsg">
                    Thank you for being a member
                  </IonSegment>
                  <IonSegment mode ="md" className="thanksmsg">for IIA</IonSegment>
                  <IonSegment mode ="md">
                    <IonButton
                      className="hoButton"
                      routerLink={"/" + MembershipPage.Page}
                      onClick={(e) =>
                        this.props.changePage(MembershipPage.Page)
                      }
                    >
                      <IonSegment mode ="md" className="hobttntxt">
                        View your Membership Card
                      </IonSegment>
                    </IonButton>
                  </IonSegment>
                </div>
              ) : (
                <div>
                  <IonSegment mode ="md">
                    <img className="hoGuest" src={hoGuest} alt="" />
                  </IonSegment>
                  <IonSegment mode ="md" className="thanksmsgGuest segMargin">
                    We are over{" "}
                    <strong className="hothnksmsg">&nbsp; 12000 &nbsp;</strong>{" "}
                    members
                  </IonSegment>
                  <IonSegment mode ="md" className="thanksmsgGuest">
                    strong and growing.
                  </IonSegment>                

                  <IonSegment mode ="md" className="segMargin">
                    <IonButton
                      className="hoButton"
                      routerLink={"/" + MembershipPage.Page}
                      onClick={(e) =>
                        this.props.changePage(MembershipPage.Page)
                      }
                    >
                  

                      <IonSegment mode ="md" className="hobttntxt">
                        Become a Member Today
                      </IonSegment>
                    </IonButton>
                  </IonSegment>
                </div>
              )}
              <IonSegment mode ="md" className="segHoTest">Testimonials</IonSegment>
              <IonSlides
                className="hoSliders"
                options={slideOpts}
                pager={false}
              >
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            Works towards betterment of Industries in India and
                            be globally competetive.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">-Navin Jain, Kanpur</IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            IIA has proved as a great resource last year when I
                            needed some help with GST officer.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">
                          -Avdesh Agarwal, Lucknow
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>

                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            IIA news has been very helpful in keeping me up to
                            date with MSME news.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">
                          -Sanjay Gupta, Moradabad
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            I got really good discounts on the procurement of
                            COVID care items using my IIA Membership Card.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">
                          -Mahendar Agarwal, Lucknow
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            IIA Directory helps me connect with good business
                            associates from time to time.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">-Sanjay Jain, Kanpur</IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            I get competitive and discounted room rates at
                            hotels every time I travel for work.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">
                          -Harshail Agarwal, Kanpur
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            Insurance given to IIA members is half the price
                            than market.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">
                          -Chetan Bhalla, Lucknow
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="hoSliderCard">
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <img src={hoTestimonial1} alt="" />
                        </IonRow>
                        <IonRow>
                          <IonSegment mode ="md" className="hoTComment">
                            An impactful voice for MSME. Helps to make
                            connections and discuss new business outlooks.
                          </IonSegment>
                        </IonRow>
                        <IonRow class="hoTmRow">
                          <img src={hoTestimonial2} alt="" />
                        </IonRow>
                        <IonRow class="hoTCompany">-Nikhil Jain, Kanpur</IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
              {/* <IonSegment mode ="md"><a className="iiaElection" onClick={() => {window.open("https://iiaprodstorage.blob.core.windows.net/iia-election/Affidavit_format_for_CEC_Nomination-2023.docx"); window.open("https://iiaprodstorage.blob.core.windows.net/iia-election/Election_Nomination_Form-2023.pdf"); window.open("https://iiaprodstorage.blob.core.windows.net/iia-election/IIA_CEC_Election_Notice_2023-24.pdf");}}><u>IIA CEC Election Notice 2023-2024</u></a></IonSegment> */}
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default Home;
