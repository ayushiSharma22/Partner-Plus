import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, View, Platform } from 'react-native';
// import NavigationExperimental from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
// // import DropdownAlert from 'react-native-dropdownalert';

// // import { backButtonPress } from '../commons/Utils';
// // import Home from './drawer';
import Login from './login/login';
// // import ResetPassword from './login/resetPassword';
// // import ForgotPassword from './login/forgotPassword';
// // import Profile from './profile/profile';
// // import EditProfile from './profile/editProfile';
// // import UploadProfile from './profile/upload';
// // import Rating from './Rating/Rating';
// // import Filters from './Filters/Filters';
// // import Notifications from './Notifications/Notifications';
// // import HomeDashboard from './home/Home';
// import HomeDashboard from './home/NewHome';
// // import ProductDashboard from './productsListPage/ProductDashboard';
// // import SettlementsDashboard from './settlementsPage/SettlementsDashboard';
// // import ProductPageDashboard from './productPage/ProductPageDashboard';
// import UpdateContactNumber from './updateContactNumber/index';
// // import StatusBar from './SignupNew/signup_header';
// import SelectShipmentType from './Orders/Order/CreateOrderPackage/';
// import PackageOrder from './Orders/Order/CreateOrderPackage/CreateOrderPackage';
// import NewAddress from './Addresses/Address/NewAddress';
// // import Signup_Personal from './SignupNew/signup_personal';
// // import Signup_Mobile_Verification from './SignupNew/signup_mobile';
// // import Signup_Company from './SignupNew/signup_company';
// // import Signup_Billing from './SignupNew/signup_billing';
// // import Order from './Orders/Order/';
// import CompanyProfile from './companyProfile/CompanyProfile';
// import Support from './support/Support';
// import Welcome from './welcome/index';
// import SettlementDetails from './settlementDetails/index';
// // import Inquiries from './Inquiries/';
// import Inquiry from './Inquiries/InquiryPage/';
// import PurchaseOrder from './PurchaseOrders/PurchaseOrder/';
// import PurchaseOrderDispatchPlan from './PurchaseOrders/PurchaseOrder/DispatchPlanDetails';
// import QuotationSubmit from './Inquiries/InquiryPage/Quotation/';

// // Import all actions
// import * as AuthActions from '../actions/AuthActions';
// import * as SettlementActions from '../actions/SettlementActions';
// import { fetchAllProducts } from '../actions/ProductsListActions';
// import * as ProductPageActions from '../actions/ProductPageActions';
// import * as SignUpActions from '../actions/SignUpActions';
// import * as FetchOrderActions from '../actions/orderActions';
// import * as InquiryActions from '../actions/InquiryActions';
// import * as PurchaseOrderActions from '../actions/PurchaseOrderActions';
// import { userConfirmation } from '../actions/UserActions';
// import {
//   fetchCompany,
//   saveCompanyDetails,
//   saveStatutoryData
// } from '../actions/CompanyActions';
// import * as StockActions from '../actions/stockActions';
// import * as RatingActions from '../actions/RatingActions';
// import * as NotificationActions from '../actions/NotificationActions';

// //new additions
// // import Orders from './Orders/';
// import Account from './newui/components/account/account';
// import AccountInfoEdit from './newui/components/account/accountInfoEdit';
// import Faq from './FAQ/';
// // import Faq from './newui/components/faq/faq'
// // import AddStock from './newui/components/stock/addStock';
// import Mixpanel from 'react-native-mixpanel';

// import { checkPositive, checkPositiveInteger } from '../commons/Utils';

// const MAIN_CUSTOM_COLOR = '#4682b4';
class Index extends Component {
  constructor(props) {
    super(props);
    // this.props.client.handleUncaughtErrors();
  }
  //   checkAlertTitle(title) {
  //     if (title.includes('Error' || title.includes('error'))) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   showAlert(type, title, message) {
  //     this.dropdown.alertWithType(type, title, message);
  //   }
  //   onClose(data) {}

