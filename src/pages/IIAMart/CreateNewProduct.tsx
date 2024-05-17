import {
  IonContent,
  IonSegment,
  IonItem,
  IonLabel,
  IonTitle,
  IonButton,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonInput,
  IonGrid,
  IonToast,
} from "@ionic/react";
import React from "react";
import "../../styles/IIAMart.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import IIAMart from "../../JsonFiles/IIAMart.json";
import FileUpload from "../../components/FileUpload";
import {
  ImageExtensions,
  ItemPhotoDirectory,
} from "../../constants/FileUploadConstants";
import { items } from "../../models/IIAMart/items";
const header = {
  header: "Select the Category",
};
const header2 = {
  header: "Select the Sub-category",
};
interface ProductStates {
  Name: string;
  status: string;
  index: number;
  Category: string;
  SubCategory: string;
  PhotoPath: string;
  Description: string;
  Price: string;
  showAlert: boolean;
}
interface ProductProps {
  loginMetadata: LoginMetadata;
  items: items;
  heading: string;
  editItemDetails: (list: any) => void;
  returnToHomePage: () => void;
  editCheck:boolean;
}

class CreateNewProduct extends React.Component<ProductProps, ProductStates> {
  constructor(props: ProductProps) {
    super(props);
    this.state = {
      Name: this.props.items.Name,
      status: "",
      index: 0,
      Category: this.props.items.Category,
      SubCategory: this.props.items.SubCategory,
      PhotoPath: this.props.items.PhotoPath,
      Description: this.props.items.ItemDescription,
      Price: this.props.items.Price,
      showAlert: false,
    };
  }
  componentDidMount(): void {
    if(this.props.editCheck){
      this.setState({PhotoPath:''})
    }
  }
  render() {
    return (
      <IonContent>
        <IonGrid className="limitContent">
          <IonTitle class="title">{this.props.heading}</IonTitle>
          <IonSegment mode ="md">
            <IonItem class="basicInput createProductInput">
              <IonLabel position="floating">Product Name*</IonLabel>
              <IonInput
                placeholder="Product Name"
                value={this.state.Name}
                required={true}
                onIonChange={(e) => this.onNameChange(e)}
              ></IonInput>
            </IonItem>
          </IonSegment>
          <IonToast 
            duration={2000} 
            isOpen={this.state.showAlert} 
            onDidDismiss={()=>this.setState({showAlert:false})} 
            message="Price must be a number"
            ></IonToast>
          <IonSegment mode ="md">
            <IonItem class="basicInput createProductInput">
              <IonLabel position="floating">Product Category*</IonLabel>
              <IonSelect
                interfaceOptions={header}
                value={this.state.Category}
                okText="Okay"
                cancelText="Cancel"
                onIonChange={(e) => this.onCategorychange(e)}
              >
                {Object.keys(IIAMart).map((category: any) => {
                  return (
                    <IonSelectOption key={category} value={category}>
                      {category}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonSegment>
          <IonSegment mode ="md">
            <IonItem class="basicInput createProductInput">
              <IonLabel position="floating">Sub-Category*</IonLabel>
              <IonSelect
                interfaceOptions={header2}
                value={this.state.SubCategory}
                okText="Okay"
                cancelText="Cancel"
                onIonChange={(e) => this.onSubCategorychange(e)}
                disabled={this.state.Category === ""}
              >
                {this.state.Category != ""
                  ? IIAMart[this.state.Category].map((subCategory: any) => {
                      return (
                        <IonSelectOption key={subCategory} value={subCategory}>
                          {subCategory}
                        </IonSelectOption>
                      );
                    })
                  : null}
              </IonSelect>
            </IonItem>
          </IonSegment>
          <IonSegment mode ="md">
            <IonItem class="basicInput createProductInput">
              <IonLabel position="floating">Price*</IonLabel>
              <IonInput
                placeholder="Price"
                inputMode="numeric"
                value={this.state.Price}
                onIonChange={(e) => this.onPriceChange(e)}
              ></IonInput>
            </IonItem>
          </IonSegment>
          <IonSegment mode ="md">
            <IonItem class="basicInput createProductInput">
              <IonLabel position="floating">Descriptions </IonLabel>
              <IonTextarea
                value={this.state.Description}
                placeholder="Description*"
                name="majorProducts"
                required={true}
                onIonChange={(e) => this.onDescriptionchange(e)}
              ></IonTextarea>
            </IonItem>
          </IonSegment>
          <IonSegment mode ="md" class="membershipFileUpload">
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
              id="productPhoto"
            />
          </IonSegment>
          <IonButton
            class="createlistbtn ion-text-wrap"
            onClick={() => {
              if(!/^-?\d+\.?\d*$/.test(this.state.Price)){
                this.props.items.Price="";
                this.setState({Price:"",showAlert:true});
              }
              else
              {
              this.props.items.Name = this.state.Name;
              this.props.items.Category = this.state.Category;
              this.props.items.SubCategory = this.state.SubCategory;
              this.props.items.Price = this.state.Price;
              this.props.items.ItemDescription = this.state.Description;
              this.props.editItemDetails(this.props.items);
              this.props.returnToHomePage();
              }
            }}
          >
            Submit
          </IonButton>
        </IonGrid>
      </IonContent>
    );
  }
  onItemImagePathChange(path: string): void {
    this.props.items.PhotoPath = path;
    this.setState({ PhotoPath: path });
  }
  onNameChange(e) {
    this.setState({ Name: e.target.value });
    let prop = e.target.name;
    this.props.items[prop] = e.target.value;
    let obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
  }
  onPriceChange(e) {
    this.setState({ Price: e.target.value });
    let prop = e.target.name;
    this.props.items[prop] = e.target.value;
    let obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
  }
  onCategorychange(e) {
    this.setState({ Category: e.target.value });
  }
  onSubCategorychange(e) {
    this.setState({ SubCategory: e.target.value });
  }
  onDescriptionchange(e) {
    this.setState({ Description: e.target.value });
  }
}
export default CreateNewProduct;