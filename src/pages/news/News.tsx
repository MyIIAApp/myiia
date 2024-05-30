import {
  IonButton,
  IonContent,
  IonFooter,
  IonGrid,
  IonImg,
  IonLabel,
  IonSegment,
  IonList,
  IonItem,
  IonIcon
} from "@ionic/react";
import React from "react";
import "../../styles/News.css";
import { chevronDown,chevronForward,chevronUp } from "ionicons/icons";
interface NewsCardProps {
  // loginMetadata: LoginMetadata;
  // news: News;
}
interface NewsCardState{
  headingarr:any[],
  subheading:any[]
}

class NewsCard extends React.Component<NewsCardProps,NewsCardState> {
  constructor(props: NewsCardProps) {
    super(props);
    this.state = {
      headingarr:[],
      subheading:[]
    };
  }
  async getheading(){
    const response = await fetch('https://iiaonline.in/newapi_iia/getNotificationCirular.php');
    const result = await response.json();
    this.setState({headingarr:result})
  }
  async getSubheading(goverId,index,showSection){
    this.state.headingarr[index].showSection = !showSection;
    const response = await fetch(`https://iiaonline.in/newapi_iia/getNotiifiCirculSubheading.php?GovtTypeId=${goverId}`);
    const result = await response.json();
    this.setState({subheading:result})
  }
  componentDidMount(){
    this.getheading();
    
  }
  render() {
    return (
       <IonGrid className="newsCard">
        <IonList>
          {
            this.state.headingarr.map((item:any,index)=>{
              return(
                <div id={item.id}>
                  <IonItem onClick={()=>this.getSubheading(item.id,index,item.showSection)}>
                    <IonLabel style={{fontWeight:'700'}}>{item.GovtTypeName}</IonLabel>
                    <IonIcon ios={(item.showSection)? chevronUp:chevronDown} color="dark"></IonIcon>
                  </IonItem>
                  {
                    (item.showSection)?this.state.subheading.map((subheaing:any)=>{
                      return (
                        <div style={{width:'95%',marginLeft:'auto'}}>
                        <h4 style={{margin:'6px 0',fontSize:'15px',fontWeight:'600',color:'#7a1b1d'}}>{subheaing.NotificationTypeName}</h4>
                          {
                            (subheaing.subheading).map((subing2:any,index)=>{
                              return (
                                <a target="_blank" href={subing2.notificationlink} 
                                style={{margin:'4px 0',fontSize:'13px',display:'flex',gap:'2px',marginLeft:'4px',color:'black',textDecoration:'none'}}> 
                                <span>{index+1}.</span> <span>{subing2.notificationheading}</span></a>
                              )
                            })
                          }
                          </div>
                        );
                    })
                    :null
                  }
                 
                </div>
              )
            })
          }  
        </IonList>
      </IonGrid>
    );
  }

 
}

export default NewsCard;
