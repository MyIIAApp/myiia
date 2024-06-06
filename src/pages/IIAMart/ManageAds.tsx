import {
    IonContent,
    IonPage,
    IonSegment,
    IonGrid,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonDatetime,
    IonRow,
    IonCol,
    IonImg,
    IonToggle,
    IonButton,
    IonIcon,
    IonInput,
    IonPopover,
    IonToast
  } from "@ionic/react";
  import React from "react";
  import {
    ImageExtensions,
    ItemPhotoDirectory,
  } from "../../constants/FileUploadConstants";
  import { closeCircleOutline } from "ionicons/icons";
  import HeaderToolbar from "../../components/HeaderToolbar";
  import "../../styles/IIAMart.css";
  import Edit from "../../images/Edit.svg";
  import { LoginMetadata } from "../../models/LoginMetadata";
  import { items } from "../../models/IIAMart/items";
  import FileUpload from "../../components/FileUpload";
  interface ImageAds{
    id:number;
    adsImage:string;
    startdate:string;
    enddate:string;
    memberid:string;
  }
  interface EnquiryStates {
    subPage: number;
    PhotoPath:string;
    disabled:boolean;
    filename:string;
    adsImages:any[];
    startDate:string;
    endDate:string;
    memberId:string;
    alertstatus:boolean;
    alertMessage:string;
    showPop:boolean;
    editornot:boolean;
    ImgSrc:string;
    editId:string;
    currentdate:string;
    imageError:string;
  }
  interface EnquiryProps {
    loginMetadata: LoginMetadata;
    changePage: (value: string) => void;
  }
  
  class EnquiryStatus extends React.Component<EnquiryProps, EnquiryStates> {
    constructor(props: EnquiryProps) {
      super(props);
      this.state = {
        subPage: 0,
        PhotoPath:'',
        disabled:true,
        filename:'',
        adsImages:[],
        startDate:'',
        endDate:'',
        memberId:'',
        alertstatus:false,
        alertMessage:'',
        showPop:false,
        editornot:false,
        ImgSrc:'',
        editId:'',
        currentdate:'',
        imageError:''
      };
    }
    componentDidMount() {
    this.getCurrentdate();
      this.getAdsdata();
    }

    getCurrentdate(){
        let date = new Date();
        let formattedDate = date.toISOString().split('T')[0];
        this.setState({currentdate:formattedDate})
    }
    async getAdsdata(){
        const response = await fetch('https://iiaonline.in/IIAMart/getMartAds.php');
        const result = await response.json();
        this.setState(prevState => ({
            adsImages: [...result]
        }));
    }
    clearvalue(){
        this.setState({ showPop: false,editornot:false,filename:'',startDate:'',endDate:'',PhotoPath:'',memberId:'',ImgSrc:''})
    }
    render() {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {
            //   this.getdata(true);
            //   this.getSellerItemDetails(true);
            }}
            previousPage={() => this.returnToHomePage()}
            showBackButton={this.state.subPage == 0 ? false : true}
            showRefreshButton={true}
          />

            <IonContent>

                <IonPopover
                    isOpen={this.state.showPop}
                    onDidDismiss={() => this.clearvalue()}
                  >
                     <IonRow>
                    <IonCol size="12" style={{textAlign:'end',paddingBottom:0}}>
                        <span style={{paddingRight:'10px',fontSize:'17px'}} onClick={()=>this.clearvalue()}>X</span>
                    </IonCol>
                    <IonCol style={{paddingTop:0}}>
                    <IonSegment mode ="md">
                        <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem class="basicInput createProductInput">
                        <IonLabel position="floating">MemberId*</IonLabel>
                        <IonInput
                            placeholder="MemberId"
                            inputMode="numeric"
                            value={this.state.memberId}
                            onIonChange={(e)=>this.onMemberIdChange(e)}
                        ></IonInput>
                        </IonItem>
                        </IonCard>
                    </IonSegment>

                    <IonSegment mode="md" className="colorSeg">
                    <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem lines="none" color="secondary">
                        <IonDatetime
                            min={this.state.currentdate}
                            max="2035-06-05"
                            placeholder="Enter Start Date"
                            style={{ color: "black" }}
                            value={this.state.startDate}
                            onIonChange={(e) => this.onStartDateChange(e)}
                        ></IonDatetime>
                        </IonItem>
                    </IonCard>
                    </IonSegment>
                    {/* <IonSegment mode="md">
                    <IonLabel>To</IonLabel>
                    </IonSegment> */}

                    <IonSegment mode="md" className="colorSeg">
                    <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem lines="none" color="secondary">
                        <IonDatetime
                            min={this.state.currentdate}
                            max="2035-06-05"
                            placeholder="Enter End Date"
                            style={{ color: "black" }}
                            value={this.state.endDate}
                            onIonChange={(e) => this.onendDateChange(e)}
                        ></IonDatetime>
                        </IonItem>
                    </IonCard>
                    
                    </IonSegment> 
                    

                    </IonCol >

                    {
                        (this.state.ImgSrc) ? <IonCol size="12">
                            <IonImg src={this.state.ImgSrc} style={{width:'70px',height:'70px',margin:'0 auto'}}></IonImg>
                        </IonCol>:null
                    }
                    
                    
                    <IonCol size="12" style={{textAligh:'center'}}>
                        {
                            (!this.state.PhotoPath) ? 
                                <>
                                <p style={{color:'red',margin:'0',textAlign:'center',fontSize:'12px'}}>Image should be (520 x 300)px</p>
                                <IonSegment mode ="md" class="membershipFileUpload" style={{margin:'0'}}>
                                    <FileUpload
                                    supportedExtensions={ImageExtensions}
                                    loginMetadata={this.props.loginMetadata}
                                    onFileUploaded={(path: string) =>
                                        this.onItemImagePathChange(path)
                                    }
                                    buttonTitle={"Image"}
                                    fileDirectory={ItemPhotoDirectory}
                                    filePath={this.state.PhotoPath}
                                    buttonLabel="Product Photo"
                                    disabled
                                    id="productPhoto"/> 
                                </IonSegment>  
                                </>
                        :<IonButton class="basicButton fileUploadButton" style={{marginLeft:'10%'}}>
                            <IonGrid>
                                <IonRow>
                                <IonCol size="8">
                                    <IonLabel className="ion-text-wrap">
                                    {this.state.filename}
                                    </IonLabel>
                                </IonCol>
                                <IonCol size="4" className="ion-align-self-center">
                                    <IonButton
                                    class="removeButton"
                                    color="danger"
                                    onClick={(e) => this.onRemoveClicked()}
                                    disabled={this.state.disabled}
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
                        }
                        
                    </IonCol>
                    {
                        (this.state.imageError) ?<IonCol size="12">  
                        <IonSegment mode ="md">
                            <p style={{color:'red',margin:'0'}}>{this.state.imageError}</p>
                        </IonSegment>
                    </IonCol> : null
                    }
                    

                    <IonCol size="12">
                        <IonSegment mode ="md">
                            {
                                (this.state.editornot) ? <IonButton style={{margin:'0'}}
                                onClick={()=>this.UpdateMartAds()}
                                disabled = {!this.state.memberId || !this.state.startDate || !this.state.endDate}
                                class="createlistbtn ion-text-wrap">
                                Update
                                </IonButton> :  <IonButton style={{margin:'0'}}
                                    onClick={()=>this.addMartAds()}
                                    disabled = {!this.state.memberId || !this.state.PhotoPath || !this.state.startDate || !this.state.endDate}
                                    class="createlistbtn ion-text-wrap">
                                    Add
                                </IonButton>
                            }
                        </IonSegment>
                    </IonCol>
                </IonRow>
                </IonPopover>

                <IonGrid className="limitContent">
                <IonRow>
                    <IonCol size="12">
                    <IonButton style={{margin:'0',width:'100%'}}
                        onClick={()=>this.setState({showPop:true})}
                        class="createlistbtn ion-text-wrap">
                        Post ads
                    </IonButton>

                    </IonCol>
                </IonRow>
                    
                <IonRow>
                    {
                        this.state.adsImages.map((item:any,index)=>{
                            return (
                                <IonCol size="6">
                                    <IonCard>
                                        <IonImg src={item.adsImage} style={{width:'100%',height:'110px'}}></IonImg>
                                        <IonCardContent style={{padding:'6px',display:'flex'}}>
                                            <button className="listbtn" onClick={()=>this.editAds(item.id,item.memberid,item.startDate,item.enddate,item.adsImage)}>
                                                <IonImg 
                                                    
                                                    src={Edit}
                                                ></IonImg>
                                            </button>
                                            
                                            <div className="activate">
                                                <IonToggle
                                                checked={item.status == 1}
                                                color="success"
                                                slot="start"
                                                onClick={(e)=>this.updateAdsStatus(item.id,item.status,e,index)}
                                                style={{padding:'6px'}}
                                                ></IonToggle>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            )
                        })
                    }
                </IonRow>
                </IonGrid>
                <IonToast
                isOpen={this.state.alertstatus}
                message={this.state.alertMessage}
                duration={4000}
                onDidDismiss={() => this.setState({ alertstatus: false })}
                />

            </IonContent>
  
        </IonPage>
      );
    }   

    async UpdateMartAds(){
        const data:any = {
            id:this.state.editId,
            memberid:this.state.memberId,
            startdate:this.state.startDate,
            enddate:this.state.endDate,
            adsImage:this.state.PhotoPath,
        }
        if(this.state.startDate && this.state.endDate && this.state.memberId){
            const response = await fetch('https://iiaonline.in/IIAMart/updateMartAds.php',{
                method:'POST',
                body:JSON.stringify(data)
            });
            const result = await response.json();
            if(result.status){
                data.id = result.lastid;
                this.getAdsdata();
                this.setState({startDate:'',endDate:'',PhotoPath:'',memberId:'',alertstatus:result.alert,alertMessage:result.message,ImgSrc:''});
                this.clearvalue();
            }else if(!result.status){
                this.setState({imageError:result.error.msg4});
            }
            
        }
    }
    editAds(id,memberid,startDate,enddate,PhotoPath){
        this.setState({editornot:true,showPop:true,memberId:memberid,startDate:startDate,endDate:enddate,filename:PhotoPath,ImgSrc:PhotoPath,editId:id})
    }
    async addMartAds(){
        const data:any = {
            id:'',
            memberid:this.state.memberId,
            startdate:this.state.startDate,
            enddate:this.state.endDate,
            adsImage:this.state.PhotoPath,
            status:1
        }
        if(this.state.PhotoPath && this.state.startDate && this.state.endDate && this.state.memberId){
            const response = await fetch('https://iiaonline.in/IIAMart/martAds.php',{
                method:'POST',
                body:JSON.stringify(data)
            });
            const result = await response.json();
            if(result.status){
                data.id = result.lastid;
                this.getAdsdata();
                this.setState({startDate:'',endDate:'',PhotoPath:'',memberId:'',alertstatus:result.alert,alertMessage:result.message,ImgSrc:''})
                this.clearvalue();
            }
            else if(!result.status){
                this.setState({imageError:result.error.msg4});
            }
        }
    }

    public onStartDateChange(event: any) {
        this.setState({ startDate: event.target.value.split('T')[0] });
        console.log(this.state.startDate);
    }
    public onendDateChange(event: any) {
        this.setState({ endDate: event.target.value.split('T')[0] });
    }

      
    onMemberIdChange(event: any) {
    this.setState({ memberId: event.target.value });
  }
      
    getFilenameFromUrl(url):string {
        const segments = url.split('/');
        const filename = segments.pop();
        const segments2 = filename.split('_');
        const filename2 = segments2.pop();
        return filename2;
      }

    onItemImagePathChange(path: string): void {
        let filename1 = this.getFilenameFromUrl(path);
        this.setState({ PhotoPath: path ,disabled:false,filename:filename1,ImgSrc:path});
    }

    private onRemoveClicked() {
        this.setState({ PhotoPath: "",filename:'',disabled:true ,ImgSrc:'',imageError:''});
    }

    async updateStatus2(id:number,status:number,event:any,index:number){
        const data = {
            id,
            status:(event.target.checked)?1:0
        }
        const response = await fetch('https://iiaonline.in/IIAMart/updateMartAdsStatus.php',{
            method:'POST',
            body:JSON.stringify(data)
        })
        const result = await response.json();
       return result;
    }
    async updateAdsStatus(id:number,status:number,event:any,index:number){
       this.updateStatus2(id,status,event,index).then(res=>{
        this.state.adsImages[index].status = (event.target.checked)?1:0;
       })
    }
 
    returnToHomePage() {
      let prevsubPage = this.state.subPage - 1;
      if (prevsubPage > 0) {
        this.setState({ subPage: prevsubPage });
      } else {
        this.setState({ subPage: 0 });
      }
    }
  
}
  
export default EnquiryStatus;