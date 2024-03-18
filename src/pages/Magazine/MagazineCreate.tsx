import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { IonAlert, IonButton, IonCol, IonContent, IonDatetime, IonFooter, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSegment, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToast } from "@ionic/react";
import React from "react";
import FileUpload from "../../components/FileUpload";
import HeaderToolbar from "../../components/HeaderToolbar";
import { ImageExtensions, MagazineDirectory, PDFExtensions } from "../../constants/FileUploadConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MagazineService } from "../../services/MagazineService";

interface MagazineCreatePageStates {
  title: string;
  magazinePath: string;
  magazineMonth: string;
  magazineYear: string;
  coverPhotoPath: string;
  showState: boolean;
  setMagazineStatus: boolean;
  magazineNotCreated: boolean;
  }
  
  interface MagazineCreatePageProps {
    loginMetadata: LoginMetadata;
  }
  
  class MagazineCreate extends React.Component<
    MagazineCreatePageProps,
    MagazineCreatePageStates
  > {
    constructor(props: MagazineCreatePageProps, private fileChooser: FileChooser) {
      super(props);
      this.state = {
        title: "",
        magazinePath: "",
        magazineMonth: "",
        magazineYear: "",
        showState: false,
        setMagazineStatus: false,
        magazineNotCreated: false,
        coverPhotoPath: ""
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
                <IonTitle className="createNewsTitle"> Upload Magazine </IonTitle>
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
              <IonSegment mode ="md">
                <FileUpload
                  supportedExtensions={ImageExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) => this.onImagePathChange(path)}
                  buttonTitle={"Img"}
                  fileDirectory={MagazineDirectory}
                  filePath={this.state.coverPhotoPath}
                  buttonLabel="Upload Cover Photo"
                  disabled={false}
                  id="magazinecover"
                />
              </IonSegment>
              <IonSegment mode ="md">
                <FileUpload
                  supportedExtensions={PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) => this.onPdfPathChange(path)}
                  buttonTitle={"Pdf"}
                  fileDirectory={MagazineDirectory}
                  filePath={this.state.magazinePath}
                  buttonLabel="Upload Magazine"
                  disabled={false}
                  id="magazine"
                />
              </IonSegment>
              <IonSegment>
                <IonRow>
                <IonCol>
                  <IonSelect value={this.state.magazineMonth} onIonChange={ (e) => this.onMonthChange(e)} placeholder="Select Month" class="selectmonth">
                    <IonSelectOption value= "January">January</IonSelectOption>
                    <IonSelectOption value= "February">February</IonSelectOption>
                    <IonSelectOption value= "March">March</IonSelectOption>
                    <IonSelectOption value= "April">April</IonSelectOption>
                    <IonSelectOption value= "May">May</IonSelectOption>
                    <IonSelectOption value= "June">June</IonSelectOption>
                    <IonSelectOption value= "July">July</IonSelectOption>
                    <IonSelectOption value= "August">August</IonSelectOption>
                    <IonSelectOption value= "September">September</IonSelectOption>
                    <IonSelectOption value= "October">October</IonSelectOption>
                    <IonSelectOption value= "November">November</IonSelectOption>
                    <IonSelectOption value= "December">December</IonSelectOption>
                  </IonSelect>
                </IonCol>
                &nbsp;
                <IonCol>
                <IonInput maxlength={4}
                value={this.state.magazineYear}
                spellCheck={true}
                required={true}
                onIonChange={(e)=>this.onYearChange(e)}
                placeholder="Enter Year">
                </IonInput>
                </IonCol>
                </IonRow>
              </IonSegment>
              <IonSegment mode ="md">
                <IonButton
                  disabled={
                    this.state.title === "" ||
                    this.state.magazinePath === "" ||
                    this.state.magazineMonth === "" ||
                    this.state.magazineYear === ""  ||
                    this.state.coverPhotoPath === ""
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
                message="Are you sure you want to upload this Magazine?"
                onDidDismiss={() => this.setState({ showState: false })}
                buttons={[
                  { text: "Cancel", role: "cancel" },
                  {
                    text: "Yes",
                    handler: (e) => {
                      this.onSubmitClicked(e);
                    },
                  },
                ]}
              />
              <IonToast
                isOpen={this.state.setMagazineStatus}
                message="Magazine uploaded Successfuly!!"
                duration={2000}
                onDidDismiss={() => this.setState({ setMagazineStatus: false })}
              />
              <IonAlert
                isOpen={this.state.magazineNotCreated}
                message="Could not upload Magazine, enter the details correctly"
                onDidDismiss={() => this.setState({ magazineNotCreated: false })}
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
  
    onImagePathChange(path: string) {
      this.setState({ coverPhotoPath: path });
    }

    onPdfPathChange(path: string) {
      this.setState({ magazinePath: path });
    }

    onMonthChange(event: any) {
      this.setState({ magazineMonth: event.target.value });
    }

    onYearChange(event: any) {
      this.setState({ magazineYear: event.target.value });
    }
  
    onSubmitClicked(event: any) {
      MagazineService.CreateMagazine(
        this.props.loginMetadata,
        this.state.title,
        this.state.magazinePath,
        this.state.magazineMonth,
        this.state.magazineYear,
        this.state.coverPhotoPath,
        "create"
      )
        .then(() => {
          this.setState({
            setMagazineStatus: true,
            title: "",
            magazinePath: "",
            magazineMonth: "",
            magazineYear: "",
            coverPhotoPath: "",
          });
        })
        .catch(() => {
          this.setState({ magazineNotCreated: true });
        });
    }
}

export default MagazineCreate;