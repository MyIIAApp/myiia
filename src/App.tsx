import { IonApp, IonPage, isPlatform } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./styles/variables.css";
import "./styles/Elements.css";
import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { StorageService } from "./services/StorageService";
import {
  LoginMetadataExpiry,
  LoginMetadataKey,
} from "./constants/StorageConstants";
import { HomePage } from "./constants/MenuConstants";
import { LoginMetadata } from "./models/LoginMetadata";
import { BaseResponse } from "./models/BaseResponse";
import ReactGA from "react-ga";
import Loading from "./components/Loading";
import { ConnectionStatus, Network } from "@capacitor/network";
import DisplayMessage from "./components/Membership/DisplayMessage";
import rejectedMembership from "./images/rejectedMembership.svg";
import HeaderToolbar from "./components/HeaderToolbar";
import OneSignal from "onesignal-cordova-plugin";
interface AppStates {
  loginMetadata: LoginMetadata | null;
  page: string;
  showLoading: boolean;
  isConnected: boolean;
}

interface AppProps {}
class App extends React.Component<AppProps, AppStates> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loginMetadata: null,
      page: HomePage.Page,
      showLoading: true,
      isConnected: true,
    };
    Network.addListener("networkStatusChange", (status) => {
      this.setState({ isConnected: status.connected, showLoading: false });
    });
  }
  OneSignalInit(): void {
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId(this.getOneSignalToken() || "");
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
    });
    let externalUserId = "" + this.state.loginMetadata?.id;
    OneSignal.setExternalUserId(externalUserId);    
  }

  componentDidMount() {
    ReactGA.initialize("UA-207126408-1");
    this.checkNetowrk();
    StorageService.Get(LoginMetadataKey).then((loginMetadata: BaseResponse) => {
      if (loginMetadata) {
        this.setLoginStateFunction(loginMetadata.loginMetadata);
      } else {
        this.setLoginStateFunction(null);
      }
    });
  }
  checkNetowrk() {
    this.setState({ showLoading: true });
    Network.getStatus().then((res: ConnectionStatus) => {
      this.setState({ isConnected: res.connected, showLoading: false });
    });
  }

  render() {
    if (!this.state.isConnected && !this.state.showLoading) {
      return (
        <IonApp>
          <IonPage>
            <HeaderToolbar
              refreshPage={() => {
                this.checkNetowrk();
              }}
              previousPage={() => {}}
              showBackButton={false}
              showRefreshButton={true}
            />
            <DisplayMessage
              logoPath={rejectedMembership}
              message="No Internet"
            />
          </IonPage>
        </IonApp>
      );
    } else if (!this.state.isConnected && this.state.showLoading) {
      return (
        <IonApp>
          <IonPage>
            <HeaderToolbar
              refreshPage={() => {
                this.checkNetowrk();
              }}
              previousPage={() => {}}
              showBackButton={false}
              showRefreshButton={true}
            />
            <Loading />
          </IonPage>
        </IonApp>
      );
    } else {
      if (this.state.showLoading) {
        return (
          <IonApp>
            <Loading />
          </IonApp>
        );
      } else {
        return (
          <IonApp>
            {this.state.loginMetadata ? (
              <Main
                page={this.state.page}
                changePage={(value: string) => this.changePage(value)}
                loginMetadata={this.state.loginMetadata}
                setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                  this.setLoginStateFunction(loginMetadata)
                }
              />
            ) : (
              <Login
                setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                  this.setLoginStateFunction(loginMetadata)
                }
              />
            )}
          </IonApp>
        );
      }
    }
  }

  public setLoginStateFunction(metadata: LoginMetadata | null) {
    if (metadata) {
      var response = new BaseResponse();
      response.loginMetadata = metadata;
      StorageService.Set(LoginMetadataKey, response, LoginMetadataExpiry).then(
        () => {
          this.setState({ loginMetadata: metadata, showLoading: false });
          if(this.getOneSignalToken())
          {
            this.OneSignalInit();
          }
        }
      );
    } else {
      StorageService.Clear().then(() => {
        this.setState({
          loginMetadata: null,
          page: HomePage.Page,
          showLoading: false,
        });
      });
    }
  }

  public changePage(value: string) {
    this.setState({ page: value });
  }

  private getOneSignalToken()
  {
    if(isPlatform("android"))
    {
      return "e28e2491-74ab-4363-97eb-a650f2e1d7f2";
    }
    if(isPlatform("ios" || "ipad" || "iphone"))
    {
      return "257fda4d-19c4-4b40-84ec-615735243566";
    }

    return "";
  }
}
export default App;
