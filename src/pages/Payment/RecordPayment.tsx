import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSegment,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React from "react";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import { paymentDetails } from "../../models/paymentDetails";
import PaymentInvoice from "./PaymentInvoice";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
const header = {
  header: "Financial Year",
};

interface RecordPaymentStates {
  paymentReason: string;
  paymentMode: string;
  checkNumber: string;
  amount: string;
  showAlert: boolean;
  alertMessage: string;
  showloading: boolean;
  year: any;
  contain: any;
  dashboardObject: paymentDetails;
  showInvoice: boolean;
  showDueClear: boolean;
  chequeDate: string;
  paymentType: string;
  subTotal: string;
  paymentReason2: string;
  notMember: boolean;
  customerPrice:number;
  changeYearLoading:boolean;
  tempFees:any;
  tempPaymentValue:any;
}
interface GSTBLANK {
  status:boolean;
  message:string;
}

interface RecordPaymentProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  phoneNumber: string;
  memberId: string;
  paymentReason: string;
  userId: number;
  userDetails:MembershipProfileModel
}

class RecordPayment extends React.Component<
  RecordPaymentProps,
  RecordPaymentStates
> {
  constructor(props: RecordPaymentProps) {
    super(props);
    this.state = {
      paymentReason: this.props.paymentReason,
      paymentMode: "Cash",
      checkNumber: "",
      amount: "",
      showAlert: false,
      alertMessage: "Are you Sure? This action is not reversible",
      showloading: true,
      year: [],
      contain: {},
      dashboardObject: new paymentDetails(),
      showInvoice: false,
      showDueClear: false,
      chequeDate: "",
      paymentType: "Default",
      subTotal: "",
      paymentReason2: "",
      notMember: false,
      customerPrice:0,
      changeYearLoading:false,
      tempFees:'',
      tempPaymentValue:''
    };
  }
  async updateGSTtoBLANK():Promise<GSTBLANK>{
    let obj={
      userid:this.props.userDetails.id,
      phone:this.props.userDetails.PhoneNumber,
    };
    const response  = await fetch('https://iiaonline.in/updateGSTToBlank.php',{
      method:"POST",
      body:JSON.stringify(obj)
    }).then(res=>{
      return res.json();
    })
    .catch(err=>{
      console.log(err);
    })
    return response;
  }

  async paymentDetailsNewPrice(userdetails:any):Promise<any>{
    const data = {
      ...userdetails,
      ...this.state.contain
    }
    const response = await fetch('https://iiaonline.in/newapi_iia/getPaymentdetail_testig.php',{
      method:"POST",
      body:JSON.stringify(data)
    })
    .then(res=>{
      return res.json();
    })
    return response;
  }

  async getAmtOnYears(){
    try{
      let response = await this.paymentDetailsNewPrice(this.props.userDetails);
      this.setState({
        dashboardObject: response,
        changeYearLoading:false,
        tempPaymentValue:response
      })
    }
    catch(err){
      this.setState({
        changeYearLoading:false,
      })
    }
  }

  async getCurrentTime(){
    const response = await fetch('https://iiaonline.in/newapi_iia/getCustomeAmt.php');
    const result = await response.json();
    this.setState({ customerPrice: result });
  }

  updatePaymentType(e){
    this.setState({ paymentType: e.detail.value });
    if(e.detail.value == "Default"){
      this.setState({dashboardObject:this.state.tempPaymentValue})
    }
  }


  componentDidMount() {
    this.getCurrentTime();
    this.updateGSTtoBLANK().then(res=>{
      if(res.status){
        let paymentDetailPromise = this.paymentDetailsNewPrice(this.props.userDetails);
        // let paymentDetailPromise = PaymentService.paymentDetailService(
        //   this.props.loginMetadata,
        //   true,
        //   this.props.userId
        // );
        let financialPromise = PaymentService.GetMissingMembershipYears(
          this.props.loginMetadata,
          false,
          this.props.phoneNumber,
          this.props.memberId,
          this.props.userId
        );
        Promise.all([paymentDetailPromise, financialPromise]).then(
          (result: any[]) => {
           
            if (result[1].length == 0) {
              this.setState({ showDueClear: true, showloading: false });
            }
            if (result[1].message == "Not a Member") {
              this.setState({ notMember: true, showloading: false });
            } else {
              this.setState({
                dashboardObject: result[0],
                year: result[1],
                showloading: false,
                tempPaymentValue:result[0],
              });
              this.setState({ contain: this.state.year[0] });
            }
          }
        );
      }
    })
   
  }

 

  render() {
    var curr = new Date();
    if (this.state.showloading) {
      return (
        <IonContent>
          <Loading />
        </IonContent>
      );
    } else if (this.state.showInvoice) {
      return (
        <IonContent>
          <PaymentInvoice
            loginMetadata={this.props.loginMetadata}
            setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
              this.props.setLoginStateFunction(loginMetadata)
            }
            userId={this.props.userId}
            paymentMode={this.state.paymentMode}
            paymentMade="paid"
            chequeNumber={
              this.state.paymentMode == "Cash"
                ? ""
                : this.state.checkNumber + "$%#" + this.state.chequeDate
            }
            startYear={
              this.state.paymentReason == "Membership"
                ? this.state.contain.startYear
                : curr.getMonth() < 3
                ? (curr.getFullYear() - 1).toString()
                : curr.getFullYear().toString()
            }
            expiryYear={
              this.state.paymentReason == "Membership"
                ? this.state.contain.expiryYear
                : curr.getMonth() < 3
                ? curr.getFullYear().toString()
                : (curr.getFullYear() + 1).toString()
            }
            paymentType={this.state.paymentType}
            subTotal={this.state.subTotal}
            paymentReason={this.state.paymentReason}
            paymentReason2={this.state.paymentReason2}
            userdetails={this.props.userDetails}
            dashboardobj={this.state.dashboardObject}
          />
        </IonContent>
      );
    } else if (this.state.notMember) {
      return (
        <IonContent>
          <IonGrid class="limitContent noDue">Not a Member</IonGrid>
        </IonContent>
      );
    } else {
      return (
        <IonContent>
          <IonSegment mode="md" color="light">
            <span className="paymentHeader ion-padding ion-margin">
              Pay Details
            </span>
          </IonSegment>
          <IonGrid className="limitContent">
            <IonItem class="basicInput membershipProfileInput posi">
              <IonLabel position="floating" color="primary">
                Payment Reason
              </IonLabel>
              <IonSelect
                value={this.state.paymentReason}
                placeholder="Payment Reason"
                onIonChange={(e) => {
                  if (e.detail.value == "Non-Membership") {
                    this.setState({ paymentType: "Custom" });
                  } else {
                    this.setState({ paymentType: "Default" });
                  }
                  this.setState({ paymentReason: e.detail.value });
                }}
              >
                <IonSelectOption value="Membership" defaultChecked>
                  Membership
                </IonSelectOption>
                <IonSelectOption value="Non-Membership">
                  Non-Membership
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            {this.state.paymentReason == "Membership" ? (
              this.state.showDueClear ? (
                <IonGrid class="limitContent noDue">No Due</IonGrid>
              ) : (
                <IonGrid>
                  <IonItem class="basicInput membershipProfileInput posi">
                    <IonLabel position="floating" color="primary">
                      Payment Type
                    </IonLabel>
                    <IonSelect
                      value={this.state.paymentType}
                      placeholder="Payment Type"
                      onIonChange={(e) =>
                        this.updatePaymentType(e)
                      }
                    >
                      <IonSelectOption value="Default" defaultChecked>
                        Default
                      </IonSelectOption>
                      <IonSelectOption value="Custom">Custom</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem class="basicInput membershipProfileInput posi">
                    <IonLabel position="floating" color="primary">
                      Financial Year
                    </IonLabel>
                    <IonSelect
                      value={this.state.contain}
                      okText="Okay"
                      cancelText="Cancel"
                      onIonChange={(e) => this.onCategoryChange(e)}
                    >
                      {this.state.year.map((Year: any) => {
                        return (
                          <IonSelectOption value={Year}>
                            {Year.startYear}-{Year.expiryYear % 100}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                  <IonItem class="basicInput membershipProfileInput posi">
                    <IonLabel position="floating" color="primary">
                      Payment Mode
                    </IonLabel>

                    <IonSelect
                      name="Payment"
                      value={this.state.paymentMode}
                      onIonChange={(e) => (
                        this.setState({ paymentMode: e.detail.value }),
                        e.detail.value === "Cash" ? (
                          this.setState({ checkNumber: "" })
                        ) : (
                          <span className="y">""</span>
                        )
                      )}
                    >
                      <IonSelectOption value="Cash">Cash</IonSelectOption>
                      <IonSelectOption value="Cheque">
                        Cheque/DD
                      </IonSelectOption>
                      <IonSelectOption value="NEFT">NEFT/UTR</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem
                    hidden={this.state.paymentMode === "Cash" ? true : false}
                    className="basicInput membershipProfileInput posi"
                  >
                    <IonInput
                      hidden={this.state.paymentMode === "Cash" ? true : false}
                      disabled={
                        this.state.paymentMode === "Cash" ? true : false
                      }
                      type="text"
                      clearInput={true}
                      className="ion-padding selectClass"
                      value={this.state.checkNumber}
                      placeholder={
                        this.state.paymentMode === "Cheque"
                          ? "Cheque/DD Number*"
                          : "NEFT/UTR Number*"
                      }
                      required={true}
                      onIonChange={(e) => this.onChecknumberInput(e)}
                    ></IonInput>
                  </IonItem>
                  <IonItem
                    hidden={this.state.paymentMode === "Cash" ? true : false}
                    className="basicInput membershipProfileInput posi"
                  >
                    <IonDatetime
                      placeholder={
                        this.state.paymentMode === "Cheque"
                          ? "Enter Cheque Date"
                          : "Enter NEFT Date"
                      }
                      style={{ color: "black" }}
                      value={this.state.chequeDate}
                      onIonChange={(e) => this.onendDateChange(e)}
                    ></IonDatetime>
                  </IonItem>
                  {this.state.paymentType == "Custom" ? (
                    <IonItem class="basicInput membershipProfileInput">
                      <IonLabel position="floating" class="selectDisabled">
                        Amount*
                      </IonLabel>
                      <IonInput
                        placeholder="Amount"
                        name="Amount"
                        value={this.state.subTotal}
                        required={true}
                        onIonChange={(e) => {
                          this.updateAmtIndash(e)
                        }}
                      ></IonInput>
                    </IonItem>
                  ) : null}
                  <IonGrid class="calculate">
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        Admission Fee
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.roundFloatCalc(
                          this.state.dashboardObject.admissionFee
                        ) > 0
                          ? this.state.paymentType == "Custom"
                            ? this.state.customerPrice
                            : this.state.dashboardObject.admissionFee
                          : 0}
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        Membership Fee
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.state.paymentType == "Custom"
                          ? this.roundFloatCalc(this.state.subTotal) -
                            (this.roundFloatCalc(
                              this.state.dashboardObject.admissionFee
                            ) > 0
                              ?  this.state.customerPrice
                              : 0)
                          : this.roundFloatCalc(
                              this.state.dashboardObject.membershipFee
                            )}
                      </IonCol>
                    </IonRow>
                    {this.state.dashboardObject.cgst != "0" ? (
                      <IonRow>
                        <IonCol size="8" class="ion-text-start">
                          CGST
                        </IonCol>
                        <IonCol size="4" class="ion-text-end">
                          {this.roundFloatCalc(
                            this.state.dashboardObject.cgst
                          ) > 0
                            ? this.state.paymentType == "Custom"
                              ? this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) /
                                100).toString())
                              : this.state.dashboardObject.cgst
                            : 0}
                        </IonCol>
                      </IonRow>
                    ) : undefined}

                    {this.state.dashboardObject.sgst == "0" ? (
                      <IonRow>
                        <IonCol size="8" class="ion-text-start">
                          IGST
                        </IonCol>
                        <IonCol size="4" class="ion-text-end">
                          {this.roundFloatCalc(
                            this.state.dashboardObject.igst
                          ) > 0
                            ? this.state.paymentType == "Custom"
                              ? (this.roundFloatCalc(((parseFloat(this.state.subTotal) *
                                  18) /
                                100).toString()))
                              : this.state.dashboardObject.igst
                            : 0}
                        </IonCol>
                      </IonRow>
                    ) : (
                      <IonRow>
                        <IonCol size="8" class="ion-text-start">
                          SGST
                        </IonCol>
                        <IonCol size="4" class="ion-text-end">
                          {this.roundFloatCalc(
                            this.state.dashboardObject.sgst
                          ) > 0
                            ? this.state.paymentType == "Custom"
                              ? (this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) /
                                100).toString()))
                              : this.state.dashboardObject.sgst
                            : 0}
                        </IonCol>
                      </IonRow>
                    )}
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        Full Amount
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.state.paymentType == "Custom"
                          ? Math.round(this.roundFloatCalc(
                              (
                                (parseFloat(this.state.subTotal) * 118) /
                                100
                              ).toString()
                            ))
                          : this.state.dashboardObject.igst +
                            this.state.dashboardObject.sgst +
                            this.state.dashboardObject.admissionFee +
                            this.state.dashboardObject.membershipFee +
                            this.state.dashboardObject.cgst}
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  <IonGrid className="Button basicInput membershipProfileInput">
                    <IonButton
                      className="RecordButton"
                      disabled={
                        ((this.state.paymentMode == "Cheque" ||
                          this.state.paymentMode == "NEFT") &&
                          (this.state.checkNumber == "" ||
                            this.state.chequeDate == "")) ||
                        (this.state.paymentType == "Custom" &&
                          this.state.subTotal == "")
                      }
                      onClick={() =>
                        this.setState({
                          showAlert: true,
                        })
                      }
                    >
                      Record Payment
                    </IonButton>
                  </IonGrid>
                </IonGrid>
              )
            ) : undefined}
            {this.state.paymentReason == "Non-Membership" ? (
              // <IonContent>
              <IonGrid>
                <IonItem class="basicInput membershipProfileInput posi">
                  <IonLabel position="floating" color="primary">
                    Payment Mode
                  </IonLabel>

                  <IonSelect
                    name="Payment"
                    value={this.state.paymentMode}
                    onIonChange={(e) => (
                      this.setState({ paymentMode: e.detail.value }),
                      e.detail.value === "Cash" ? (
                        this.setState({ checkNumber: "" })
                      ) : (
                        <span className="y">""</span>
                      )
                    )}
                  >
                    <IonSelectOption value="Cash">Cash</IonSelectOption>
                    <IonSelectOption value="Cheque">Cheque/DD</IonSelectOption>
                    <IonSelectOption value="NEFT">NEFT/UTR</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem
                  hidden={this.state.paymentMode === "Cash" ? true : false}
                  className="basicInput membershipProfileInput posi"
                >
                  <IonInput
                    hidden={this.state.paymentMode === "Cash" ? true : false}
                    disabled={this.state.paymentMode === "Cash" ? true : false}
                    type="text"
                    clearInput={true}
                    className="ion-padding selectClass"
                    value={this.state.checkNumber}
                    placeholder={
                      this.state.paymentMode === "Cheque"
                        ? "Cheque/DD Number*"
                        : "NEFT/UTR Number*"
                    }
                    required={true}
                    onIonChange={(e) => this.onChecknumberInput(e)}
                  ></IonInput>
                </IonItem>
                <IonItem
                  hidden={this.state.paymentMode === "Cash" ? true : false}
                  className="basicInput membershipProfileInput posi"
                >
                  <IonDatetime
                    placeholder={
                      this.state.paymentMode === "Cheque"
                        ? "Enter Cheque Date"
                        : "Enter NEFT Date"
                    }
                    style={{ color: "black" }}
                    value={this.state.chequeDate}
                    onIonChange={(e) => this.onendDateChange(e)}
                  ></IonDatetime>
                </IonItem>
                <IonItem class="basicInput membershipProfileInput">
                  <IonLabel position="floating" class="selectDisabled">
                    Payment Reason*
                  </IonLabel>
                  <IonInput
                    placeholder="Payment Reason"
                    name="Payment Reason"
                    value={this.state.paymentReason2}
                    required={true}
                    onIonChange={(e) => {
                      this.setState({
                        paymentReason2: e.detail.value ? e.detail.value : "",
                      });
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem class="basicInput membershipProfileInput">
                  <IonLabel position="floating" class="selectDisabled">
                    Amount*
                  </IonLabel>
                  <IonInput
                    placeholder="Amount"
                    name="Amount"
                    value={this.state.subTotal}
                    required={true}
                    onIonChange={(e) => {
                      this.updateAmtIndash(e)
                    }}
                  ></IonInput>
                </IonItem>
                <IonGrid class="calculate">
                  <IonRow>
                    <IonCol size="8" class="ion-text-start">
                      Sub Total
                    </IonCol>
                    <IonCol size="4" class="ion-text-end">
                      {this.state.subTotal}
                    </IonCol>
                  </IonRow>
                  {this.state.dashboardObject.cgst != "0" ? (
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        CGST
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.roundFloatCalc(this.state.dashboardObject.cgst) >
                        0
                          ? (this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) / 100).toString()))
                          : 0}
                      </IonCol>
                    </IonRow>
                  ) : undefined}

                  {this.state.dashboardObject.sgst == "0" ? (
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        IGST
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.roundFloatCalc(this.state.dashboardObject.igst) >
                        0
                          ? this.roundFloatCalc(
                              (
                                (parseFloat(this.state.subTotal) * 18) /
                                100
                              ).toString()
                            )
                          : 0}
                      </IonCol>
                    </IonRow>
                  ) : (
                    <IonRow>
                      <IonCol size="8" class="ion-text-start">
                        SGST
                      </IonCol>
                      <IonCol size="4" class="ion-text-end">
                        {this.roundFloatCalc(this.state.dashboardObject.sgst) >
                        0
                          ? this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) / 100).toString())
                          : 0}
                      </IonCol>
                    </IonRow>
                  )}
                  <IonRow>
                    <IonCol size="8" class="ion-text-start">
                      Full Amount
                    </IonCol>
                    <IonCol size="4" class="ion-text-end">
                      {
                        Math.round(this.roundFloatCalc(((parseFloat(this.state.subTotal) * 118) /
                        100).toString()))
                      }
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonGrid className="Button basicInput membershipProfileInput">
                  <IonButton
                    className="RecordButton"
                    disabled={
                      ((this.state.paymentMode == "Cheque" ||
                        this.state.paymentMode == "NEFT") &&
                        (this.state.checkNumber == "" ||
                          this.state.chequeDate == "")) ||
                      (this.state.paymentType == "Custom" &&
                        this.state.subTotal == "") ||
                      this.state.paymentReason2 == ""
                    }
                    onClick={() =>
                      this.setState({
                        showAlert: true,
                      })
                    }
                  >
                    Record Payment
                  </IonButton>
                </IonGrid>
              </IonGrid>
            ) : undefined}

            <IonAlert
              cssClass="limitContent backdrop"
              backdropDismiss={false}
              isOpen={this.state.showAlert}
              onDidDismiss={() => this.setState({ showAlert: false })}
              header={this.state.alertMessage}
              buttons={[
                { text: "Cancel", role: "cancel" },
                {
                  text: "Yes",
                  handler: (e) => {
                    this.setState({ showAlert: false, showInvoice: true });
                  },
                },
              ]}
            />
          </IonGrid>
        </IonContent>
      );
      // } else if (this.state.paymentReason === "Certificate of Origin") {
      //   return (
      //     <IonContent>
      //       <IonGrid className="limitContent">
      //         <IonSegment mode ="md" color="light">
      //           <span className="paymentHeader ion-padding ion-margin">
      //             Pay Details
      //         </span>
      //         </IonSegment>

      //         <IonItem
      //           class="basicInput membershipProfileInput posi"
      //         >
      //           <IonLabel position="floating" color="primary">
      //             Payment Reason
      //           </IonLabel>
      //           <IonSelect
      //             value={this.state.paymentReason}
      //             placeholder="Payment Reason"
      //             onIonChange={(e) =>
      //               this.setState({ paymentReason: e.detail.value })
      //             }
      //           >
      //             <IonSelectOption value="Membership" defaultChecked>
      //               Membership
      //           </IonSelectOption>
      //             <IonSelectOption value="Insurance">Insurance</IonSelectOption>
      //             {/* <IonSelectOption value="Certificate of Origin">
      //               Certificate of Origin
      //           </IonSelectOption> */}
      //             <IonSelectOption value="Other">Other</IonSelectOption>
      //           </IonSelect>
      //         </IonItem>
      //         <IonItem
      //           class="basicInput membershipProfileInput posi"
      //         ><IonLabel
      //           position="floating"
      //           color="primary"
      //         >
      //             Payment Mode
      //           </IonLabel>

      //           <IonSelect
      //             name="Payment"
      //             value={this.state.paymentMode}
      //             onIonChange={(e) => (
      //               this.setState({ paymentMode: e.detail.value }),
      //               e.detail.value === "Cash"
      //                 ? this.setState({ checkNumber: "" })
      //                 : <span className="y">""</span>
      //             )}
      //           >
      //             <IonSelectOption value="Cash">Cash</IonSelectOption>
      //             <IonSelectOption value="Cheque">Cheque/DD</IonSelectOption>
      //           </IonSelect>
      //         </IonItem>

      //         <IonItem
      //           hidden={this.state.paymentMode !== "Cheque" ? true : false}
      //           className="basicInput membershipProfileInput posi"

      //         >
      //           <IonInput
      //             hidden={this.state.paymentMode !== "Cheque" ? true : false}
      //             disabled={this.state.paymentMode === "Cash" ? true : false}
      //             type="text"
      //             clearInput={true}
      //             className="ion-padding selectClass"
      //             value={this.state.checkNumber}
      //             placeholder="Cheque/DD Number*"
      //             required={true}
      //             onIonChange={(e) => this.onChecknumberInput(e)}
      //           ></IonInput>

      //         </IonItem>
      //         <IonItem
      //           hidden={this.state.paymentMode !== "Cheque" ? true : false}
      //           className="basicInput membershipProfileInput posi"

      //         ><IonDatetime
      //         placeholder="Enter End Date"
      //         style={{ color: "black" }}
      //         value={this.state.chequeDate}
      //         onIonChange={(e) => this.onendDateChange(e)}
      //       ></IonDatetime></IonItem>
      //         <IonItem
      //           className="basicInput membershipProfileInput posi"

      //         >
      //           <IonInput
      //             type="text"
      //             clearInput={true}
      //             className="ion-padding selectClass"
      //             value={this.state.amount}
      //             placeholder="Enter the Amount"
      //             required={true}
      //             onIonChange={(e) => this.onAmountInput(e)}
      //           ></IonInput>
      //         </IonItem>
      //         <IonGrid className="Button basicInput membershipProfileInput">
      //           <IonButton className="RecordButton">Record Payment</IonButton>
      //         </IonGrid>
      //       </IonGrid>
      //     </IonContent>
      //   );
      // } else {

      //   return <IonContent>{this.state.paymentReason} no Input</IonContent>;
      // }
    }
  }

  public onendDateChange(event: any) {
    this.setState({ chequeDate: event.target.value });
  }

  onChecknumberInput(event: any) {
    this.setState({ checkNumber: event.target.value });
  }
  onAmountInput(event: any) {
    this.setState({ amount: event.target.value });
  }

  onCategoryChange(event: any) {
    this.setState({ contain: event.target.value,changeYearLoading:true});
    this.getAmtOnYears();
  }

  updateAmtIndash(e){
    let admissionFee = "0";
    let igst = "0";
    let sgst = "0";
    let cgst = "0";
    let membershipFee ="0"

      this.setState({
        subTotal: e.detail.value ? e.detail.value : "",
      });
      console.log(e.detail.value);
      if(this.state.paymentType == 'Custom'){
        let igst2 = this.roundFloatCalc(
          (
            (parseFloat(this.state.subTotal) * 18) /
            100
          ).toString()
        )
        let sgst2 =  this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) / 100).toString())

        let cgst2 = (this.roundFloatCalc(((parseFloat(this.state.subTotal) * 9) / 100).toString()))

        let membershipFee2 = this.roundFloatCalc(this.state.subTotal) -
            (this.roundFloatCalc(
              this.state.dashboardObject.admissionFee
            ) > 0
              ?  this.state.customerPrice
              : 0)
        admissionFee = "0";
        igst = igst2.toString();
        sgst = sgst2.toString();
        cgst = cgst2.toString();
        membershipFee = membershipFee2.toString();
        this.setState(
          { dashboardObject: { igst, sgst, cgst, membershipFee, admissionFee } }
        );
      }
      
  }

  roundFloatDisp(val: string) {
    return parseFloat(val).toFixed(2);
  }
  roundFloatCalc(val: string) {
    return parseFloat(parseFloat(val).toFixed(2));
  }
}

export default RecordPayment;
