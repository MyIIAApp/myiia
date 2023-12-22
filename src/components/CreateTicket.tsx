import {
  IonAlert,
  IonButton,
  IonGrid,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import React from "react";
import {
  AllExtensions,
  HelpdeskDirectory,
} from "../constants/FileUploadConstants";
import { HelpdeskView } from "../HelpdeskConstants";
import { CreateTicketResponse } from "../models/CreateTicketResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { HelpdeskService } from "../services/HelpdeskService";
import FileUpload from "./FileUpload";
import statesData from "../JsonFiles/IndianStates.json";
import TicketsDetails from "./TicketsDetails";
import { categorySubcategory } from "../JsonFiles/CategorySubcategory.json";

const header = {
  header: "Issue & Problem Pertains to",
};

const header2 = {
  header: "Select the Sub-category",
};
interface CreateTicketPageStates {
  title: string;
  description: string;
  indianStates: any;
  category: string;
  imagePath: string;
  showState: boolean;
  setTicketStatus: boolean;
  ticketNotCreated: boolean;
  ticketnum: string;
  currentHelpdeskView: HelpdeskView;
  ticketNumber: string;
  fileuploaded: boolean;
  subCategory: string;
  states: string;
}

interface CreateTicketPageProps {
  loginMetadata: LoginMetadata;
  userId: number;
}

class CreateTicket extends React.Component<
  CreateTicketPageProps,
  CreateTicketPageStates
> {
  constructor(props: CreateTicketPageProps) {
    super(props);
    this.state = {
      title: "",
      indianStates: statesData.states,
      description: "",
      category: "",
      imagePath: "",
      showState: false,
      setTicketStatus: false,
      ticketNotCreated: false,
      ticketnum: "",
      currentHelpdeskView: HelpdeskView.CreateTicket,
      ticketNumber: "",
      fileuploaded: false,
      subCategory: "",
      states: "",
    };
  }
  Category = ["Central Govt.", "State Govt."];
  render() {
    if (this.state.currentHelpdeskView === HelpdeskView.TicketDetails) {
      return this.getTicketContent();
    }
    return (
      <IonGrid className="limitContent">
        <IonItem type="reset" class="createticketinput">
          <IonLabel position="floating">Enter the Title</IonLabel>
          <IonInput
            maxlength={200}
            value={this.state.title}
            spellCheck={true}
            required={true}
            onIonChange={(e) => this.onTitleChange(e)}
          ></IonInput>
          <IonFooter className="ion-text-end ion-no-border" class="footertext">
            {this.state.title.length}/200
          </IonFooter>
        </IonItem>
        <IonItem class="createticketdescription">
          <IonLabel position="floating">Enter the Description</IonLabel>
          <IonTextarea
            maxlength={1000}
            rows={8}
            value={this.state.description}
            spellCheck={true}
            required={true}
            onIonChange={(e) => this.onDescriptionChange(e)}
          ></IonTextarea>
          <IonFooter className="ion-text-end ion-no-border" class="footertext">
            {this.state.description.length}/1000
          </IonFooter>
        </IonItem>
        <IonItem class="createticketinput">
          <IonLabel position="floating">Issue & Problem Pertain to</IonLabel>
          <IonSelect
            interfaceOptions={header}
            // required={true}
            value={this.state.category}
            okText="Okay"
            cancelText="Cancel"
            onIonChange={(e) => this.onCategoryChange(e)}
          >
            {this.Category.map((category: any) => {
              return (
                <IonSelectOption value={category}>{category}</IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem
          class="createinput"
          hidden={this.state.category === "State Govt." || "" ? false : true}
        >
          <IonLabel position="floating" class="selectDisabled">
            State*
          </IonLabel>
          <IonSelect
            value={this.state.states}
            name="states"
            class="selectDisabled"
            //disabled={((this.props.gstCheck && this.props.membershipProfile.state.length!=0) || this.state.disabled)}
            onIonChange={(e) => this.setState({ states: e.detail.value })}
          >
            {this.state.indianStates.map((state: any) => {
              return (
                <IonSelectOption key={state.state} value={state.state}>
                  {state.state}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem class="createticketinput">
          <IonLabel position="floating">
            Ministry/Department/Organization
          </IonLabel>
          {
            <IonInput
              maxlength={100}
              value={this.state.subCategory}
              spellCheck={true}
              required={true}
              onIonChange={(e) => this.onSubCategoryChange(e)}
            ></IonInput>
          }
        </IonItem>
        <IonSegment mode="md">
          <FileUpload
            supportedExtensions={AllExtensions}
            loginMetadata={this.props.loginMetadata}
            onFileUploaded={(path: string) => this.onImagePathChange(path)}
            buttonTitle={"Image"}
            fileDirectory={HelpdeskDirectory}
            filePath={this.state.imagePath}
            buttonLabel="Upload attachment"
            disabled={false}
            id="ticketPhoto"
          />
        </IonSegment>
        <IonSegment mode="md">
          <IonButton
            disabled={
              true
                ? this.state.title === "" ||
                  this.state.description === "" ||
                  this.state.category === "" ||
                  this.state.subCategory === "" ||
                  (this.state.category === "State Govt." &&
                    this.state.states === "")
                : false
            }
            type="submit"
            onClick={(e) => this.setState({ showState: true })}
            class="submitbutton"
          >
            Submit
          </IonButton>
        </IonSegment>
        <IonAlert
          isOpen={this.state.showState}
          message="Are you sure you want to create this Ticket?"
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
          isOpen={this.state.setTicketStatus}
          message="Ticket Created Successfuly!!"
          duration={2000}
          onDidDismiss={() => this.setState({ setTicketStatus: false })}
        />
        <IonAlert
          isOpen={this.state.ticketNotCreated}
          message="Could not create Ticket, enter the details correctly"
          onDidDismiss={() => this.setState({ ticketNotCreated: false })}
          buttons={[{ text: "Ok", role: "cancel" }]}
        />
      </IonGrid>
    );
  }

  onTitleChange(event: any) {
    this.setState({ title: event.target.value });
  }

  onDescriptionChange(event: any) {
    this.setState({ description: event.target.value });
  }

  onImagePathChange(path: string) {
    this.setState({ imagePath: path });
  }

  onCategoryChange(event: any) {
    this.setState({
      category: event.target.value,
      subCategory: "",
    });
  }
  onSubCategoryChange(event: any) {
    this.setState({ subCategory: event.target.value });
  }

  onUploadClicked(event: any) {
    HelpdeskService.AddAttachment(
      this.props.loginMetadata,
      this.state.ticketNumber,
      this.state.imagePath
    )
      .then(() => {
        this.setState({
          fileuploaded: true,
          ticketNumber: "",
          imagePath: "",
        });
      })
      .catch(() => {
        this.setState({});
      });
  }

  onNumberSubmitClicked(event: any) {
    HelpdeskService.CreateTicket(
      this.props.loginMetadata,
      this.state.title,
      this.state.description,
      (this.state.category === "State Govt."
        ? this.state.states + " Govt."
        : this.state.category) +
        "," +
        this.state.subCategory,
      this.state.imagePath,
      this.props.userId
    )
      .then((ticketResponse: CreateTicketResponse) => {
        this.setState({
          setTicketStatus: true,
          title: "",
          description: "",
          category: "",
          ticketNumber: ticketResponse.ticketNumber,
          currentHelpdeskView: HelpdeskView.TicketDetails,
        });
      })
      .catch(() => {
        this.setState({ ticketNotCreated: true });
      });
  }

  private getTicketContent() {
    return (
      <TicketsDetails
        TicketNumber={this.state.ticketNumber}
        loginMetadata={this.props.loginMetadata}
        setViewFunction={(value: string) => {}}
      />
    );
  }
}

export default CreateTicket;
