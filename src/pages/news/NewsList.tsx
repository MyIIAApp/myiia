import {
  IonContent,
  IonGrid,
  IonPage,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import { News } from "../../models/News/News";
import { NewsResponse } from "../../models/News/NewsResponse";
import { NewsService } from "../../services/NewsService";
import "../../styles/News.css";
import NewsCard from "./News";

interface NewsListStates {
  newsList: News[];
  category: string;
  showLoading: boolean;
}

interface NewsListProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class NewsList extends React.Component<NewsListProps, NewsListStates> {
  constructor(props: NewsListProps) {
    super(props);
    this.state = { newsList: [], category: "", showLoading: false };
  }

  componentDidMount() {
    this.getData(false);
  }

  protected getData(forceRefresh: boolean) {
    this.setState({ newsList: [], showLoading: true });
    NewsService.GetNews(
      this.props.loginMetadata,
      this.state.category,
      forceRefresh
    )
      .then((newsResponse: NewsResponse) => {
        this.setState({ newsList: newsResponse.news, showLoading: false });
      })
      .catch(() => {});
  }

  render() {
    const slideOpts = {
      speed: 1000,
    };
    if (this.state.showLoading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    } else if (this.state.newsList.length === 0) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          No News
        </IonPage>
      );
    }

    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => this.getData(true)}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonContent>
          <IonGrid className="limitContent">
            <IonSlides
              className="newsSlides"
              scrollbar={false}
              options={slideOpts}
            >
              {this.state.newsList.map((newsItem: News) => {
                return (
                  <IonSlide key={newsItem.id}>
                    <NewsCard
                      news={newsItem}
                      loginMetadata={this.props.loginMetadata}
                    />
                  </IonSlide>
                );
              })}
            </IonSlides>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}

export default NewsList;
