import {
  IonButton,
  IonContent,
  IonFooter,
  IonGrid,
  IonImg,
  IonLabel,
  IonSegment,
} from "@ionic/react";
import moment from "moment";
import React from "react";
import { defaultImagePath } from "../../constants/ImageConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { News } from "../../models/News/News";
import "../../styles/News.css";

interface NewsCardProps {
  loginMetadata: LoginMetadata;
  news: News;
}

class NewsCard extends React.Component<NewsCardProps> {
  constructor(props: NewsCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonGrid className="newsCard">
        <img src={this.getImagePath()} className="imgStyle" />
        <p className="ion-text-start labelFont">{this.props.news.title}</p>
        <p className="ion-no-margin ion-text-start paragraph">
          {this.props.news.description}
        </p>
        <p className="ion-text-start articleBy">
          <IonLabel color="primary">
            <br />
            Posted by
          </IonLabel>{" "}
          {this.props.news.chapterName} Chapter
          {"/ "}
          {moment(this.props.news.creationTime).format("D MMM YYYY")}
        </p>

        <IonSegment mode ="md" className="newsFooter">
          <IonButton
            expand="block"
            href={this.props.news.link}
            className="readButton"
          >
            Read Full Article
          </IonButton>
        </IonSegment>
      </IonGrid>
    );
  }

  getImagePath() {
    if (this.props.news.imagePath === "") {
      return defaultImagePath;
    } else {
      return this.props.news.imagePath;
    }
  }
}

export default NewsCard;
