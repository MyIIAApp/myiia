import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  IonSegment,
  isPlatform,
} from "@ionic/react";
import { IonReactMemoryRouter } from "@ionic/react-router";
import { closeCircleOutline } from "ionicons/icons";
import React from "react";
import { Android, IOS } from "../constants/FileUploadConstants";
import uploadIcon from "../images/uploadIcon.svg";
import { FileResponse } from "../models/FileResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { FileService } from "../services/FileService";
import "../styles/Elements.css";
import Loading from "./Loading";

interface FileUploadStates {
  isUploading: boolean;
  fileName: string;
}

interface FileUploadProps {
  supportedExtensions: string;
  loginMetadata: LoginMetadata;
  onFileUploaded: (path: string) => void;
  buttonTitle: string;
  fileDirectory: string;
  filePath: string;
  buttonLabel: string;
  disabled: boolean;
  id: string;
}

class FileUpload extends React.Component<FileUploadProps, FileUploadStates> {
  constructor(props: FileUploadProps) {
    super(props);
    this.state = { isUploading: false, fileName: this.props.buttonLabel };
  }

  render() {
    if (this.state.isUploading) {
      return (
        <IonButton class="basicButton fileUploadButton">
          <Loading />
        </IonButton>
      );
    }

    if (this.props.filePath !== "") {
      return (
        <IonButton class="basicButton fileUploadButton">
          <IonGrid>
            <IonRow>
              <IonCol size="8">
                <IonLabel className="ion-text-wrap">
                  {this.state.fileName}
                </IonLabel>
              </IonCol>
              <IonCol size="4" className="ion-align-self-center">
                <IonButton
                  class="removeButton"
                  color="danger"
                  onClick={(e) => this.onRemoveClicked()}
                  disabled={this.props.disabled}
                >
                  <IonIcon
                    slot="end"
                    ios={closeCircleOutline}
                    md={closeCircleOutline}
                  />
                  Remove
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonButton>
      );
    } else {
      return (
        <IonButton class="basicButton fileUploadButton">
          <IonImg src={uploadIcon} alt="" />
          <input
            id={this.props.id}
            hidden
            type="file"
            name="file"
            data-max-size="2048"
            accept={this.props.supportedExtensions}
            onChange={(e) => this.upload(e)}
          />
          <label htmlFor={this.props.id}>
            {" "}
            &nbsp;&nbsp;{this.props.buttonLabel}
          </label>
        </IonButton>
      );
    }
  }

  private pickFile() {
    if (isPlatform(Android)) {
    } else if (isPlatform(IOS)) {
    } else {
    }
  }

  private onRemoveClicked() {
    this.props.onFileUploaded("");
    this.setState({ fileName: "" });
  }

  upload(event: any) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    this.setState({ isUploading: true });

    let file = event.target.files[0] as File;
    FileService.UploadFile(
      this.props.loginMetadata,
      file,
      this.props.fileDirectory,
      file.name
    ).then((fileResponse: FileResponse) => {
      this.props.onFileUploaded(fileResponse.path);
      this.setState({ isUploading: false, fileName: file.name });
    });
  }
}

export default FileUpload;
