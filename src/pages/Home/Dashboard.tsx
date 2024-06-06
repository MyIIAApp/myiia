import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSegment,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MemberDashboard } from "../../models/MemberDashboard/MemberDashboard";
import { MemberDashboardService } from "../../services/MemberDashboardService";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Home.css";
import bullet from "../../images/bullet.svg";
import Loading from "../../components/Loading";
import { StorageService } from "../../services/StorageService";
import { TableContentKey } from "../../constants/StorageConstants";
import GenericTable from "../../components/GenericTable";

interface DashboardStates {
  dashboardObject: MemberDashboard;
  showLoading: boolean;
  afterClick: boolean;
  tableContent: any;
  showDrop:boolean;
  activeMember:any[];
  selectActiveYear:string;
}
interface DashboardProps {
  loginMetadata: LoginMetadata;
}
class Dashboard extends React.Component<DashboardProps, DashboardStates> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      dashboardObject: new MemberDashboard(),
      showLoading: true,
      afterClick: false,
      tableContent: {},
      showDrop:false,
      activeMember:[],
      selectActiveYear:''
    };
  }

  async getActiveMember(){
    const response = await fetch('https://iiaonline.in/newapi_iia/getActiveMember.php');
    const result = await response.json();
    let len = result.length;
    this.setState({selectActiveYear:result[len-1].fyear})
    this.setState({activeMember:result})
  }
  componentDidMount() {
    this.getdata(false);
    this.getActiveMember();
  }

  async getmembershipdata(loginMetadata:LoginMetadata,fyear:string){
    const data = {
      fyear,
      loginMetadata,
    };
    const response = await fetch('https://iiaonline.in/newapi_iia/getmemberhsipdashboard_Test.php',{
      method:'POST',
      body:JSON.stringify(data)
    })
    const result = await response.json();
    this.setState({ dashboardObject: result });
  }

  async getdatanew2(type:string,loginMetadata:any){
    const data = {
      type:type,
      loginMetadata:loginMetadata,
      fyear:this.state.selectActiveYear
    };
    const response = await fetch('https://iiaonline.in/newapi_iia/Financialyearmemberdashboar.php',{
      method:"POST",
      body:JSON.stringify(data)
    })
    .then(res=>{
      return res.json();
    })
    return response;
  }
  selecteActivemember = (e: CustomEvent) => {
    this.setState({ selectActiveYear: e.detail.value });
    this.getmembershipdata(this.props.loginMetadata,this.state.selectActiveYear)
  };
  getnewdata(type:string,loginMetadata:LoginMetadata){  
    this.setState({ showLoading: true });
    this.getdatanew2(type,loginMetadata).then(resp=>{
      this.setState({tableContent: resp,showLoading:false, afterClick: true});
    }).catch(()=>{
      this.setState({showLoading:false});
    }) 
  }
  getdata(refresh: boolean) {
    if(refresh)
    {
      StorageService.KeyList().then((resp)=>{
        resp.forEach(element => {
        if(element.includes(TableContentKey))
        StorageService.Remove(element);
      });})
    }
    MemberDashboardService.GetMemberDashboard(this.props.loginMetadata, refresh,this.state.selectActiveYear)
      .then((response: MemberDashboard) => {
        this.setState({ showLoading: false, dashboardObject: response });
      })
      .catch(() => {
        this.setState({ showLoading: false });
      });
    this.setState({ showLoading: true });
  }
  onClickData(dataType: string, loginMetadata: LoginMetadata){
    this.setState({showLoading: true});
      MemberDashboardService.GetNumberClickedData(loginMetadata, dataType).
      then((resp)=>{
          this.setState({tableContent: resp,showLoading:false, afterClick: true});
      }).catch(()=>{
        this.setState({showLoading:false});
      })
  }


  render() {
    if(this.state.showLoading)
    {
      return(
        <IonPage>
        <HeaderToolbar
          refreshPage={() => { this.getdata(true) }}
          previousPage={() => { }}
          showBackButton={false}
          showRefreshButton={true}
        />
          <IonContent>
            <Loading />
          </IonContent>
          </IonPage>
      );
    }
    if(this.state.afterClick)
    {
      return(
        <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={()=>{this.setState({afterClick:false})}}
          showBackButton={true}
          showRefreshButton={false}
        />
        <GenericTable tableContent={this.state.tableContent.data} columnList={["Membership Id", "Phone Number", "Unit Name", "Address", "Chapter Name", "Annual Turnover", "Email Id", "Profile Status", "Membership Renewal Due Date", "GSTIN"]}
        sizesList={["1","1","1","2","1","1","2","1","1","1"]}
        showDeleteColumn={false}
        showUpdateColumn={false}
        DeleteFunction={()=>{}}
        UpdateFunction={()=>{}}
        keyList={["Membership Id", "Phone Number", "Unit Name", "Address", "Chapter Name", "Annual Turnover", "Email Id", "Profile Status", "Membership Renewal Due Date", "GSTIN"]}
        title= "Membership"
        />
        </IonPage>
      )
    }
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => { this.getdata(true) }}
          previousPage={() => { }}
          showBackButton={false}
          showRefreshButton={true}
        />
          <IonContent>
            <IonSegment mode ="md">
            <IonGrid className="limitContent">
            <IonSegment mode ="md" className="memberCount">
              {this.state.dashboardObject.TotalMembers}
            </IonSegment>
            <IonSegment mode ="md" className="memberCounttext">
              Total IIA Members
              </IonSegment>
            <IonCard className="memberCard">
              <IonGrid>
                <IonRow>
                  <IonSegment mode ="md" className="memberCounthead">
                    Number of Members in {this.props.loginMetadata.chapterName} chapter: &nbsp;
                    <span className="chapterLevel">
                      {this.state.dashboardObject.TotalMembersChapterLevel}
                    </span>

                  </IonSegment>
                </IonRow>
                <IonRow>
                  <IonCol size="9" className="ion-text-start memberContent">
                    <img className="bullet" src={bullet} alt="" />
                  Total Active Members
                      </IonCol>
                  <IonCol size="3" className="ion-text-center membervalue"  onClick={()=>{this.getnewdata("totalActiveMembershipChapterMembers",this.props.loginMetadata)}} style={{textDecoration:"underline"}}>
                    {this.state.dashboardObject.Preyear}
                  </IonCol>
                </IonRow>
                
                
                <IonRow>
                  <IonCol size="9" className="ion-text-start memberContent">
                    <img className="bullet" src={bullet} alt="" />
                    Members under Grace Period
                      </IonCol>
                  <IonCol size="3" className="ion-text-center membervalue" onClick={()=>{this.onClickData("totalGraceMembershipChapterMembers",this.props.loginMetadata)}}  style={{textDecoration:"underline"}}>
                  {this.state.dashboardObject.MembersUnderGracePeriod}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="9" className="ion-text-start memberContent">
                    <img className="bullet" src={bullet} alt="" />
                    Membership Expired
                      </IonCol>
                  <IonCol size="3" className="ion-text-center membervalue" onClick={()=>{this.onClickData("totalExpiredMembershipChapterMembers",this.props.loginMetadata)}} style={{textDecoration:"underline"}}>
                  {this.state.dashboardObject.ExpiredMemberships}
                  </IonCol>
                </IonRow>   
                <IonRow style={{borderTop: '1px solid red'}}>
                      <IonCol size="6" className="ion-text-start memberContent" >
                        <img className="bullet" src={bullet} alt="" />
                        Active Members (Year Wise)
                      </IonCol>

                      <IonCol size="3">
                        <IonSelect style={{padding:'0',color:'red',float:'right'}} 
                          onIonChange={this.selecteActivemember} 
                          value={this.state.selectActiveYear}>
                          {this.state.activeMember.map((item) => (
                            <IonSelectOption key={item.id} value={item.fyear}>
                              {item.fyear}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonCol>

                      <IonCol size="3" className="ion-text-center membervalue"  onClick={()=>{this.getnewdata("totalActiveMembershipChapterMembers1",this.props.loginMetadata)}} style={{textDecoration:"underline"}}>
                        {this.state.dashboardObject.Activemembers}
                      </IonCol>
                </IonRow>                             
              </IonGrid>
            </IonCard>
            <IonSegment mode ="md" className="memberCountContent"  onClick={()=>{this.getnewdata("totalNewlyAddedMembershipChapterMembers",this.props.loginMetadata)}} style={{textDecoration:"underline"}}>
            {this.state.dashboardObject.NewMembers}
            </IonSegment>
            <IonSegment mode ="md" className="memberCounthead">
              New Members Added in current FY
              </IonSegment>
            <IonCard className="memberCard">
              <IonGrid>

                <IonRow>
                  <IonSegment mode ="md" className="memberCounthead">
                    Membership Process
                    </IonSegment>
                </IonRow>
                <IonRow>
                  <IonCol size="10" className="ion-text-start memberContent">
                    <img className="bullet" src={bullet} alt="" />
                    Approval pending
                      </IonCol>
                  <IonCol size="2" className="ion-text-center membervalue" onClick={()=>{this.onClickData("totalPendingApprovalMembershipChapterMembers",this.props.loginMetadata)}} style={{textDecoration:"underline"}}>
                  {this.state.dashboardObject.PendingRequests}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="10" className="ion-text-start memberContent">
                    <img className="bullet" src={bullet} alt="" />
                    Approved but payment pending
                    </IonCol>
                  <IonCol size="2" className="ion-text-center membervalue" style={{textDecoration:"underline"}} onClick={()=>{this.onClickData("totalPendingPaymentOfApprovedMembers",this.props.loginMetadata)}}>
                    {this.state.dashboardObject.ApprovedmemberPaymentPending}
                    </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
            </IonGrid>
            </IonSegment>
            </IonContent>
      </IonPage>
    )
  }
}
export default Dashboard;
