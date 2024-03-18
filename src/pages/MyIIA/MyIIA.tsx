import {
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRouterOutlet,
  IonSegment,
  IonSlide,
  IonSlides,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LocalContactPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Leader } from "../../models/MyIIA/Leader";
import { MyIIAService } from "../../services/MyIIAService";
import "../../styles/MyIIA.css";
import MyIIALeaders from "./MyIIALeaders";

const slideOpts = {
  autoplay: true,
  loop: true,
  initialSlide: 0,
  speed: 2000,
  grabCursor: true,
};
interface MyIIAStates {
  sliderlist: any;
  showloading: boolean;
  hoLeaders: Leader[];
  chapterLeaders: Leader[];
}
interface MyIIAProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
}

class MyIIA extends React.Component<MyIIAProps, MyIIAStates> {
  constructor(props: MyIIAProps) {
    super(props);
    this.state = {
      sliderlist: [],
      showloading: true,
      hoLeaders: [],
      chapterLeaders: [],
    };
  }
  componentDidMount() {
    let getSliderimagesPromise = MyIIAService.getSliderimages(
      this.props.loginMetadata
    );
    let getLeadersPromise = MyIIAService.getLeaders(this.props.loginMetadata);
    Promise.all([getSliderimagesPromise, getLeadersPromise])
      .then((result: any[]) => {
        this.setState({
          sliderlist: result[0],
          hoLeaders: result[1].ho,
          chapterLeaders: result[1].chapter,
          showloading: false,
        });
      })
      .catch(() => {});
  }

  render() {
    if (this.state.showloading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <Loading />
        </IonPage>
      );
    }
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={false}
        />
        <IonReactRouter>
          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode ="md" className="myiiaImgseg">
                <IonSlides
                  className="myiiaSlider"
                  options={slideOpts}
                  pager={true}
                >
                  {this.state.sliderlist.map((item: any) => {
                    return (
                      <IonSlide key={item.name}>
                        <IonImg
                          className="myiiaImage"
                          src={
                            "https://iiaprodstorage.blob.core.windows.net/sliderimages/" +
                            item.name
                          }
                        />
                      </IonSlide>
                    );
                  })}
                </IonSlides>
              </IonSegment>

              <Redirect to={"/" + LocalContactPage.Page + "/HOLeaders"} />
              <IonTabs className="myiiatab">
                <IonRouterOutlet>
                  <Route
                    path={"/" + LocalContactPage.Page + "/HOLeaders"}
                    exact={true}
                  >
                    <IonContent>
                      <IonList>
                        {this.state.hoLeaders.map(
                          (hoLeadersitem: any, index: number) => {
                            return (
                              <IonItem key={index} lines="none">
                                <MyIIALeaders
                                  leaders={hoLeadersitem}
                                  loginMetadata={this.props.loginMetadata}
                                />
                              </IonItem>
                            );
                          }
                        )}
                      </IonList>
                    </IonContent>
                  </Route>

                  <Route
                    path={"/" + LocalContactPage.Page + "/ChapterLeaders"}
                    exact={true}
                  >
                    <IonContent>
                      <IonList>
                        {this.state.chapterLeaders.map(
                          (chapterLeadersitem: any, index: number) => {
                            return (
                              <IonItem key={index} lines="none">
                                <MyIIALeaders
                                  leaders={chapterLeadersitem}
                                  loginMetadata={this.props.loginMetadata}
                                />
                              </IonItem>
                            );
                          }
                        )}
                      </IonList>
                    </IonContent>
                  </Route>
                </IonRouterOutlet>
                <IonTabBar className="myiiatabbar" slot="top">
                  <IonTabButton
                    className="myiiabttn"
                    tab="hoLeaders"
                    href={"/" + LocalContactPage.Page + "/HOLeaders"}
                  >
                    Central Office Bearers
                  </IonTabButton>
                  {this.state.chapterLeaders.length != 0 ? (
                    <IonTabButton
                      className="myiiabttn"
                      tab="chapterLeaders"
                      href={"/" + LocalContactPage.Page + "/ChapterLeaders"}
                    >
                      Chapter leaders
                    </IonTabButton>
                  ) : null}
                </IonTabBar>
              </IonTabs>
            </IonGrid>
          </IonContent>
        </IonReactRouter>
      </IonPage>
    );
  }
}

export default MyIIA;
