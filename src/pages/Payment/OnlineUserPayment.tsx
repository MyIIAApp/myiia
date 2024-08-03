import {
    IonContent,
    IonPage,
    IonCard,
    IonBadge,
    IonRow,
    IonCol,
    IonAlert,
    IonButton,
    IonCardHeader,
    IonSearchbar,
    IonSpinner,
  } from "@ionic/react";
  import React from "react";
  import "../../styles/Payment.css";
  import HeaderToolbar from "../../components/HeaderToolbar";
  import { LoginMetadata } from "../../models/LoginMetadata";
  import Loading from "../../components/Loading";
  import { PaymentService } from "../../services/PaymentService";
  import { saveAs } from 'file-saver';
  interface OnlinePaymentStates {
    subPage: number;
    userPayment:any[];
    showAlert2:boolean;
    alertMessage:string;
    btndisable:boolean;
    temppayment:any[];
    query:string;
    searchActionbtn:boolean;
    alertMessage2:string;
    showAlert:boolean;

    index1:any;
    item1:any;
  }
  interface OnlinePaymentProps {
    loginMetadata: LoginMetadata;
    changePage: (value: string) => void;
  }
  
  class OnlineUserPayment extends React.Component<OnlinePaymentProps, OnlinePaymentStates> {
    constructor(props: OnlinePaymentProps) {
      super(props);
      this.state = {
        subPage: 0,
        searchActionbtn:true,
        userPayment:[],
        showAlert2:false,
        alertMessage:'',
        btndisable:false,
        temppayment:[],
        query:'',
        alertMessage2:'Are you Sure? This action is not reversible',
        showAlert:false,
        index1:'',
        item1:''
      };
    }
    componentDidMount() {
        this.getOnlineUserpayment();
    }

    stopReload(){
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    removeListReload() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('keydown', this.handleKeyDown);  
    }

    handleBeforeUnload = (event) => {
        event.preventDefault();
      };
    
    
    handleKeyDown = (event:KeyboardEvent) => {
        if ((event.key === 'r' && event.ctrlKey) || event.key === 'F5' || (event.key === 'F5' && event.ctrlKey)) {
            event.preventDefault();
        }
    };

   async getOnlineUserpayment(){
    const response = await fetch('https://iiaonline.in/new_payment/getUserPayment.php')
    const result = await response.json();
    if(result['record']!='null'){
        this.setState({searchActionbtn:false});
    }
    this.setState({userPayment:result['record'],temppayment:result['record']});
   }

   resetpayment(){
    this.setState({userPayment:this.state.temppayment});
   }

   handleInput = (event: CustomEvent) => {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.setState({query:query});
    const regex = new RegExp(query, 'i');
    const results = this.state.temppayment.filter(obj => regex.test(obj.unitname) || regex.test(obj.gstin));
    if (results.length === 0) {
        results[0]='null';
      this.setState({ userPayment: results});
    } else {
      this.setState({ userPayment: results });
    }
  };
  
    render() {
        return (
            <IonPage>
                <HeaderToolbar
                refreshPage={() => {}}
                previousPage={() => this.returnToHomePage()}
                showBackButton={this.state.subPage == 0 ? false : true}
                showRefreshButton={false}
                />
                 <IonRow className="userpayContainter">
                    <IonCol size="12">
                        <IonSearchbar 
                        value={this.state.query} 
                        placeholder="Search unit name or GSTIN" 
                        debounce={1000} 
                        disabled={
                            this.state.searchActionbtn 
                            || this.state.btndisable
                        }
                        onIonInput={(ev) => this.handleInput(ev)}
                        onIonCancel = {()=>this.resetpayment()}
                        ></IonSearchbar>
                    </IonCol>
                 </IonRow>
               

                <IonContent>
                    <IonRow className="userpayContainter">
                            {
                                ((this.state.userPayment[0]!='null' && this.state.userPayment.length>0))?
                                <IonCol size="12">
                                    {
                                    this.state.userPayment.map((item:any,index)=>{
                                        return (
                                            <IonCard class="payolineCard">
                                                <IonCardHeader>
                                                    <div className="onlineUd">
                                                            <p><span>GSTIN - </span> {item.gstin}</p>
                                                            <p><span>Unitname - </span> {item.unitname}</p>
                                                            <p><span>MemberId - </span> {item.userdetail.membershipId}</p>
                                                            <p><span>Name - </span> {item.userdetail.firstName} {item.userdetail.lastName}</p>
                                                            <p><span>Chapter Name - </span> {item.userdetail.chapterName}</p>
                                                            <p><span>Total Amount - </span> {item.totalamt}</p>
                                                          <p><span>Created datetime - </span> {item.createdate}</p>
                                                        <div className="actionbtn">
                                                            <div>
                                                                <IonButton
                                                                    disabled={this.state.btndisable} 
                                                                    onClick={()=>this.showAlertBox(index,item)}>
                                                                    Generate Invoice
                                                                </IonButton>
                                                            </div>
                                                            <div>
                                                                {
                                                                    (item.loading) ? 
                                                                    <div className="loadingspinner">
                                                                        <span>Processing please wait... </span>
                                                                        <IonSpinner name="lines"></IonSpinner>
                                                                    </div>:null
                                                                }
                                                                {
                                                                    (item.errorStatus) ? 
                                                                        <IonBadge color="warning">Failed</IonBadge>
                                                                    :null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </IonCardHeader>
                                            </IonCard>
                                        )
                                    })
                                }
                                </IonCol>:
                                (this.state.userPayment[0]=='null') ? 
                                    <IonCol size="12"><h3 style={{textAlign:'center'}}>No Payment</h3> </IonCol>
                                :<Loading/>
                            }
                    </IonRow>

                    <IonAlert
                        isOpen={this.state.showAlert2}
                        onDidDismiss={() => this.setState({ showAlert2: false })}
                        message={this.state.alertMessage}
                    />

                    <IonAlert
                    cssClass="limitContent backdrop"
                    backdropDismiss={false}
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({ showAlert: false })}
                    header={this.state.alertMessage2}
                    buttons={[
                        { text: "Cancel", role: "cancel" },
                        {
                        text: "Yes",
                        handler: (e) => {
                            this.createInvoice(this.state.index1,this.state.item1)
                        },
                        },
                    ]}
                    />

                </IonContent>
            </IonPage>
        );
    }   

    returnToHomePage() {
        let prevsubPage = this.state.subPage - 1;
        if (prevsubPage > 0) {
          this.setState({ subPage: prevsubPage });
        } else {
          this.setState({ subPage: 0 });
        }
    }

    invoiceSuccess(userPaymentCopy,index){
        let newarr = userPaymentCopy.filter((item,ind)=>{
            return ind!=index;
        })
        this.setState({showAlert2:true,alertMessage:'Invoice generated successfully'});
        setTimeout(() => {  
            this.setState({ userPayment: newarr})
            if(this.state.userPayment.length==0){
                userPaymentCopy[0]="null";
                this.setState({ userPayment: userPaymentCopy,btndisable:true})
            }
        }, 2000);
    }

    invoiceNotSuccess(data,userPaymentCopy,index){
        let messages=`<p>E-invoice error!!</p>`;
        if(data.Error){
        data.Error.map((item,index)=>{
            messages = messages + `<p>${index+1}-${item.ErrorMessage}</p>`;
            })
        }
        userPaymentCopy[index] = { ...userPaymentCopy[index],loading: false,errorStatus:true};
        this.setState({
        showAlert2: true,
        alertMessage: messages,
        userPayment: userPaymentCopy,
        btndisable:false,
        });
    }

    async createInvoice(index,item1){
        const userPaymentCopy = [...this.state.userPayment];
        userPaymentCopy[index] = { ...userPaymentCopy[index],loading: true,errorStatus:false };
        this.setState({ userPayment: userPaymentCopy,btndisable:true});
        let loginMetadata = this.props.loginMetadata;
        this.stopReload();
        PaymentService.OnlinePaymentInvoice(item1,loginMetadata).then(res=>{
            let data = (JSON.parse(res.response));
            if(res.status==1){
                userPaymentCopy[index] = { ...userPaymentCopy[index],loading: false };
                this.setState({btndisable:false});
                this.invoiceSuccess(userPaymentCopy,index);
                this.fetchInvoice(res.invoiceId)
            }else{
               this.invoiceNotSuccess(data,userPaymentCopy,index);
            }
            this.removeListReload();
           
        }).catch(()=>{
            userPaymentCopy[index] = { ...userPaymentCopy[index],loading: false,errorStatus:true};
            this.setState({ userPayment: userPaymentCopy, btndisable:false});
        })
    }

    async fetchInvoice(invoiceNo){
        let data = {
          invoiceId:invoiceNo
        };
        const response  = await fetch(`https://iiaonline.in/newapi_iia/recordpaymentinvoice.php`,{
          method:"POST",
          body:JSON.stringify(data)
        });
        const result = await response.blob();
        saveAs(result,`${invoiceNo}.pdf`);
    }
    
    showAlertBox(index,item){
        this.setState({index1:index,item1:item,showAlert:true});
    }
}
  
export default OnlineUserPayment;
