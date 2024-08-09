import {
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRouterOutlet,
  IonSegment,
  IonSlide,
  IonSlides,
  IonIcon,
  IonCardContent,
  IonLabel,
  IonBadge,
  IonTabButton,
  IonCard,
  IonTabs,
} from "@ionic/react";
import { StorageService } from "../../services/StorageService";
import React from "react";
import { Redirect, Route } from "react-router";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LocalContactPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Leader } from "../../models/MyIIA/Leader";
import { MyIIAService } from "../../services/MyIIAService";
import "../../styles/MyIIA.css";
import MyIIALeaders from "./MyIIALeaders";
import OrganizationCard from './OrganizationalCard';
import { arrowDown ,arrowUpSharp,arrowForward} from "ionicons/icons";
import './style.css';
const slideOpts = {
  autoplay: true,
  loop: true,
  initialSlide: 0,
  speed: 2000,
  grabCursor: true,
};
interface MyIIAStates {
  sliderlist: any;
  showloading: boolean;
  hoLeaders: Leader[];
  chapterLeaders: Leader[];
  arrdata:any[];
  tempArrdata:any[];
  showsection1:boolean;
  showsection2:boolean;
  activeIndex:number;
  titledata:string;
  counter:number;
  foodData:any[];
  TotalAmnt:number;
}
interface MyIIAProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
}

class MyIIA extends React.Component<MyIIAProps, MyIIAStates> {
  constructor(props: MyIIAProps) {
    super(props);
    this.state = {
      activeIndex:0,
      sliderlist: [],
      showloading: true,
      hoLeaders: [],
      chapterLeaders: [],
      arrdata:[],
      showsection1:true,
      showsection2:false,
      tempArrdata:[],
      titledata:"",
      counter:0,
      TotalAmnt:0,
      foodData:[
        {id:1,title:'IIA',qty:0},
        {id:2,title:'Document',qty:0},
        {id:3,title:'Photo',qty:0},
        {id:4,title:'Image',qty:0},
      ],
    };
  }

  componentDidMount(){
    Promise.all([this.getBanner(), this.getDataList()])
      .then((result: any[]) => {
        this.setState({
          sliderlist: result[0],
          showloading:false,
          arrdata:result[1],
        });
      })
    .catch(() => {});

  }

 
  async getDataList(){
    const response  = await fetch('https://iiaonline.in/newapi_iia/getOrganizationdata.php');
    const result = await response.json();
    return result;
  }

  async getBanner(){
    const response  = await fetch('https://iiaonline.in/newapi_iia/getOrgainzationBanner.php');
    const result = await response.json();
    return result;
  }

  handleToggle(index,item){
      
        this.openshowList();
        this.setState({titledata:item.option})
      
      if(this.state.arrdata[index].activeMenu){
        this.state.arrdata[index].activeMenu=false;
      } else{
        this.state.arrdata[index].activeMenu=true;
      }
      this.setState({arrdata:this.state.arrdata})
  }

  subdetailoption(index,item){
    this.setState({titledata:item.suboption})
    this.openshowList();
  }

  
  render() {
    if (this.state.showloading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <Loading />
        </IonPage>
      );
    }else if(this.state.showsection1){
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent className="oricardcontainer">

            <IonSegment mode ="md" className="myiiaImgseg">
                <IonSlides
                  className="myiiaSlider"
                  options={slideOpts}
                  pager={true}
                >
                  {this.state.sliderlist.map((item: any) => {
                    return (
                      <IonSlide key={item.id}>
                        <IonImg
                          className="myiiaImage"
                          src={
                            item.image
                          }
                        />
                      </IonSlide>
                    );
                  })}
                </IonSlides>
              </IonSegment>

            {
              this.state.arrdata.map((item,index)=>{
                return (
                  <>
                    <IonCard>
                      <IonCardContent onClick={() => this.handleToggle(index,item)}>
                          <IonLabel class="statuslabel">{item.option}</IonLabel>

                          <img  
                          src="https://iiaonline.in/app_icon/right-arrow.png" 
                          className={`arrowIconlogo arrow0}`} 
                          />
                          {/* <IonIcon size="small" ios={ (item.subMenu.length>0) ? arrowDown: arrowForward}></IonIcon> */}
                      </IonCardContent>
                    </IonCard>
                    {
                      // (item.subMenu.length>0) ? <div className={`submenu ${!item.activeMenu ? 'hide' : 'show'}`}>
                      //   {
                      //     item.subMenu.map((item,index)=>{
                      //       return (
                      //           <IonCard style={{width:'80%',marginLeft:'auto'}}  onClick={() => this.subdetailoption(index,item)}>
                      //             <IonCardContent style={{padding:'6px'}}>
                      //                 <IonLabel class="statuslabel">{item.suboption}</IonLabel>
                      //                 {/* <IonIcon size="small" ios={arrowForward}></IonIcon> */}
                      //                 <img src="https://iiaonline.in/app_icon/right-arrow.png" alt="" className="arrowIconlogo" />
                      //             </IonCardContent>
                      //           </IonCard>
                      //       );
                      //     })
                      //   }
                      // </div> : null
                    }
                  </>
                );
              })
            }
          </IonContent>
        </IonPage>
      );
    }
    else if(this.state.showsection2){
      return (
        <OrganizationCard
        loginMetadata={this.props.loginMetadata}
        goBack={()=>this.showList()}
        titledata={this.state.titledata}
      />
      );
    }
  }

  showList(){
    this.setState({showsection2:false,showsection1:true})
  }

  openshowList(){
    this.setState({showsection2:true,showsection1:false})
  }
}

export default MyIIA;
