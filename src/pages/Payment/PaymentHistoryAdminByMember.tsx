import {
    IonContent,
    IonPage,
    IonSegment,
    IonRouterLink,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonFooter,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonList,
    IonAlert,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Payment.css";
import "../../styles/Membership.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import { closeOutline, close } from "ionicons/icons";
import { MembershipService } from "../../services/MembershipService";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import flag from "../../images/indiaFlag.svg";
import  DownloadPaymentInExcelServices  from "../../services/DownloadPaymentInExcelServices";
import { PaymentRecordAllInvoice } from "../../models/Payment/PaymentRecordAllInvoice";
import { PaymentRecordResponse } from "../../models/Payment/PaymentRecordAllInvoiceResponse";
import PaymentInvoiceFiltered from "./PaymentInvoiceFiltered";

interface PaymentHistoryAdminStates {
    PaymentHistoryRecord: any;
    showloading: boolean;
    showMemberEntry: boolean;
    phoneNumber: string;
    memberId: string;
    notMember: boolean;
    userId: string;
    excelFilePath: string;
    joinDate: string;
    expiryYears: string;
    invoiceId: string;
    keyword: string;
    invoiceList: PaymentRecordAllInvoice[];
    filteredInvoiceList: PaymentRecordAllInvoice[];
}
interface PaymentHistoryAdminProps {
    loginMetadata: LoginMetadata;
    setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class PaymentHistoryAdminByMember extends React.Component<PaymentHistoryAdminProps, PaymentHistoryAdminStates> {
    static Page: string;
    constructor(props: PaymentHistoryAdminProps) {
        super(props);
        this.state = {
            PaymentHistoryRecord: [],
            showloading: false,
            showMemberEntry: true,
            phoneNumber: "",
            memberId: "",
            notMember: false,
            userId: "",
            excelFilePath: "",
            joinDate: "",
            expiryYears: "",
            invoiceId: "",
            keyword: "",
            invoiceList: [],
            filteredInvoiceList: [],
        };
    }
  //   componentDidMount() {
  //    if(this.props.loginMetadata.chapterId==82){
  //     this.downloadData()
  //    }

  //   }
  //   downloadData() {
  //   this.setState({ showloading: true });
  //   return DownloadPaymentInExcelServices.GetMemberDashboard(
  //     this.props.loginMetadata,
  //     true
  //   )
  //     .then((response: any) => {
  //       this.setState({excelFilePath: response.path,showloading: false });
  //     })
  //     .catch((error) => {
  //       this.setState({ showloading: false });
  //     });
  // }
  
    paymentData() {
        PaymentService.paymentHistoryServiceForAdminByMember(
            this.props.loginMetadata,
            true,
            this.state.userId
        )
            .then((response: any) => {
                this.setState({ PaymentHistoryRecord: response.paymentRecord,joinDate: response.joinDate, expiryYears: response.expiryYears, showloading: false })
            })
            .catch(() => {
                this.setState({ showloading: false })
            })
    }
    paymentDatabyInvoice() {
      PaymentService.paymentServiceForAdminByInvoice(
        this.props.loginMetadata,
        true,
        this.state.invoiceId
      )
      .then((response: any) => {
          this.setState({ PaymentHistoryRecord: response.paymentRecord, showloading: false })
      })
      .catch(() => {
          this.setState({ showloading: false })
      })
    }
    paymentDataAllInvoice(forceRefresh: boolean) {
      this.setState({ invoiceList: [], showloading: true, showMemberEntry: false });
      PaymentService.paymentAllInvoices(
        this.props.loginMetadata,
        forceRefresh,
        this.state.keyword
      )
      .then((response: PaymentRecordResponse) => {
          this.setState({ invoiceList: response.paymentRecord, showloading: false })
      })
      .catch(() => {
      })
    }
    render() {
        if (this.state.showloading) {
            return (
                <IonPage>
                    <HeaderToolbar
                        refreshPage={() => { }}
                        previousPage={() => { }}
                        showBackButton={false}
                        showRefreshButton={false}
                    />
                    <IonContent>
                        <Loading />
                    </IonContent>
                </IonPage>
            );
        }
        else if(this.state.showMemberEntry)
        {
            return(
                <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <IonGrid className="ContentCenters limitContent">
              <IonSegment mode ="md" className="colorSeg">
                <IonCardHeader>
                  <IonCardTitle className="loginHeader">
                    Fetch Invoice
                  </IonCardTitle>
                </IonCardHeader>
              </IonSegment>
              {/* <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonImg src={flag}></IonImg>
                    <IonLabel className="ion-padding-start" color="dark">
                      +91
                    </IonLabel>
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={10}
                      value={this.state.phoneNumber}
                      placeholder="Enter mobile number"
                      onIonChange={(e) => this.onPhoneNumberChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.phoneNumber === "" ? true : false}
                      onClick={() => {
                        this.setState({ phoneNumber: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md">OR</IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={5}
                      value={this.state.memberId}
                      placeholder="Enter 5 digits Member Id"
                      onIonChange={(e) => this.onMemberIdChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.memberId === "" ? true : false}
                      onClick={() => {
                        this.setState({ memberId: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md">OR</IonSegment> */}
              <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={20}
                      value={this.state.invoiceId}
                      placeholder="Enter Invoice Id"
                      onIonChange={(e) => this.onInvoiceIdChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.invoiceId === "" ? true : false}
                      onClick={() => {
                        this.setState({ invoiceId: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md">OR</IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={50}
                      value={this.state.keyword}
                      placeholder="Enter Keyword"
                      onIonChange={(e) => this.onKeywordChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.keyword === "" ? true : false}
                      onClick={() => {
                        this.setState({ keyword: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonButton
                  type="submit"
                  expand="block"
                  className="basicbutton SendOTPButton"
                  disabled={!this.isPhoneNumberValid()}
                  onClick={(event) => this.state.keyword != "" ? this.paymentDataAllInvoice(true) : (this.state.invoiceId != "" ? this.getInvoiceData() :
                    this.getMemberProfile(
                      this.state.phoneNumber,
                      this.state.memberId
                    )
                  )
                  }
                >
                  Submit
                </IonButton>
                {/* {this.props.loginMetadata.chapterId==82?<IonButton className="basicbutton SendOTPButton" href={this.state.excelFilePath}>Download Invoice in Excel</IonButton>:''} */}
                
              </IonSegment>
            </IonGrid>
            <IonAlert
              isOpen={this.state.notMember}
              message={"Not a valid Phone Number/MemberId"}
              buttons={[{ text: "Ok", role: "cancel" }]}
            />
          </IonContent>
        </IonPage>
            );
        }
        else {
          if(this.state.invoiceId != "")
          {
            if (this.state.showloading) {
              return (
                  <IonPage>
                      <HeaderToolbar
                          refreshPage={() => { }}
                          previousPage={() => { }}
                          showBackButton={false}
                          showRefreshButton={false}
                      />
                      <IonContent>
                          <Loading />
                      </IonContent>
                  </IonPage>
              );
          }
            return(
              <IonPage>
                <HeaderToolbar
                        refreshPage={() => { }}
                        previousPage={() => {this.setState({showMemberEntry:true}) }}
                        showBackButton={true}
                        showRefreshButton={false}
                    />
                    <IonContent>
                    <IonGrid className="limitContent">
                    <IonList>
                                    {this.state.PaymentHistoryRecord.map((paymentList: any) => {
                                        return (
                                            <IonCard className="payGrid" key={paymentList.DateTime}>
                                                <IonGrid className="payCard">
                                                    <IonRow>
                                                        <IonCol size="7" className="payDivide">
                                                            <IonRow className="payReason">
                                                                {paymentList.PaymentReason}
                                                            </IonRow>
                                                            <IonRow className="payMode">
                                                                {paymentList.PaymentMode}
                                                            </IonRow>
                                                        </IonCol>
                                                        <IonCol size="4.5" class="ion-text-end payAmount">
                                                            {paymentList.Total}
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow className="no-padding">
                                                        <IonCol size="7" className="payDivide payTime" class="ion-no-padding">
                                                        {paymentList.DateTime}
                                                        </IonCol>
                                                        <IonCol size="4.5" class="ion-no-padding ion-text-end">
                                                            <IonRouterLink
                                                                href={paymentList.InvoicePath}
                                                                className="payContent"
                                                            >
                                                                Download Invoice
                                                            </IonRouterLink>
                                                        </IonCol>
                                                    </IonRow>
                                                    {/* <IonRow className="no-padding payDivide payTime">
                                                        Payment by &nbsp;<strong>{paymentList.AdminName}</strong>&nbsp; of chapter &nbsp;<strong>{paymentList.ChapterName}</strong>
                                                    </IonRow> */}
                                                </IonGrid>
                                            </IonCard>
                                        );
                                    })}
                                </IonList>
                                </IonGrid>
                                </IonContent>
              </IonPage>
            )
          }
          else if (this.state.keyword != "")
          {
            if (this.state.showloading) {
              return (
                  <IonPage>
                      <HeaderToolbar
                          refreshPage={() => { }}
                          previousPage={() => { }}
                          showBackButton={false}
                          showRefreshButton={false}
                      />
                      <IonContent>
                          <Loading />
                      </IonContent>
                  </IonPage>
              );
          }
            return(
              <IonPage>
                <HeaderToolbar
          refreshPage={() => { }}
          previousPage={() => {this.setState({showMemberEntry:true, invoiceList: []}) }}
          showBackButton={true}
          showRefreshButton={false}
        />
                <PaymentInvoiceFiltered filteredList={this.state.invoiceList} loginMetadata={this.props.loginMetadata} ></PaymentInvoiceFiltered>
              </IonPage>)
            }
          else {
            return (
                <IonPage>
                    <HeaderToolbar
                        refreshPage={() => { }}
                        previousPage={() => {this.setState({showMemberEntry:true}) }}
                        showBackButton={true}
                        showRefreshButton={false}
                    />
                     <IonContent>
                     <IonSegment mode ="md" className="payHead">Payment History</IonSegment>
                    <IonCard class="limitContent" style={{marginTop:20}}>
                        <IonGrid class="limitContent">
                            <IonSegment mode ="md" className="payReason">
                                <IonLabel  className="payMode">Membership Join Date</IonLabel>
                                :&nbsp;&nbsp;<IonLabel>{this.state.joinDate}</IonLabel>
                            </IonSegment>
                            <IonSegment mode ="md">
                              Membership Paid for following Years
                            </IonSegment>
                              {this.state.expiryYears.split(",").map((value,index)=>{
                                return(
                                  <IonSegment mode ="md" key={index}>
                                    <IonLabel  className="payMode">{index + 1}</IonLabel>{". "}{parseInt(value)-1}{"-"}{parseInt(value)%100}
                                  </IonSegment>
                                )
                              })}
                              <IonSegment mode ="md">
                              Check old admin panel for payment details and invoices of above FY 
                              </IonSegment>
                        </IonGrid>
                     </IonCard>
                    {this.state.PaymentHistoryRecord.length == 0 ?
                            <IonGrid class="limitContent noDue">
                                No Payment Made till Now on this Portal
                            </IonGrid>
                         :
                            <IonGrid className="limitContent">
                                
                                
                                <IonList>
                                    {this.state.PaymentHistoryRecord.map((paymentList: any) => {
                                        return (
                                            <IonCard className="payGrid" key={paymentList.DateTime}>
                                                <IonGrid className="payCard">
                                                    <IonRow>
                                                        <IonCol size="7" className="payDivide">
                                                            <IonRow className="payReason">
                                                                {paymentList.PaymentReason}
                                                            </IonRow>
                                                            <IonRow className="payMode">
                                                                {paymentList.PaymentMode}
                                                            </IonRow>
                                                        </IonCol>
                                                        <IonCol size="4.5" class="ion-text-end payAmount">
                                                            {paymentList.Total}
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow className="no-padding">
                                                        <IonCol size="7" className="payDivide payTime" class="ion-no-padding">
                                                        {paymentList.DateTime}
                                                        </IonCol>
                                                        <IonCol size="4.5" class="ion-no-padding ion-text-end">
                                                            <IonRouterLink
                                                                href={paymentList.InvoicePath}
                                                                className="payContent"
                                                            >
                                                                Download Invoice
                                                            </IonRouterLink>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow className="no-padding payDivide payTime">
                                                        Payment by &nbsp;<strong>{paymentList.AdminName}</strong>&nbsp; of chapter &nbsp;<strong>{paymentList.ChapterName}</strong>
                                                    </IonRow>
                                                </IonGrid>
                                            </IonCard>
                                        );
                                    })}
                                </IonList>

                            </IonGrid>}
                            </IonContent>


                </IonPage>

            );
                                  }
        }
    }
    public onPhoneNumberChange(event: any) {
        this.setState({ phoneNumber: event.target.value });
      }
      public onMemberIdChange(event: any) {
        this.setState({ memberId: event.target.value });
      }
      public onInvoiceIdChange(event: any) {
        this.setState({ invoiceId: event.target.value });
      }
      public onKeywordChange(event: any) {
        this.setState({ keyword: event.target.value });
      }
    protected getMemberProfile(phoneNumber: string, memberId: string) {
      this.setState({showloading:true});
        MembershipService.getMembershipProfile(this.props.loginMetadata, true, {
          phoneNumber: phoneNumber,
          memberId: memberId,
        })
          .then((response: MembershipProfileModel) => {
            // debugger;
            if((this.props.loginMetadata.chapterId != 82 && response.chapterId != this.props.loginMetadata.chapterId) || response.chapterId === -1)
            {
                this.setState({notMember:true, showloading:false})
            }
            else
            {
                this.setState({notMember:false, showMemberEntry:false, userId: response.id.toString()})
                this.paymentData();
                
            }
          })
          .catch(() => {});
      }
      getInvoiceData() {
        this.setState({showloading:true});
        this.setState({showMemberEntry:false})
        this.paymentDatabyInvoice();
      }

      // getAllInvoice() {
      //   console.log(this.state.keyword.toLowerCase())
      //   this.setState({showMemberEntry:false})
      //   this.setState({
      //     filteredInvoiceList: this.state.invoiceList.filter((val) => {
      //       if (val.AdminName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       } else if (val.Total.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.PhoneNumber.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.MembershipId.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.ChapterName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.InvoiceId.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.PaymentMode.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.PaymentReason.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //       else if (val.GSTIN.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) {
      //         return val
      //       }
      //     })
      //   })
      //   console.log(this.state.filteredInvoiceList)
      // }
      
    public isPhoneNumberValid(): boolean {
        let phoneNumber = this.state.phoneNumber;
    
        if (phoneNumber.length === 10) return true;
        if (this.state.memberId.length === 5) return true;
        if (this.state.invoiceId.length != 0) return true;
        if (this.state.keyword.length != 0) return true;
        return false;
      }
}

export default PaymentHistoryAdminByMember;