  //   renderWithStatusBar(name, node, navigator, back_button = false) {
  //     const {
  //       getState,
  //       loginState,
  //       userState,
  //       userConfirmation,
  //       login,
  //       logout,
  //       productReset,
  //       fetchNotifications
  //     } = this.props;
  //     return (
  //       <Home
  //         name={name}
  //         getState={getState}
  //         back_button={back_button}
  //         productReset={productReset}
  //         fetchNotifications={fetchNotifications}
  //         showAlert={(type, title, message) =>
  //           this.showAlert(type, title, message)
  //         }
  //         loginState={loginState}
  //         userState={userState}
  //         userConfirmation={userConfirmation}
  //         login={login}
  //         logout={logout}
  //         childRender={node}
  //         navigator={navigator}
  //       />
  //     );
  //   }

  renderScene(route, navigator) {
    const {
      mainState,
      loginState
      //       settlementState,
      //       ratingState,
      //       productsListState,
      //       productState,
      //       signupState,
      //       userState,
      //       notificationsState,
      //       companyState,
      //       orderState,
      //       stockState,
      //       inquiryState,
      //       inquiryHistoryState,
      //       login,
      //       getState,
      //       fetchAppUpdates,
      //       logout,
      //       fetchRating,
      //       fetchSettlements,
      //       downloadSettlements,
      //       fetchSettlementDetails,
      //       resetSettlementDetailsData,
      //       fetchAllProducts,
      //       fetchProduct,
      //       fetchSKU,
      //       productReset,
      //       validatePhone,
      //       validateEmail,
      //       signup,
      //       sendOTP,
      //       verifyOTP,
      //       loadCategories,
      //       registerCompany,
      //       registerBillingDetails,
      //       resetSignUpState,
      //       userConfirmation,
      //       fetchCompany,
      //       saveCompanyDetails,
      //       saveStatutoryData,
      //       fetchOrder,
      //       acceptOrder,
      //       rejectOrder,
      //       fetchOrders,
      //       fetchAddresses,
      //       createShipment,
      //       fetchShipments,
      //       fetchStocks,
      //       fetchSellerDashboard,
      //       fetchNotifications,
      //       updateNotifications,
      //       fetchInquiryHistory,
      //       fetchInquiries,
      //       submitQuote,
      //       editQuote,
      //       fetchInquiry,
      //       fetchPurchaseOrders,
      //       fetchPurchaseOrder,
      //       fetchPurchaseOrderItems,
      //       fetchPurchaseOrderDispatchPlans,
      //       acceptPurchaseOrder,
      //       rejectPurchaseOrder,
      //       purchaseOrderState,
      //       rejectBid
    } = this.props;

    //     let routeId = route.id;
    //     let product_id = -1;
    //     if (route.product_id) {
    //       product_id = route.product_id;
    //     }
    //     const faqs = [
    //       {
    //         question: 'question1',
    //         answer: 'answer1'
    //       }
    //     ];
    //     if (navigator.getCurrentRoutes().length == 2 && !!userState.user) {
    //       Mixpanel.identify(userState.user.email);
    //       Mixpanel.registerSuperProperties({
    //         Date: new Date().toISOString(),
    //         $email: userState.user.email,
    //         Company: userState.user.company_name,
    //         'Company Id': userState.user.company_id,
    //         Platform: Platform.OS
    //       });
    //       Mixpanel.track('User Logged In');
    //     }
    //     BackHandler.addEventListener('hardwareBackPress', () => {
    //       let currentRoutes = navigator.getCurrentRoutes();
    //       let flag = false;
    //       if (currentRoutes[currentRoutes.length - 1].id === 'product') {
    //         flag = true;
    //       }
    //       let flag2 = backButtonPress(navigator);
    //       if (flag && flag2) {
    //         productReset();
    //       }
    //       return flag2;
    //     });

    //     if (routeId === 'home') {
    //       let node = (
    //         <HomeDashboard
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           settlementState={settlementState}
    //           activeTab={route.activeTab}
    //           name={route.name}
    //           filter={route.date_filter}
    //           fetchSettlements={fetchSettlements}
    //           userConfirmation={userConfirmation}
    //           userState={userState}
    //           fetchSellerDashboard={fetchSellerDashboard}
    //           stockState={stockState}
    //           fetchInquiries={fetchInquiries}
    //           inquiryState={inquiryState}
    //           fetchPurchaseOrders={fetchPurchaseOrders}
    //           fetchPurchaseOrder={fetchPurchaseOrder}
    //           fetchPurchaseOrderItems={fetchPurchaseOrderItems}
    //           fetchPurchaseOrderDispatchPlans={fetchPurchaseOrderDispatchPlans}
    //           acceptPurchaseOrder={acceptPurchaseOrder}
    //           rejectPurchaseOrder={rejectPurchaseOrder}
    //           purchaseOrderState={purchaseOrderState}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar('default', node, navigator);
    //     }
    //     if (routeId === 'newAddress') {
    //       let node = (
    //         <NewAddress
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           fetchOrders={fetchOrders}
    //           fetchAddresses={fetchAddresses}
    //           downloadSettlements={downloadSettlements}
    //           userConfirmation={userConfirmation}
    //           fetchShipments={fetchShipments}
    //           userState={userState}
    //           orderId={route.orderId}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar('Add New Address', node, navigator, true);
    //     }
    //     if (routeId === 'support') {
    //       let node = (
    //         <Support
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           userState={userState}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar('SUPPORT', node, navigator);
    //     }
    //     if (routeId === 'rating') {
    //       let node = (
    //         <Rating
    //           fetchSellerDashboard={fetchSellerDashboard}
    //           userState={userState}
    //           ratingState={ratingState}
    //           fetchRating={fetchRating}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //         />
    //       );
    //       return this.renderWithStatusBar('RATING DETAILS', node, navigator);
    //     }
    //     if (routeId === 'filters') {
    //       let node = (
    //         <Filters
    //           name={route.name}
    //           startDate={route.startDate}
    //           endDate={route.endDate}
    //           fetchSellerDashboard={fetchSellerDashboard}
    //           userState={userState}
    //           ratingState={ratingState}
    //           fetchRating={fetchRating}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           navigator={navigator}
    //         />
    //       );
    //       Mixpanel.track('Visited RFQ Filters Page');
    //       return this.renderWithStatusBar('FILTERS', node, navigator, true);
    //     }
    //     if (routeId === 'notifications') {
    //       let node = (
    //         <Notifications
    //           fetchNotifications={fetchNotifications}
    //           updateNotifications={updateNotifications}
    //           notificationsState={notificationsState}
    //           userState={userState}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           navigator={navigator}
    //         />
    //       );
    //       Mixpanel.track('Visited Notifications Page');
    //       return this.renderWithStatusBar('NOTIFICATIONS', node, navigator, true);
    //     }
    //     if (routeId === 'faq') {
    //       Mixpanel.track('Visited FAQ Page');
    //       return this.renderWithStatusBar('FAQs', <Faq />, navigator);
    //     }
    //     if (routeId === 'myprofile') {
    //       let node = (
    //         <AccountInfoEdit
    //           userConfirmation={userConfirmation}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //         />
    //       );
    //       Mixpanel.track('Visited My Profile Page');
    //       return this.renderWithStatusBar('EDIT PROFILE', node, navigator);
    //     }
    //     if (routeId === 'account_settings') {
    //       let node = (
    //         <Account
    //           navigator={navigator}
    //           fetchAppUpdates={fetchAppUpdates}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           logout={logout}
    //         />
    //       );
    //       Mixpanel.track('Visited Account Settings Page');
    //       return this.renderWithStatusBar('SETTINGS', node, navigator);
    //     }
    //     if (routeId === 'login') {
    //       Mixpanel.track('Visited Landing Page');
    //       return (
    //         <Login
    //           name="Login"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'resetPassword') {
    //       Mixpanel.track('Clicked on Reset Password');
    //       Mixpanel.track('Visited Reset Password Page');
    //       let node = (
    //         <ResetPassword
    //           name="default"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar('RESET PASSWORD', node, navigator, true);
    //     }
    //     if (routeId === 'forgotPassword') {
    //       Mixpanel.track('Clicked on Forgot Password');
    //       Mixpanel.track('Visited Forgot Password Page');
    //       return (
    //         <ForgotPassword
    //           name="default"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'signup_personal') {
    //       loginState.loggedIn = false;
    //       return (
    //         <Login
    //           name="Login"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'signup_mobile') {
    //       loginState.loggedIn = false;
    //       return (
    //         <Login
    //           name="Login"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'signup_company') {
    //       loginState.loggedIn = false;
    //       return (
    //         <Login
    //           name="Login"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'signup_billing') {
    //       loginState.loggedIn = false;
    //       return (
    //         <Login
    //           name="Login"
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'companyProfile') {
    //       Mixpanel.track('Visited Company Profile Page');
    //       return (
    //         <CompanyProfile
    //           userState={userState}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           signupState={signupState}
    //           loadCategories={loadCategories}
    //           saveCompanyDetails={saveCompanyDetails}
    //           companyState={companyState}
    //           fetchCompany={fetchCompany}
    //           saveStatutoryData={saveStatutoryData}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'selectShipmentType') {
    //       let node = (
    //         <SelectShipmentType
    //           navigator={navigator}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           orderId={route.orderId}
    //           orderState={orderState}
    //           fetchShipments={fetchShipments}
    //         />
    //       );
    //       return this.renderWithStatusBar(
    //         'Select Shipment Type',
    //         node,
    //         navigator,
    //         true
    //       );
    //     }
    //     if (routeId === 'packageOrder') {
    //       let node = (
    //         <PackageOrder
    //           navigator={navigator}
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           orderId={route.orderId}
    //           shipmentType={route.shipmentType}
    //           fetchShipments={fetchShipments}
    //           fetchOrder={fetchOrder}
    //           orderState={orderState}
    //           createShipment={createShipment}
    //           fetchAddresses={fetchAddresses}
    //         />
    //       );
    //       return this.renderWithStatusBar('Package Order', node, navigator, true);
    //     }
    //     if (routeId === 'updateContact') {
    //       Mixpanel.track('Visited Update Contact Page');
    //       let node = (
    //         <UpdateContactNumber
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           userConfirmation={userConfirmation}
    //           userState={userState}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar(
    //         'UPDATE CONTACT DETAILS',
    //         node,
    //         navigator,
    //         true
    //       );
    //     }
    //     if (routeId === 'welcome') {
    //       return (
    //         <Welcome
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           loginState={loginState}
    //           login={login}
    //           userState={userState}
    //           fetchAppUpdates={fetchAppUpdates}
    //           getState={getState}
    //           navigator={navigator}
    //         />
    //       );
    //     }
    //     if (routeId === 'inquiry') {
    //       let node = (
    //         <Inquiry
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           name={route.name}
    //           fetchInquiry={fetchInquiry}
    //           inquiryState={inquiryState}
    //           fetchInquiryHistory={fetchInquiryHistory}
    //           inquiryHistoryState={inquiryHistoryState}
    //           inquiry_id={route.inquiry_id}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar('QUOTES DETAILS', node, navigator, true);
    //     }
    //     if (routeId === 'quote_submit') {
    //       heading = route.heading;
    //       let node = (
    //         <QuotationSubmit
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           name={route.name}
    //           inquiry_id={route.inquiry_id}
    //           heading={route.heading}
    //           inquiry={route.inquiry}
    //           submitQuote={submitQuote}
    //           fetchInquiry={fetchInquiry}
    //           inquiryState={inquiryState}
    //           editQuote={editQuote}
    //           navigator={navigator}
    //         />
    //       );
    //       Mixpanel.track('Visited Quote Edit/Submit Page');
    //       return this.renderWithStatusBar(heading, node, navigator, true);
    //     }
    //     if (routeId === 'purchase_order') {
    //       let node = (
    //         <PurchaseOrder
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           purchaseOrderState={purchaseOrderState}
    //           fetchPurchaseOrder={fetchPurchaseOrder}
    //           fetchPurchaseOrderItems={fetchPurchaseOrderItems}
    //           fetchPurchaseOrderDispatchPlans={fetchPurchaseOrderDispatchPlans}
    //           acceptPurchaseOrder={acceptPurchaseOrder}
    //           rejectPurchaseOrder={rejectPurchaseOrder}
    //           tabName={route.tabName}
    //           purchase_order_id={route.purchase_order_id}
    //           navigator={navigator}
    //         />
    //       );
    //       return this.renderWithStatusBar(route.po_number, node, navigator, true);
    //     }
    //     if (routeId === 'purchase_order_dispatch_plan') {
    //       let node = (
    //         <PurchaseOrderDispatchPlan
    //           showAlert={(type, title, message) =>
    //             this.showAlert(type, title, message)
    //           }
    //           purchaseOrderState={purchaseOrderState}
    //           acceptPurchaseOrder={acceptPurchaseOrder}
    //           rejectPurchaseOrder={rejectPurchaseOrder}
    //           plan_details={route.dispatch_plan_details}
    //           po_items={route.po_items}
    //           navigator={navigator}
    //           purchase_order_id={route.purchase_order_id}
    //         />
    //       );
    //       return this.renderWithStatusBar(
    //         route.dispatch_date,
    //         node,
    //         navigator,
    //         true
    //       );
    //     }
  }

