import React from 'react';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { LoginMetadata } from '../../models/LoginMetadata';
import '../../styles/MyIIA.css';
import HeaderToolbar from '../../components/HeaderToolbar';
import Loading from '../../components/Loading';
import './style.css';
// Define props and state interfaces
interface OrganizationalProps {
  loginMetadata: LoginMetadata;
  goBack: () => void;
  titledata:string;
}

interface OrganizationalState {
  showloading:boolean;
  arrdata:any[]
}


class OrganizationalCard extends React.Component<OrganizationalProps, OrganizationalState> {
  constructor(props: OrganizationalProps) {
    super(props);
    this.state = {
        showloading:true,
        arrdata:[]
    };
  }
  
  async showData(){
    const response = await fetch(`https://iiaonline.in/newapi_iia/getOrganizationDetails.php?title=${this.props.titledata}`);
    const result = await response.json();
    this.setState({showloading:false,arrdata:result})
  }

  componentDidMount(){
    this.showData();
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
    }else{
        return (
            <IonPage>
              <HeaderToolbar
                refreshPage={() => {}}
                previousPage={() => this.props.goBack()}
                showBackButton={true}
                showRefreshButton={false}
              />
              <IonContent>
                  <IonGrid style={{marginTop:'10px'}}>
                        {
                          this.state.arrdata.map((item,index)=>{
                            const heading =  Object.keys(item)[0];
                            const arrdata = item[heading];
                              return (
                                  <>
                                  {
                                    (this.props.titledata=='Chapter Chairman')?
                                      <>
                                         <h6 style={{fontWeight:600,marginLeft:'11px',textAlign:'center'}}>{heading}</h6>
                                         {
                                          (arrdata).map((item1:any,index1:any)=>{
                                            
                                            return (
                                              <IonCard className="OrcardContent">
                                                <IonRow>
                                                  <IonCol size="4">
                                                      <img src={item1.photo} alt="" />
                                                  </IonCol>
                                                  <IonCol size="8" className='Orcardcon'>
                                                      <div>
                                                       
                                                        {
                                                        (item1.address)?
                                                        <><p style={{fontWeight:'bold'}}>Address</p>
                                                        <div dangerouslySetInnerHTML={{ __html: item1.address }}>
                                                        </div></> :null
                                                        }


                                                        <p style={{fontWeight:'bold',marginBottom:'5px'}}>Contact details</p>
                                                        <div dangerouslySetInnerHTML={{ __html: item1.phone }}>
                                                        </div>
                                                      </div>
                                                  </IonCol>
                                                  <IonCol size="12">
                                                      <p style={{fontWeight:'bold',marginBottom:'4px'}}>{item1.name}
                                                        
                                                      </p>
                                                      <p style={{textAlign:'end'}}>{item1.Retirement}</p>
                                                      
                                                      {
                                                      (item1.ChapterName)?
                                                      <><p style={{fontWeight:'bold'}}>Chapter Name</p>
                                                      <div dangerouslySetInnerHTML={{ __html: item1.ChapterName }}>
                                                      </div></> :null
                                                      }

                                                      {
                                                      (item1.DivisionName)?
                                                      <><p style={{fontWeight:'bold'}}>Division Name</p>
                                                      <div dangerouslySetInnerHTML={{ __html: item1.DivisionName }}>
                                                      </div></> :null
                                                      }

                                                      {
                                                      (item1.FacAddress)?
                                                      <><p style={{fontWeight:'bold'}}>Fac Address</p>
                                                      <div dangerouslySetInnerHTML={{ __html: item1.FacAddress }}>
                                                      </div></> :null
                                                      }

                                                      {
                                                      (item1.Designation)?
                                                      <><p style={{fontWeight:'bold'}}>Designation</p>
                                                      <div dangerouslySetInnerHTML={{ __html: item1.Designation }}>
                                                      </div></> :null
                                                      }
                                                      
                                                      {
                                                      (item1.subjeccommetee)?
                                                      <><p style={{fontWeight:'bold'}}>Subject Committee</p>
                                                      <div dangerouslySetInnerHTML={{ __html: item1.subjeccommetee }}>
                                                      </div></> :null
                                                      }
                                                  </IonCol>
                                                </IonRow>
                                              </IonCard>
                                            );
                                          })
                                         }
                                      </>
                                      :
                                      <IonCard className="OrcardContent">
                                        <IonRow>
                                          <IonCol size={(true)?'4':'0'}>
                                              <img src={item.photo} alt={item.name} />
                                          </IonCol>
                                          <IonCol size="8" className='Orcardcon'>
                                              <div>
                                                  <p style={{fontWeight:'bold',marginBottom:'5px'}}>Contact details</p>
                                                  <div dangerouslySetInnerHTML={{ __html: item.phone }}>
                                                  </div>

                                                 
                                              </div>
                                          </IonCol>
                                          <IonCol size="12">
                                              <p style={{fontWeight:'bold',marginBottom:'4px'}}>{item.name} 
                                              {
                                                    // (item.financialyear) ? <span>({item.financialyear})</span> : null
                                              }
                                              </p>
                                              {
                                                (item.Retirement)?<p style={{textAlign:'end'}}>{item.Retirement}</p>:null
                                              }
                                               
                                              {
                                              (item.position)?
                                              <p>{item.position}  {
                                                (item.financialyear) ? <span>({item.financialyear})</span> : null
                                              }</p>
                                               :null
                                              }

                                              {
                                              (item.FacAddress)?
                                              <><p style={{fontWeight:'bold'}}>Fac Address</p>
                                              <div dangerouslySetInnerHTML={{ __html: item.FacAddress }}>
                                              </div></> :null
                                              }

                                              {
                                              (item.Designation)?
                                              <><p style={{fontWeight:'bold'}}>Designation</p>
                                              <div dangerouslySetInnerHTML={{ __html: item.Designation }}>
                                              </div></> :null
                                              }
                                              
                                              {
                                              (item.subjeccommetee)?
                                              <><p style={{fontWeight:'bold'}}>Subject Committee</p>
                                              <div dangerouslySetInnerHTML={{ __html: item.subjeccommetee }}>
                                              </div></> :null
                                              }
                                          </IonCol>
                                        </IonRow>
                                      </IonCard>
                                    }
                                  </>
                              );
                          })
                        }
                  </IonGrid>
              </IonContent>
            </IonPage>
          );
        }
    }
}

export default OrganizationalCard;
