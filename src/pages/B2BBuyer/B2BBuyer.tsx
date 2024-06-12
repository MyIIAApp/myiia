import {
  IonContent,
  IonGrid,
  IonPage,
  IonSearchbar,
  IonSlide,
  IonCard,
  IonSlides,
  IonLabel,
  IonToggle,
  IonSegment,
  IonCardContent,
  IonToast,
  IonTextarea,
  IonImg,
  IonButton,
  IonSpinner,
  IonPopover,
  IonRow,
  IonCol,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput
} from "@ionic/react";
import React from "react";
import DropDownButton1 from "../../components/DropDownButton1";
import HeaderToolbar from "../../components/HeaderToolbar";
import IIAMartCategorySubCategory from "../../JsonFiles/IIAMart.json";
import { LoginMetadata } from "../../models/LoginMetadata";
import hoTestimonial2 from "../../images/HoTestimonial2.svg";
import "../../styles/B2BBuyer.css";
import { search } from "ionicons/icons";
import { BuyerService } from "../../services/BuyerService";
import Loading from "../../components/Loading";
import hoTestimonial1 from "../../images/HoTestimonial1.svg";

interface B2BBuyerProps {
  loginMetadata: LoginMetadata;
}

const slideOpts = {
  autoplay: true,
  loop: true,
  initialSlide: 0,
  speed: 2000,
  grabCursor: true,
};

interface B2BBuyerStates {
  category: string;
  subCategory: string;
  searchText: string;
  isShowing: boolean;
  arr: any;
  isChecked: boolean;
  validItems: any;
  isLoading: boolean;
  martAds:any[];
  showPop:boolean;
  spinnerLoad:boolean;
  productCategory:string;
  showError:string;
  productData:any[];
  subProductData:any[];
  productSubCategory:string;
  name:string;
  email:string;
  mobile:string;
  message:string;
  alertstatus:boolean,
  alertMessage:string;
}
class B2BBuyer extends React.Component<B2BBuyerProps, B2BBuyerStates> {
  constructor(props: B2BBuyerProps) {
    super(props);
    this.state = {
      category: "",
      subCategory: "",
      searchText: "",
      isShowing: true,
      arr: Object.keys(IIAMartCategorySubCategory),
      isChecked: false,
      validItems: {},
      isLoading: true,
      martAds:[],
      showPop:false,
      spinnerLoad:false,
      productCategory:'',
      showError:'',
      productData:[],
      subProductData:[],
      productSubCategory:"",
      name:"",
      email:"",
      mobile:"",
      message:"",
      alertstatus:false,
      alertMessage:''
    };
  }
  componentDidMount() {
    BuyerService.GetValidItemList(this.props.loginMetadata).then((response) => {
      this.setState({ validItems: response, isLoading: false });
    });
    this.getAdsMart();

    let arr:any=[];
    for(let item in IIAMartCategorySubCategory){
      let product1 = {name:item,category:IIAMartCategorySubCategory[item]}
      arr.push(product1)
    }
    this.setState({productData:arr})
   // this.sortFu();
  }

  async getAdsMart(){
    const response  = await fetch('https://iiaonline.in/IIAMart/getMartAdsUser.php');
    const result = await response.json();
    this.setState({martAds:result});
  }

  handleInputChange(e) {
    const query = e.target.value;
    this.setState({ searchText: query });
    const arr = new Array<string>();
    requestAnimationFrame(() => {
      Object.keys(IIAMartCategorySubCategory).map((category) => {
        IIAMartCategorySubCategory[category].map((subCategory) => {
          var included = arr.includes(category);
          var isIncludedQuery = category
            .toLowerCase()
            .includes(query.toLowerCase());
          if (
            (isIncludedQuery && !included) ||
            (!isIncludedQuery &&
              subCategory.toLowerCase().includes(query.toLowerCase()) &&
              !included)
          ) {
            arr.push(category);
          }
        });
      });
      this.setState({ arr: arr });
    });
  }