  render() {
    //     const { logout } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Login />
      </View>
      // <NavigationExperimental.Navigator
      //           style={{ flex: 1, backgroundColor: '#e9e9e9' }}
      //           ref={'NAV'}
      //           initialRoute={{ id: 'welcome', name: 'Welcome' }}
      //           renderScene={this.renderScene.bind(this)}
      //           configureScene={(route, routeStack) =>
      //             NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
      //           }
      //         />
      //         <DropdownAlert
      //           ref={ref => (this.dropdown = ref)}
      //           titleNumOfLines={2}
      //           messageNumOfLines={5}
      //           tapToCloseEnabled={true}
      //           closeInterval={2000}
      //           containerStyle={{
      //             backgroundColor: MAIN_CUSTOM_COLOR
      //           }}
      //           onClose={data => this.onClose(data)}
      //           onCancel={data => this.onClose(data)}
      //           showCancel={true}
      //           imageSrc={require('../../img/tick.png')}
      //         />
      // </View>
    );
  }
}

Index.propTypes = {
  loginState: PropTypes.object.isRequired,
  //   // settlementState: PropTypes.object.isRequired,
  //   // productsListState: PropTypes.object.isRequired,
  //   // productState: PropTypes.object.isRequired,
  //   signupState: PropTypes.object.isRequired,
  //   userState: PropTypes.object.isRequired,
  //   notificationsState: PropTypes.object.isRequired,
  //   companyState: PropTypes.object.isRequired,
  //   // orderState: PropTypes.object.isRequired,
  //   ratingState: PropTypes.object.isRequired,
  //   purchaseOrderState: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
  //   getState: PropTypes.func.isRequired,
  //   fetchAppUpdates: PropTypes.func.isRequired,
  //   logout: PropTypes.func.isRequired,
  //   fetchSellerDashboard: PropTypes.func.isRequired,
  //   fetchNotifications: PropTypes.func.isRequired,
  //   updateNotifications: PropTypes.func.isRequired,
  //   fetchSettlements: PropTypes.func.isRequired,
  //   downloadSettlements: PropTypes.func.isRequired,
  //   fetchSettlementDetails: PropTypes.func.isRequired,
  //   resetSettlementDetailsData: PropTypes.func.isRequired,
  //   fetchAllProducts: PropTypes.func.isRequired,
  //   fetchProduct: PropTypes.func.isRequired,
  //   fetchSKU: PropTypes.func.isRequired,
  //   productReset: PropTypes.func.isRequired,
  //   signup: PropTypes.func.isRequired,
  //   sendOTP: PropTypes.func.isRequired,
  //   verifyOTP: PropTypes.func.isRequired,
  //   loadCategories: PropTypes.func.isRequired,
  //   registerCompany: PropTypes.func.isRequired,
  //   registerBillingDetails: PropTypes.func.isRequired,
  //   resetSignUpState: PropTypes.func.isRequired,
  //   userConfirmation: PropTypes.func.isRequired,
  //   fetchCompany: PropTypes.func.isRequired,
  //   saveCompanyDetails: PropTypes.func.isRequired,
  //   saveStatutoryData: PropTypes.func.isRequired,
  //   fetchOrder: PropTypes.func.isRequired,
  //   acceptOrder: PropTypes.func.isRequired,
  //   rejectOrder: PropTypes.func.isRequired,
  //   fetchOrders: PropTypes.func.isRequired,
  //   fetchAddresses: PropTypes.func.isRequired,
  //   createShipment: PropTypes.func.isRequired,
  //   fetchShipments: PropTypes.func.isRequired,
  //   fetchInquiries: PropTypes.func.isRequired,
  //   submitQuote: PropTypes.func.isRequired,
  //   fetchInquiry: PropTypes.func.isRequired,
  //   fetchInquiryHistory: PropTypes.func.isRequired,
  //   rejectBid: PropTypes.func.isRequired,
  //   fetchPurchaseOrders: PropTypes.func.isRequired,
  //   fetchPurchaseOrder: PropTypes.func.isRequired,
  //   fetchPurchaseOrderItems: PropTypes.func.isRequired,
  //   fetchPurchaseOrderDispatchPlans: PropTypes.func.isRequired,
  //   acceptPurchaseOrder: PropTypes.func.isRequired,
  //   rejectPurchaseOrder: PropTypes.func.isRequired
};

