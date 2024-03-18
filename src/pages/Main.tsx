import { createAnimation, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import { HomePage } from "../constants/MenuConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import ItemDetails from "./B2BBuyer/ItemDetails";
import ItemsList from "./B2BBuyer/ItemsList";
import Menu from "./Menu";
import MenuPages from "./MenuPages";

interface MainStates {}

interface MainProps {
  page: string;
  changePage: (value: string) => void;
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

const animationBuilder = (baseEl, opts) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .beforeRemoveClass("ion-page-invisible");
  const leavingAnimation = createAnimation().addElement(opts.leavingEl);

  if (opts.direction === "forward") {
    enteringAnimation.fromTo("transform", "translateX(100%)", "translateX(0)");
  } else {
    leavingAnimation.fromTo("transform", "translateX(0)", "translateX(100%)");
    enteringAnimation.fromTo("opacity", "0.25", "1");
  }
  const animation = createAnimation()
    .duration(300)
    .easing("cubic-bezier(0.3,0,0.66,1)")
    .addAnimation(enteringAnimation)
    .addAnimation(leavingAnimation);

  return animation;
};

class Main extends React.Component<MainProps, MainStates> {
  constructor(props: MainProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonReactRouter>
        <Menu
          changePage={(value: string) => this.props.changePage(value)}
          loginMetadata={this.props.loginMetadata}
          page={this.props.page}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
        />
        <IonRouterOutlet id="main" animation={animationBuilder}>
          <Route
            exact
            path="/:page"
            render={(route) => {
              return (
                <MenuPages
                  {...route}
                  changePage={(value: string) => this.props.changePage(value)}
                  loginMetadata={this.props.loginMetadata}
                  setLoginStateFunction={(
                    loginMetadata: LoginMetadata | null
                  ) => this.props.setLoginStateFunction(loginMetadata)}
                />
              );
            }}
          />
          <Route
            exact
            path="/:page/:category/:subCategory"
            render={(route) => {
              return (
                <ItemsList
                  {...route}
                  loginMetadata={this.props.loginMetadata}
                />
              );
            }}
          />
          <Route
            exact
            path="/:page/:category/:subCategory/:index"
            render={(route) => {
              return (
                <ItemDetails
                  {...route}
                  loginMetadata={this.props.loginMetadata}
                />
              );
            }}
          />
        </IonRouterOutlet>
        <Redirect to={"/" + this.props.page} />
      </IonReactRouter>
    );
  }
}

export default Main;