  render() {
    return (
      <IonPage>
        {/* <HeaderToolbar
          showBackButton={false}
          showRefreshButton={false}
          refreshPage={() => {}}
          previousPage={() => {}}
        /> */}
        <IonSegment mode ="md">
          <IonSearchbar
            className="newSearchBar"
            value={this.state.searchText}
            onIonFocus={() => {
              this.setState({ isShowing: false });
            }}
            placeholder="Search"
            onIonInput={(e) => {
              this.handleInputChange(e);
            }}
            animated={true}
            onIonCancel={() => {
              this.setState({ isShowing: true, arr: [] });
            }}
            searchIcon={search}
          ></IonSearchbar>
        </IonSegment>
        <IonSegment mode ="md">
          <IonLabel style={{ marginTop: "9px" }}>
            <strong>Hide categories with zero listings</strong>
          </IonLabel>
          <IonToggle
            checked={this.state.isChecked}
            onIonChange={(e) => {
              this.logOutInformation(e);
            }}
          />
        </IonSegment>

         
       

        {
        this.state.isLoading ? (
          <Loading />
        ) : this.state.isShowing ? (

          <IonContent>
            <IonToast
              isOpen={this.state.alertstatus}
              message={this.state.alertMessage}
              duration={4000}
              onDidDismiss={() => this.setState({ alertstatus: false })}
              />

            <IonGrid class="limitContent">
            <IonButton onClick={()=>this.setState({showPop:true})} style={{width:'100%'}}>Send enquiry</IonButton>
            </IonGrid>
                        
            {
              (this.state.martAds.length>0) ?  <IonSegment mode ="md" className="myiiaImgseg">
              <IonSlides
                className="myiiaSlider"
                options={slideOpts}
                pager={true}
              >
                {this.state.martAds.map((item: any) => {
                  return (
                    <IonSlide key={item.id}>
                      <IonImg
                        className="myiiaImage"
                        src={
                          item.adsImage
                        }
                      />
                    </IonSlide>
                  );
                })}
              </IonSlides>
              </IonSegment>:null
            }

            <IonPopover
                isOpen={this.state.showPop}
                onDidDismiss={() => this.clearvalue()}
            >
                <IonRow>
                <IonCol size="12" style={{textAlign:'end',paddingBottom:0}} className="col12ss">
                    <span style={{paddingRight:'10px',fontSize:'17px',cursor:'pointer'}} onClick={()=>this.clearvalue()}>X</span>
                </IonCol>
                <IonCol className="col12ss" size="12">
                  <IonSegment mode ="md">
                  <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem class="basicInput createProductInput">
                    <IonLabel
                    position="floating"
                    class="selectDisabled"
                    color={
                        this.state.productCategory == ""
                        ? this.state.showError
                            ? "danger"
                            : "medium"
                        : "primary"
                    }
                    >
                    Product Category*
                    </IonLabel>
                        <IonSelect
                        value={this.state.productCategory}
                        name="productCategory"
                        class="selectDisabled"
                        
                        onIonChange={(e) => this.selectProduct(e)}
                        >
                        {this.state.productData.map((product: any) => {
                            return (
                            <IonSelectOption key={product.name} value={product.name}>
                                {product.name}
                            </IonSelectOption>
                            );
                        })}
                        </IonSelect>

                  </IonItem>
                      </IonCard>
                    </IonSegment>
                </IonCol>
                <IonCol className="col12ss" size="12">
                <IonSegment mode ="md">
                  <IonCard color="secondary" className="SendOTPItemCard">
                    <IonItem
                          class="basicInput createProductInput"
                    >
                        <IonLabel
                        position="floating"
                        class="selectDisabled"
                        color={
                            this.state.productSubCategory == ""
                            ? this.state.showError
                                ? "danger"
                                : "medium"
                            : "primary"
                        }
                        >
                        Sub-Category*
                        </IonLabel>
                        <IonSelect
                        value={this.state.productSubCategory}
                        name="productSubCategory"
                        class="selectDisabled"
                        // disabled={this.state.disabled}
                        onIonChange={(e) => this.handleInputChange1(e)}
                        >
                        {this.state.subProductData.map((subproduct: string) => {
                            return (
                            <IonSelectOption key={subproduct} value={subproduct}>
                                {subproduct}
                            </IonSelectOption>
                            );
                        })}
                        </IonSelect>
                    </IonItem>
                    </IonCard>
                    </IonSegment>
                </IonCol>
                
                <IonCol className="col12ss" size="12">
                    <IonSegment mode ="md">
                        <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem class="basicInput createProductInput">
                        <IonLabel position="floating">Name*</IonLabel>
                        <IonInput
                            placeholder="Name"
                            value={this.state.name}
                            onIonChange={(e)=>this.getName(e)}
                        ></IonInput>
                        </IonItem>
                        </IonCard>
                    </IonSegment>
                </IonCol>
                <IonCol className="col12ss" size="12">
                    <IonSegment mode ="md">
                        <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem class="basicInput createProductInput">
                        <IonLabel position="floating">Email*</IonLabel>
                        <IonInput
                            placeholder="Email"
                            value={this.state.email}
                            onIonChange={(e:any)=>this.setState({email:e.target.value})}
                        ></IonInput>
                        </IonItem>
                        </IonCard>
                    </IonSegment>
                </IonCol>
                <IonCol className="col12ss" size="12">
                    <IonSegment mode ="md">
                        <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem class="basicInput createProductInput">
                        <IonLabel position="floating">Mobile*</IonLabel>
                        <IonInput
                            placeholder="Mobile"
                            inputMode="numeric"
                            onIonChange={(e:any)=>this.setState({mobile:e.target.value})}
                        ></IonInput>
                        </IonItem>
                        </IonCard>
                    </IonSegment>
                </IonCol>
                <IonCol className="col12ss" size="12">
                    <IonSegment mode ="md">
                        <IonCard color="secondary" className="SendOTPItemCard">
                        <IonItem class="basicInput createProductInput">
                        {/* <IonLabel position="floating">Message*</IonLabel> */}
                        <IonTextarea
                            placeholder="Message"
                            onIonChange={(e:any)=>this.setState({message:e.target.value})}
                        ></IonTextarea>
                        </IonItem>
                        </IonCard>
                    </IonSegment>
                </IonCol>
                


                <IonCol size="12">
                
                    <IonSegment mode ="md">
                        
                        <IonButton style={{margin:'0'}}
                             disabled = {!this.state.name 
                              || !this.state.email 
                              || !this.validateEmail(this.state.email)
                              || !this.state.mobile
                              || !(this.state.mobile.length == 10) 
                              || !this.state.productCategory 
                              || !this.state.message 
                              || !this.state.productSubCategory || this.state.spinnerLoad}	
                              class="createlistbtn ion-text-wrap" onClick={()=>this.adddata()}>
                              {
                                  (this.state.spinnerLoad)?<IonSpinner name="lines"></IonSpinner>:'ADD'
                              }
                          </IonButton>
                        
                    </IonSegment>
                </IonCol>
                </IonRow>
            </IonPopover>

            <IonGrid class="limitContent">
              {Object.keys(IIAMartCategorySubCategory)
                .sort()
                .map((category: any) => {
                  if (category === "") {
                  } else if (this.state.isChecked) {
                    if (
                      Object.keys(this.state.validItems).indexOf(category) != -1
                    ) {
                      return (
                        <DropDownButton1
                          Category={category}
                          isChecked={this.state.isChecked}
                          loginMetadata={this.props.loginMetadata}
                          validSubcategory={this.state.validItems[category]}
                          key={category}
                        />
                      );
                    }
                  } else {
                    return (
                      <DropDownButton1
                        Category={category}
                        isChecked={this.state.isChecked}
                        loginMetadata={this.props.loginMetadata}
                        validSubcategory={this.state.validItems[category]}
                        key={category}
                      />
                    );
                  }
                })}
            </IonGrid>
          </IonContent>
        ) : (
          <IonContent>
            <IonGrid class="limitContent">
              {this.state.arr.sort().map((category: string) => {
                if (this.state.isChecked) {
                  if (
                    Object.keys(this.state.validItems).indexOf(category) != -1
                  ) {
                    return (
                      <DropDownButton1
                        Category={category}
                        isChecked={this.state.isChecked}
                        loginMetadata={this.props.loginMetadata}
                        validSubcategory={this.state.validItems[category]}
                        key={category}
                      />
                    );
                  }
                } else {
                  return (
                    <DropDownButton1
                      Category={category}
                      isChecked={this.state.isChecked}
                      loginMetadata={this.props.loginMetadata}
                      validSubcategory={this.state.validItems[category]}
                      key={category}
                    />
                  );
                }
              })}
            </IonGrid>
          </IonContent>
        )}
      </IonPage>
    );
  }

