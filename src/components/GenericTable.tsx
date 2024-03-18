import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonAlert,
  IonSegment,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "./HeaderToolbar";
import "../styles/Home.css";
import { createOutline, trashOutline } from "ionicons/icons";
import { StorageService } from "../services/StorageService";
interface GenericTableProps {
  tableContent: any[];
  columnList: string[];
  sizesList: string[];
  showDeleteColumn: boolean;
  showUpdateColumn: boolean;
  DeleteFunction: (index: number) => void;
  UpdateFunction: (index: number) => void;
  keyList: string[];
  title: string;
}
interface GenericTableStates {
  showAlert: boolean;
  alertMessage: string;
  selectedIndex: number;
  schema: any[];
}
export default class GenericTable extends React.Component<
  GenericTableProps,
  GenericTableStates
> {
  constructor(props: GenericTableProps) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: "",
      selectedIndex: -1,
      schema: [],
    };
  }
  componentDidMount(){
    this.props.columnList.map((value,index)=>{
      this.state.schema.push({column:value,type:String,value: (value: any) => value[this.props.keyList[index]]})
    })
  }
  render() {
    return (
      <IonGrid style={{height:"100%",width:"100%"}}>
        <IonItem  style={{marginTop:20}} lines="none">
            <IonButton item-end style={{marginLeft:"85%",width:"15%"}} onClick={()=>{StorageService.GenericExcelWriter(this.props.tableContent, this.state.schema)}}>
              <IonLabel>
              Download
              </IonLabel>
            </IonButton>
          </IonItem>
        <IonContent scrollY={true} scrollX={true}>
          <IonAlert isOpen={this.state.showAlert} onDidDismiss={()=>{this.setState({showAlert:false})}} message={this.state.alertMessage}
          buttons={[
            { text: "Cancel", role: "cancel" },
            {
              text: "Yes",
              handler: (e) => { 
                this.props.DeleteFunction(this.state.selectedIndex);
              },
            },
          ]}/>
          
          <IonGrid class="tableClass ">
            <IonRow
              class={
                "tableRow headers ion-text-center" +
                (this.props.tableContent.length == 0 ? " tableLastRow" : "")
              }
            >
              {this.props.columnList.map((item, index) => {
                return (
                  <IonCol
                    class={"tableAllCol" + (index == 0 ? " tableFirstCol" : "")}
                    size={this.props.sizesList[index]}
                    key={index}
                  >
                    {item}
                  </IonCol>
                );
              })}
              {this.props.showUpdateColumn ? (
                <IonCol class="tableAllCol" size="0.5"></IonCol>
              ) : null}
              {this.props.showDeleteColumn ? (
                <IonCol class="tableAllCol" size="0.5"></IonCol>
              ) : null}
            </IonRow>
            {this.props.tableContent.map((data, index) => {
              return (
                <IonRow
                  class={
                    "tableRow ion-text-center" +
                    (index == this.props.tableContent.length - 1
                      ? " tableLastRow"
                      : "")
                  }
                  key={index}
                >
                  {this.props.keyList.map((item, index) => {
                    return (
                      <IonCol
                        class={
                          "tableAllCol" + (index == 0 ? " tableFirstCol" : "")
                        }
                        size={this.props.sizesList[index]}
                        key={index}
                      >
                        {data[item] == "" ? "N/A" : data[item]}
                      </IonCol>
                    );
                  })}
                  {this.props.showUpdateColumn ? (
                    <IonCol class="tableAllCol" size="0.5">
                      <IonIcon
                        ios={createOutline}
                        md={createOutline}
                        style={{ margin: "auto" }}
                        onClick={() => {
                          this.props.UpdateFunction(index);
                        }}
                      />
                    </IonCol>
                  ) : null}
                  {this.props.showDeleteColumn ? (
                    <IonCol class="tableAllCol" size="0.5">
                      <IonIcon
                        ios={trashOutline}
                        md={trashOutline}
                        style={{ margin: "auto" }}
                        onClick={() => {
                          this.setState({showAlert: true, alertMessage: "Are you sure to Delete this " + this.props.title, selectedIndex:index})
                        }}
                      />
                    </IonCol>
                  ) : null}
                </IonRow>
              );
            })}
          </IonGrid>
        </IonContent>
        </IonGrid>
    );
  }
}