let mapStateToProps = state => {
  return {
    mainState: state,
    loginState: state.auth
    //     // settlementState: state.settlement,
    //     // productsListState: state.productsList,
    //     // productState: state.product,
    //     signupState: state.signup,
    //     userState: state.user,
    //     notificationsState: state.notifications,
    //     ratingState: state.rating,
    //     companyState: state.company,
    //     // orderState: state.order,
    //     // stockState: state.stocks,
    //     inquiryState: state.inquiry,
    //     inquiryHistoryState: state.history,
    //     purchaseOrderState: state.purchase_order
  };
};
let mapDispatchToProps = dispatch => {
  return {
    login: userCredentials => dispatch(AuthActions.login(userCredentials)),
    getState: () => dispatch(AuthActions.getLoginState())
    //     fetchAppUpdates: () => dispatch(AuthActions.fetchAppUpdates()),
    //     logout: () => dispatch(AuthActions.logout()),
    //     fetchSettlements: (page_number, size) =>
    //       dispatch(SettlementActions.fetchSettlements(page_number, size)),
    //     downloadSettlements: (from_date, to_date) =>
    //       dispatch(SettlementActions.downloadSettlements(from_date, to_date)),
    //     fetchSettlementDetails: settlement_id =>
    //       dispatch(SettlementActions.fetchSettlementDetails(settlement_id)),
    //     resetSettlementDetailsData: () =>
    //       dispatch(SettlementDetails.resetSettlementDetailsData()),
    //     fetchAllProducts: (page, per_page, search_term) =>
    //       dispatch(fetchAllProducts(page, per_page, search_term)),
    //     fetchProduct: product_id =>
    //       dispatch(ProductPageActions.fetchProduct(product_id)),
    //     fetchSKU: product_id => dispatch(ProductPageActions.fetchSKU(product_id)),
    //     productReset: () => dispatch(ProductPageActions.productReset()),
    //     validateEmail: email_id => dispatch(SignUpActions.validateEmail(email_id)),
    //     validatePhone: phone_number =>
    //       dispatch(SignUpActions.validatePhone(phone_number)),
    //     signup: userCredentials => dispatch(SignUpActions.signup(userCredentials)),
    //     sendOTP: credentials => dispatch(SignUpActions.sendOTP(credentials)),
    //     verifyOTP: credentials => dispatch(SignUpActions.verifyOTP(credentials)),
    //     loadCategories: () => dispatch(SignUpActions.loadCategories()),
    //     registerCompany: credentials =>
    //       dispatch(SignUpActions.registerCompany(credentials)),
    //     registerBillingDetails: credentials =>
    //       dispatch(SignUpActions.registerBillingDetails(credentials)),
    //     resetSignUpState: () => dispatch(SignUpActions.resetSignUpState()),
    //     userConfirmation: () => dispatch(userConfirmation()),
    //     fetchCompany: company_id => dispatch(fetchCompany(company_id)),
    //     saveCompanyDetails: (company_id, credentials) =>
    //       dispatch(saveCompanyDetails(company_id, credentials)),
    //     saveStatutoryData: (company_id, credentials) =>
    //       dispatch(saveStatutoryData(company_id, credentials)),
    //     fetchOrder: orderId => dispatch(FetchOrderActions.fetchOrder(orderId)),
    //     acceptOrder: order_id => dispatch(FetchOrderActions.acceptOrder(order_id)),
    //     rejectOrder: order_id => dispatch(FetchOrderActions.rejectOrder(order_id)),
    //     fetchOrders: (page, per_page) =>
    //       dispatch(FetchOrderActions.fetchOrders(page, per_page)),
    //     fetchAddresses: () => dispatch(FetchOrderActions.fetchAddresses()),
    //     createShipment: (order_id, shipment_details) =>
    //       dispatch(FetchOrderActions.createShipment(order_id, shipment_details)),
    //     fetchStocks: () => dispatch(StockActions.fetchStocks()),
    //     fetchSellerDashboard: () => dispatch(StockActions.fetchSellerDashboard()),
    //     fetchNotifications: options =>
    //       dispatch(NotificationActions.fetchNotifications(options)),
    //     updateNotifications: ids =>
    //       dispatch(NotificationActions.updateNotifications(ids)),
    //     fetchShipments: orderId =>
    //       dispatch(FetchOrderActions.fetchShipments(orderId)),
    //     fetchInquiries: options => dispatch(InquiryActions.fetchInquiries(options)),
    //     submitQuote: (requestData, inquiry_id) =>
    //       dispatch(InquiryActions.submitQuote(requestData, inquiry_id)),
    //     editQuote: (requestData, inquiry_id, quote_id) =>
    //       dispatch(InquiryActions.editQuote(requestData, inquiry_id, quote_id)),
    //     fetchInquiry: inquiry_id =>
    //       dispatch(InquiryActions.fetchInquiry(inquiry_id)),
    //     fetchInquiryHistory: inquiry_id =>
    //       dispatch(InquiryActions.fetchInquiryHistory(inquiry_id)),
    //     rejectBid: (inquiry_id, requestData) =>
    //       dispatch(InquiryActions.rejectBid(inquiry_id, requestData)),
    //     fetchRating: () => dispatch(RatingActions.fetchRating()),
    //     fetchPurchaseOrders: options =>
    //       dispatch(PurchaseOrderActions.fetchPurchaseOrders(options)),
    //     fetchPurchaseOrder: purchase_order_id =>
    //       dispatch(PurchaseOrderActions.fetchPurchaseOrder(purchase_order_id)),
    //     fetchPurchaseOrderItems: (options, purchase_order_id) =>
    //       dispatch(
    //         PurchaseOrderActions.fetchPurchaseOrderItems(options, purchase_order_id)
    //       ),
    //     fetchPurchaseOrderDispatchPlans: purchase_order_id =>
    //       dispatch(
    //         PurchaseOrderActions.fetchPurchaseOrderDispatchPlans(purchase_order_id)
    //       ),
    //     acceptPurchaseOrder: (item_ids, purchase_order_id) =>
    //       dispatch(
    //         PurchaseOrderActions.acceptPurchaseOrder(item_ids, purchase_order_id)
    //       ),
    //     rejectPurchaseOrder: (item_ids, purchase_order_id) =>
    //       dispatch(
    //         PurchaseOrderActions.rejectPurchaseOrder(item_ids, purchase_order_id)
    //       )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
