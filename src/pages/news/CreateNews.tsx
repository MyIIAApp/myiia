import { FileChooser } from "@ionic-native/file-chooser/ngx";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonTextarea,
  IonTitle,
  IonToast,
  IonPage,
  IonGrid,
} from "@ionic/react";
import React from "react";
import FileUpload from "../../components/FileUpload";
import HeaderToolbar from "../../components/HeaderToolbar";
import {
  ImageExtensions,
  NewsDirectory,
} from "../../constants/FileUploadConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { NewsService } from "../../services/NewsService";
import "../../styles/News.css";

interface CreateNewsPageStates {
  title: string;
  description: string;
  link: string;
  imagePath: string;
  category: string;
  showState: boolean;
  setNewsStatus: boolean;
  newsNotCreated: boolean;
}

interface CreateNewsPageProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class CreateNews extends React.Component<
  CreateNewsPageProps,
  CreateNewsPageStates
> {
  constructor(props: CreateNewsPageProps, private fileChooser: FileChooser) {
    super(props);
    this.state = {
      title: "",
      description: "",
      link: "",
      imagePath: "",
      category: "",
      showState: false,
      setNewsStatus: false,
      newsNotCreated: false,
    };
  }

  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={false}
        />
        <IonContent>
          <IonGrid className="limitContent">
            <IonSegment mode ="md">
              <IonTitle className="createNewsTitle"> Upload Notification and Circular </IonTitle>
            </IonSegment>
            <IonItem type="reset" class="createinput">
              <IonLabel position="floating">Enter the Title*</IonLabel>
              <IonInput
                maxlength={120}
                value={this.state.title}
                spellCheck={true}
                required={true}
                onIonChange={(e) => this.onTitleChange(e)}
              ></IonInput>
              <IonFooter
                className="ion-text-end ion-no-border"
                class="footertext"
              >
                {this.state.title.length}/120
              </IonFooter>
            </IonItem>
            <IonItem type="reset" class="createDescriptionInput">
              <IonLabel position="floating">Enter the Description*</IonLabel>
              <IonTextarea
                maxlength={300}
                rows={8}
                value={this.state.description}
                spellCheck={true}
                required={true}
                onIonChange={(e) => this.onDescriptionChange(e)}
              ></IonTextarea>
              <IonFooter
                className="ion-text-end ion-no-border"
                class="footertext"
              >
                {this.state.description.length}/300
              </IonFooter>
            </IonItem>
            <IonItem type="reset" class="createinput">
              <IonLabel position="floating">Enter the Link*</IonLabel>
              <IonInput
                value={this.state.link}
                spellCheck={true}
                required={true}
                onIonChange={(e) => this.onLinkChange(e)}
              ></IonInput>
              <IonFooter
                className="ion-text-end ion-no-border"
                class="footertext"
              ></IonFooter>
            </IonItem>
            <IonSegment mode ="md">
              <FileUpload
                supportedExtensions={ImageExtensions}
                loginMetadata={this.props.loginMetadata}
                onFileUploaded={(path: string) => this.onImagePathChange(path)}
                buttonTitle={"Image"}
                fileDirectory={NewsDirectory}
                filePath={this.state.imagePath}
                buttonLabel="Upload"
                disabled={false}
                id="newsPhoto"
              />
            </IonSegment>
            <IonSegment mode ="md">
              <IonButton
                disabled={
                  this.state.title === "" ||
                  this.state.description === "" ||
                  this.state.imagePath === "" ||
                  this.state.link === ""
                }
                className="submitButton"
                type="submit"
                onClick={(e) => this.setState({ showState: true })}
              >
                Submit
              </IonButton>
            </IonSegment>
            <IonAlert
              isOpen={this.state.showState}
              message="Are you sure you want to create this News"
              onDidDismiss={() => this.setState({ showState: false })}
              buttons={[
                { text: "Cancel", role: "cancel" },
                {
                  text: "Yes",
                  handler: (e) => {
                    this.onNumberSubmitClicked(e);
                  },
                },
              ]}
            />
            <IonToast
              isOpen={this.state.setNewsStatus}
              message="News Created Successfuly!!"
              duration={2000}
              onDidDismiss={() => this.setState({ setNewsStatus: false })}
            />
            <IonAlert
              isOpen={this.state.newsNotCreated}
              message="Could not create News, enter the details correctly"
              onDidDismiss={() => this.setState({ newsNotCreated: false })}
              buttons={[{ text: "Ok", role: "cancel" }]}
            />
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  onTitleChange(event: any) {
    this.setState({ title: event.target.value });
  }

  onDescriptionChange(event: any) {
    this.setState({ description: event.target.value });
  }

  onLinkChange(event: any) {
    this.setState({ link: event.target.value });
  }

  onCategoryhange(event: any) {
    this.setState({ category: event.target.value });
  }

  onImagePathChange(path: string) {
    this.setState({ imagePath: path });
  }

  onNumberSubmitClicked(event: any) {
    NewsService.CreateNews(
      this.props.loginMetadata,
      this.state.title,
      this.state.description,
      this.state.link,
      this.state.imagePath,
      "create"
    )
      .then(() => {
        this.setState({
          setNewsStatus: true,
          title: "",
          description: "",
          link: "",
          imagePath: "",
          category: "",
        });
      })
      .catch(() => {
        this.setState({ newsNotCreated: true });
      });
  }
}

export default CreateNews;
