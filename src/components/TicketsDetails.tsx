import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { IonAvatar,IonButton,IonCard,IonCardContent,IonCol,IonContent,
  IonDatetime,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPopover,
  IonRow,
  IonSegment,
  IonNote,
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
import profileIcon from "../images/helpdeskUserIcon.svg";
import iiaLogo from "../images/iiaLogo.svg";
import sendIcon from "../images/sendIcon.svg";
import downloadIcon from "../images/uploadIcon2.svg";
import viewIcon from "../images/eye-icon.png";
import { Attachments } from "../models/Attachments";
import { BaseResponse } from "../models/BaseResponse";
import { Comments } from "../models/Comments";
import { LoginMetadata } from "../models/LoginMetadata";
import { Ticket } from "../models/Ticket";
import { UserProfileModel } from "../models/UserProfileModel";
import { HelpdeskService } from "../services/HelpdeskService";
import { MembershipService } from "../services/MembershipService";
import SubjectCommitteeChairman from "../JsonFiles/SubjectCommitteeChairman.json";
import FileUpload from "./FileUpload";
import Loading from "./Loading";
import { IsAdmin } from "../constants/Config";
import { CreateTicketResponse } from "../models/CreateTicketResponse";
import { AdminNameService } from "../services/AdminNameService";

interface TicketsDetailsStates {
  ticket: Ticket;
  comment: string;
  isUpdating: boolean;
  imagePath: string;
  setChapterStatus: boolean;
  showModal: boolean;
  name: string;
  adminName: string;
  currentHelpdeskView: string;
  sCommitteChairman: any;
  committeeName: string;
  committeeId: any;
  showLoading: boolean;
  showHeadOfficebtn:boolean;
}

interface TicketsDetailsProps {
  TicketNumber: string;
  loginMetadata: LoginMetadata;
  setViewFunction: (value: string) => void;
}

class TicketsDetails extends React.Component<
  TicketsDetailsProps,
  TicketsDetailsStates
> {
  constructor(props: TicketsDetailsProps, private fileChooser: FileChooser) {
    super(props);
    this.state = {
      ticket: new Ticket(),
      comment: "",
      isUpdating: false,
      imagePath: "",
      setChapterStatus: false,
      showModal: false,
      name: "",
      adminName: "",
      currentHelpdeskView: HelpdeskView.TicketDetails,
      sCommitteChairman: SubjectCommitteeChairman,
      committeeName: "",
      committeeId: 0,
      showLoading: false,
      showHeadOfficebtn:false
    };
  }

  componentDidMount() {
    this.getData(true);
    HelpdeskService.CheckIfAssignToHeadOffice(this.props.TicketNumber).then(res=>{
      this.setState({ showHeadOfficebtn: res.status });
    })
  }


  protected getData(forceRefresh: boolean) {
    HelpdeskService.GetTicketDetails(this.props.loginMetadata, this.props.TicketNumber)
      .then((ticketResponse: Ticket[]) => {
        if (ticketResponse.length !== 0) {
          this.setState({
            ticket: ticketResponse[0],
            showLoading: false,
          });
        }
      })
      .catch(() => {});
    if (this.props.loginMetadata.isAdmin) {
      AdminNameService.GetAdminName(this.props.loginMetadata).then(
        (res: any) => {
          let name: string = "";
          name = res.name;
          this.setState({ adminName: name });
        }
      );
    } else {
      MembershipService.getUserProfile(
        this.props.loginMetadata,
        false,
        {}
      ).then((res: UserProfileModel) => {
        this.setState({ name: res.firstName + " " + res.lastName });
      });
    }
  }

  render() {
    if (
      !this.state.ticket.TicketNumber ||
      this.state.isUpdating ||
      this.state.showLoading
    ) {
      return <Loading />;
    }

    return this.ticketcontent();
  }

  private ticketcontent() {
    return (
      <IonCard class="ticketdetailscard">
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="8">
                <IonRow>
                  <IonCol class="ticketNumber">
                    #{this.state.ticket.TicketNumber}
                  </IonCol>
                </IonRow>
                <IonRow class="ticketDetailUserDetail">
                  {this.state.ticket.UserName}
                </IonRow>
                <IonRow class="ticketDetailUserDetail">
                  {this.state.ticket.PhoneNumber}
                </IonRow>
                <IonRow class="ticketDetailUserDetailChapter">
                  {this.state.ticket.ChapterName}&nbsp;Chapter
                </IonRow>
                <IonRow>
                  <IonCol class="ticketTitle">{this.state.ticket.Title}</IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="4">
                <IonRow>
                  <IonCard
                    class={
                      this.state.ticket.Status === "Closed"
                        ? "ticketdetail22"
                        : "ticketdetail2"
                    }
                  >
                    {this.state.ticket.Status}
                  </IonCard>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-text-end ticketCreationTime">
                    {this.state.ticket.TicketCreationTime.split("T")[0]}{" "}
                    {this.state.ticket.TicketCreationTime.split(
                      "T"
                    )[1].substring(0, 5)}
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCard class="categorySubcategory11">
                <IonCol>
                  <strong>{this.state.ticket.Category.split(",")[0]}</strong>
                  &nbsp;-&nbsp;{this.state.ticket.Category.split(",")[1]}
                </IonCol>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCol size="11" class="item-center description">
                {this.state.ticket.Description}
              </IonCol>
            </IonRow>
            {IsAdmin ? (
              <IonRow style={{ marginBottom: "18px", marginTop: "20px" }}>
                <IonCol
                  style={{
                    flexdirection: "column",
                    justifyContent: "space-between",
                  }}
                  size="12"
                >
                  <IonItem class="SelectInputSCC">
                    <IonLabel
                      position="floating"
                      class="LabelPosition"
                      color={"high"}
                    >
                      Committee*
                    </IonLabel>
                    <IonSelect
                      value={this.state.committeeName}
                      name="Committee"
                      class=""
                      onIonChange={(e) => this.updateValue(e)}
                    >
                      {this.state.sCommitteChairman.map((val: any) => {
                        return (
                          <IonSelectOption
                            key={val.Committee_ID}
                            value={val.Committee_Name}
                          >
                            {val.Committee_Name}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                    <IonButton
                      class="SelectInputSCCButton"
                      slot="end"
                      onClick={() => {
                        this.storeCommitteeIdDb();
                      }}
                    >
                      Save
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
            ) : null}
            <IonRow class="ticketDetailUserDetail">
              Allotted Category: {`   ${this.showCommitteeValue()}`}
            </IonRow>
          </IonGrid>

          {this.state.ticket.Comment.map((c: Comments) => {
            return (
              <IonCard key={c.CommentCreationTime} class="commentBox">
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      {c.AdminName === "" ? (
                        <img src={profileIcon} />
                      ) : (
                        <img src={iiaLogo} className="iiaLogo" />
                      )}
                    </IonCol>
                    &nbsp;
                    <IonCol class="commentName">
                      {c.AdminName !== "" ? c.AdminName : c.UserName}
                    </IonCol>
                    <IonCol class="ion-text-end commentTime">
                      {c.CommentCreationTime.split("T")[0]}&nbsp;
                      {c.CommentCreationTime.split("T")[1].substring(0, 5)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12" class="ion-text-start">
                      {c.Comments}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            );
          })}
          <IonModal
            isOpen={this.state.showModal}
            onDidDismiss={() => this.setState({ showModal: false })}
          >
            <IonContent>
              <IonListHeader lines="full" class="viewheader">
                Attachments
              </IonListHeader>
              <IonList>
                {this.state.ticket.Attachment.length != 0 ? (
                  this.state.ticket.Attachment.map((a: Attachments) => {
                    return (
                      <IonItem lines="full" key={a.AttachmentCreationTime}>
                        <IonLabel>
                          {a.AttachmentURL != ""
                            ? a.AttachmentURL.split("_")[1].split(".")[0]
                            : null}
                        </IonLabel>
                        <IonButton
                          slot="end"
                          onClick={() => window.open(a.AttachmentAcutal)}
                        >
                          DOWNLOAD
                        </IonButton>
                      </IonItem>
                    );
                  })
                ) : (
                  <IonItem lines="full">No Attachments to Show </IonItem>
                )}
              </IonList>
            </IonContent>
          </IonModal>
          <IonCard
            class="commentadd"
            hidden={this.state.ticket.Status === "Closed"}
          >
            <IonTextarea
              // maxlength={infinite}
              rows={2}
              value={this.state.comment}
              placeholder=" Add Comment "
              spellCheck={true}
              required={true}
              onIonChange={(e) => this.onCommentChange(e)}
            ></IonTextarea>
            <IonButton
              class="addbutton"
              onClick={(e) => this.onAddClicked(this.props.loginMetadata.id)}
            >
              <IonImg src={sendIcon} />
            </IonButton>
          </IonCard>
          {this.state.ticket.Status != "Closed" ? (
            <IonItem lines="none" class="attach">
              <IonGrid>
                <IonRow>
              <FileUpload
                supportedExtensions={AllExtensions}
                loginMetadata={this.props.loginMetadata}
                onFileUploaded={(path: string) => this.onImagePathChange(path)}
                buttonTitle={"Image"}
                fileDirectory={HelpdeskDirectory}
                filePath={this.state.imagePath}
                buttonLabel="Upload attachment"
                disabled={false}
                id="attachmentPhoto"
              />
              <IonButton
                hidden={
                  this.state.ticket.Status === "Closed" ||
                  this.state.imagePath === ""
                }
                class="uploadButtonAttachment"
                onClick={(e) => this.onUploadClicked(e)}
              >
                <IonImg src={downloadIcon} />
                <label>{" "}
            &nbsp;&nbsp;Upload</label>
              </IonButton>
              </IonRow>
              <IonRow>
              <IonButton
                class="basicButton fileUploadButton"
                onClick={() => this.setState({ showModal: true })}
              >  
                <IonImg src={viewIcon} />
                <label>{" "}
                  &nbsp;&nbsp;View Attachment</label>
              </IonButton>
              </IonRow>
              </IonGrid>
            </IonItem>
          ) : (
            <IonCard class="closeattach">
              <IonItem lines="none" class="closeattachlabel">
                {this.getAttachmentsCount()}&nbsp;
                {this.getAttachmentsCount() === 1
                  ? "File Attached"
                  : "Files Attached"}
                <IonButton
                  class="uploadbutton1"
                  onClick={() => this.setState({ showModal: true })}
                >
                  <IonImg src={viewIcon} />
                </IonButton>
              </IonItem>
            </IonCard>
          )}
          <IonButton
            class="commonbutton1"
            hidden={
              this.state.showHeadOfficebtn ||
              this.state.ticket.ChapterId === "82" ||
              this.state.ticket.Status === "Closed" ||
              !this.props.loginMetadata.isAdmin 
            }
            onClick={(e) => this.onChangeClicked()}
          >
            Assign to Head Office
          </IonButton>
          <IonToast
            isOpen={this.state.setChapterStatus}
            message="Assigned to HO!!"
            duration={2000}
            onDidDismiss={() => this.setState({ setChapterStatus: false })}
          />
          <IonButton
            class="closebutton"
            hidden={
              this.state.ticket.Status === "Closed" ||
              !this.props.loginMetadata.isAdmin
            }
            onClick={(e) => this.onCloseClicked(this.state.ticket.TicketNumber)}
          >
            Close Ticket
          </IonButton>
        </IonCardContent>
      </IonCard>
    );
  }

  private getAttachmentsCount(): number {
    if (!this.state.ticket || this.state.ticket.Attachment.length === 0) {
      return 0;
    }

    let count = 0;
    this.state.ticket.Attachment.forEach((AttachmentURL) => {
      count++;
    });

    return count;
  }

  private onCloseClicked(ticketNumber: string) {
    this.setState({ isUpdating: true });
    HelpdeskService.CloseTicket(this.props.loginMetadata, ticketNumber)
      .then((resp: BaseResponse) => {
        var temp = this.state.ticket;
        temp.Status = "Closed";
        this.setState({
          ticket: temp,
          isUpdating: false,
        });
      })
      .catch(() => {});
  }

  private onChangeClicked() {
    HelpdeskService.ChangeChapter(
      this.props.loginMetadata,
      this.state.ticket.TicketNumber
    )
      .then((resp: BaseResponse) => {
        this.onChangeView();
      })
      .catch(() => {});
  }

  private onChangeView() {
    this.props.setViewFunction(HelpdeskView.HelpdeskHome);
  }

  onCommentChange(event: any) {
    this.setState({ comment: event.target.value });
  }

  onImagePathChange(path: string) {
    this.setState({ imagePath: path });
  }

  onAddClicked(event: any) {
    this.setState({isUpdating:true})
    HelpdeskService.AddComment(
      this.props.loginMetadata,
      this.props.TicketNumber,
      this.state.comment,
      this.state.ticket.CommitteeId
    )
      .then(() => {
        var temp = this.state.ticket;
        var newComment = new Comments();
        newComment.Comments = this.state.comment;
        temp.Status = this.props.loginMetadata.isAdmin
          ? "Pending on Member"
          : "Pending on IIA";
        newComment.AdminName = this.state.adminName;
        newComment.UserName = this.state.name;
        newComment.CommentCreationTime = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000 + 330
        ).toISOString();
        temp.Comment.push(newComment);
        this.setState({
          ticket: temp,
          comment: "",
          isUpdating:false
        });
      })
      .catch(() => {
        this.setState({ isUpdating: false });
      });
  }

  onUploadClicked(event: any) {
    this.setState({ isUpdating: true });
    HelpdeskService.AddAttachment(
      this.props.loginMetadata,
      this.props.TicketNumber,
      this.state.imagePath
    )
      .then(() => {
        var temp = this.state.ticket;
        var newAttachment = new Attachments();
        newAttachment.AttachmentURL = this.state.imagePath;
        temp.Attachment.push(newAttachment);
        this.setState({
          ticket: temp,
          isUpdating: false,
          imagePath: "",
        });
      })
      .catch(() => {
        this.setState({ isUpdating: false });
      });
  }
  updateValue(e) {
    const ID = SubjectCommitteeChairman.find(
      (Idnum) => Idnum.Committee_Name === e.detail.value
    );
    this.setState({
      committeeName: e.detail.value,
      committeeId: ID?.Committee_ID,
    });
    // console.log(this.state.committeeId + " " + this.state.committeeName);
  }
  storeCommitteeIdDb() {
    this.setState({ showLoading: true });
    HelpdeskService.UpdateCommitteeTicket(
      this.props.loginMetadata,
      this.props.TicketNumber,
      this.state.committeeId
    )
      .then((resp: any) => {
        // console.log(resp);
        this.getData(true);
      })
      .catch((error) => {
        throw error;
      });
  }
  showCommitteeValue() {
    if (this.state.ticket.CommitteeId) {
      let index = parseInt(this.state.ticket.CommitteeId);
      // console.log(index);
      return SubjectCommitteeChairman[index - 1].Committee_Name;
    }
  }
}

export default TicketsDetails;