  clearvalue(){
    this.setState({showPop:false,spinnerLoad:false,productCategory:'',productSubCategory:'',name:'',email:'',mobile:'',message:''})
  }
  getName(e:any){
    this.setState({name:e.target.value})
  }
  selectProduct(e) {
    this.setState({productCategory:e.target.value,productSubCategory:''});
    this.getSubCategory(e.target.value);
  }
  getSubCategory(val){
    this.state.productData.map((product: any) => {
        if (product.name == val) {
          this.setState({ subProductData: product.category });
        }
      });
  }

  handleInputChange1(e) {
    this.setState({productSubCategory:e.target.value})
  }


  logOutInformation(e) {
    this.setState({ isChecked: e.detail.checked });
  }

  validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  async adddata(){
    this.setState({spinnerLoad:true})
    const data = {
      category:this.state.productCategory,
      subcategory:this.state.productSubCategory,
      name:this.state.name,
      email:this.state.email,
      mobile:this.state.mobile,
      message:this.state.message,
      loginMetadata:this.props.loginMetadata
    }
    const response = await fetch('https://iiaonline.in/newapi_iia/martMessages.php',{
        method:'POST',
        body:JSON.stringify(data)
    })
    const result = await response.json();
    if(result.status){
      this.setState({productCategory:'',productSubCategory:'',name:'',email:'',mobile:'',showPop:false,alertstatus:true,alertMessage:result.message,spinnerLoad:false,message:''})
    }
  }

}
export default B2BBuyer;
