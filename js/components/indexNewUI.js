import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, View, Platform } from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import { backButtonPress } from '../commons/Utils';
import Home from './drawer';
import Login from './Login/Login';
import ResetPassword from './Login/resetPassword';
import ForgotPassword from './Login/forgotPassword';
import Rating from './Rating/Rating';
import Filters from './Filters/Filters';
import Notifications from './Notifications/Notifications';
import HomeDashboard from './Home/NewHome';
import UpdateContactNumber from './UpdateContactNumber/UpdateContactNumber';
import CompanyProfile from './CompanyProfile/CompanyProfile';
import Support from './Support/Support';
import Welcome from './Welcome/Welcome';
import Inquiry from './Inquiries/InquiryPage/';
import PurchaseOrder from './PurchaseOrders/PurchaseOrder/';
import PurchaseOrderDispatchPlan from './PurchaseOrders/PurchaseOrder/DispatchPlanDetails';
import QuotationSubmit from './Inquiries/InquiryPage/Quotation/';

// Import all actions
import * as AuthActions from '../actions/AuthActions';
import * as InquiryActions from '../actions/InquiryActions';
import * as PurchaseOrderActions from '../actions/PurchaseOrderActions';
import { userConfirmation } from '../actions/UserActions';
import {
  fetchCompany,
  saveCompanyDetails,
  saveStatutoryData
} from '../actions/CompanyActions';
import * as DashboardActions from '../actions/DashboardActions';
import * as RatingActions from '../actions/RatingActions';
import * as NotificationActions from '../actions/NotificationActions';

//new additions
import Account from './newui/components/account/account';
import AccountInfoEdit from './newui/components/account/accountInfoEdit';
import Faq from './FAQ/';

//Tracking Library
import Mixpanel from 'react-native-mixpanel';

const MAIN_CUSTOM_COLOR = '#4682b4';
class Index extends Component {
  constructor(props) {
    super(props);
    // this.props.client.handleUncaughtErrors();
  }
  checkAlertTitle(title) {
    if (title.includes('Error' || title.includes('error'))) {
      return true;
    }
    return false;
  }

  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  }
  onClose(data) {}

  renderWithStatusBar(name, node, navigator, back_button = false) {
    const {
      getState,
      loginState,
      userState,
      userConfirmation,
      login,
      logout,
      productReset,
      fetchNotifications
    } = this.props;
    return (
      <Home
        name={name}
        getState={getState}
        back_button={back_button}
        productReset={productReset}
        fetchNotifications={fetchNotifications}
        showAlert={(type, title, message) =>
          this.showAlert(type, title, message)
        }
        loginState={loginState}
        userState={userState}
        userConfirmation={userConfirmation}
        login={login}
        logout={logout}
        childRender={node}
        navigator={navigator}
      />
    );
  }

  renderScene(route, navigator) {
    const {
      mainState,
      loginState,
      settlementState,
      ratingState,
      signupState,
      userState,
      notificationsState,
      companyState,
      stockState,
      inquiryState,
      inquiryHistoryState,
      login,
      getState,
      fetchAppUpdates,
      logout,
      fetchRating,
      fetchSettlements,
      userConfirmation,
      fetchCompany,
      saveCompanyDetails,
      saveStatutoryData,
      fetchOrders,
      fetchAddresses,
      fetchShipments,
      fetchSellerDashboard,
      fetchNotifications,
      updateNotifications,
      fetchInquiryHistory,
      fetchInquiries,
      submitQuote,
      editQuote,
      fetchInquiry,
      fetchPurchaseOrders,
      fetchPurchaseOrder,
      fetchPurchaseOrderItems,
      fetchPurchaseOrderDispatchPlans,
      acceptPurchaseOrder,
      rejectPurchaseOrder,
      purchaseOrderState
    } = this.props;

    let routeId = route.id;
    let product_id = -1;
    if (route.product_id) {
      product_id = route.product_id;
    }
    const faqs = [
      {
        question: 'question1',
        answer: 'answer1'
      }
    ];
    if (navigator.getCurrentRoutes().length == 2 && !!userState.user) {
      Mixpanel.identify(userState.user.email);
      Mixpanel.registerSuperProperties({
        Date: new Date().toISOString(),
        $email: userState.user.email,
        Company: userState.user.company_name,
        'Company Id': userState.user.company_id,
        Platform: Platform.OS
      });
      Mixpanel.track('User Logged In');
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      let currentRoutes = navigator.getCurrentRoutes();
      let flag = false;
      if (currentRoutes[currentRoutes.length - 1].id === 'product') {
        flag = true;
      }
      let flag2 = backButtonPress(navigator);
      if (flag && flag2) {
        productReset();
      }
      return flag2;
    });

    if (routeId === 'home') {
      let node = (
        <HomeDashboard
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          settlementState={settlementState}
          activeTab={route.activeTab}
          name={route.name}
          filter={route.date_filter}
          fetchSettlements={fetchSettlements}
          userConfirmation={userConfirmation}
          userState={userState}
          fetchSellerDashboard={fetchSellerDashboard}
          stockState={stockState}
          fetchInquiries={fetchInquiries}
          inquiryState={inquiryState}
          fetchPurchaseOrders={fetchPurchaseOrders}
          fetchPurchaseOrder={fetchPurchaseOrder}
          fetchPurchaseOrderItems={fetchPurchaseOrderItems}
          fetchPurchaseOrderDispatchPlans={fetchPurchaseOrderDispatchPlans}
          acceptPurchaseOrder={acceptPurchaseOrder}
          rejectPurchaseOrder={rejectPurchaseOrder}
          purchaseOrderState={purchaseOrderState}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar('default', node, navigator);
    }
    if (routeId === 'newAddress') {
      let node = (
        <NewAddress
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          fetchOrders={fetchOrders}
          fetchAddresses={fetchAddresses}
          downloadSettlements={downloadSettlements}
          userConfirmation={userConfirmation}
          fetchShipments={fetchShipments}
          userState={userState}
          orderId={route.orderId}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar('Add New Address', node, navigator, true);
    }
    if (routeId === 'support') {
      let node = (
        <Support
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          userState={userState}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar('SUPPORT', node, navigator);
    }
    if (routeId === 'rating') {
      let node = (
        <Rating
          fetchSellerDashboard={fetchSellerDashboard}
          userState={userState}
          ratingState={ratingState}
          fetchRating={fetchRating}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
        />
      );
      return this.renderWithStatusBar('RATING DETAILS', node, navigator);
    }
    if (routeId === 'filters') {
      let node = (
        <Filters
          name={route.name}
          startDate={route.startDate}
          endDate={route.endDate}
          fetchSellerDashboard={fetchSellerDashboard}
          userState={userState}
          ratingState={ratingState}
          fetchRating={fetchRating}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          navigator={navigator}
        />
      );
      Mixpanel.track('Visited RFQ Filters Page');
      return this.renderWithStatusBar('FILTERS', node, navigator, true);
    }
    if (routeId === 'notifications') {
      let node = (
        <Notifications
          fetchNotifications={fetchNotifications}
          updateNotifications={updateNotifications}
          notificationsState={notificationsState}
          userState={userState}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          navigator={navigator}
        />
      );
      Mixpanel.track('Visited Notifications Page');
      return this.renderWithStatusBar('NOTIFICATIONS', node, navigator, true);
    }
    if (routeId === 'faq') {
      Mixpanel.track('Visited FAQ Page');
      return this.renderWithStatusBar('FAQs', <Faq />, navigator);
    }
    if (routeId === 'myprofile') {
      let node = (
        <AccountInfoEdit
          userConfirmation={userConfirmation}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
        />
      );
      Mixpanel.track('Visited My Profile Page');
      return this.renderWithStatusBar('EDIT PROFILE', node, navigator);
    }
    if (routeId === 'account_settings') {
      let node = (
        <Account
          navigator={navigator}
          fetchAppUpdates={fetchAppUpdates}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          logout={logout}
        />
      );
      Mixpanel.track('Visited Account Settings Page');
      return this.renderWithStatusBar('SETTINGS', node, navigator);
    }
    if (routeId === 'login') {
      Mixpanel.track('Visited Landing Page');
      return (
        <Login
          name="Login"
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          loginState={loginState}
          login={login}
          userState={userState}
          getState={getState}
          navigator={navigator}
        />
      );
    }
    if (routeId === 'resetPassword') {
      Mixpanel.track('Clicked on Reset Password');
      Mixpanel.track('Visited Reset Password Page');
      let node = (
        <ResetPassword
          name="default"
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          loginState={loginState}
          login={login}
          getState={getState}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar('RESET PASSWORD', node, navigator, true);
    }
    if (routeId === 'forgotPassword') {
      Mixpanel.track('Clicked on Forgot Password');
      Mixpanel.track('Visited Forgot Password Page');
      return (
        <ForgotPassword
          name="default"
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          loginState={loginState}
          login={login}
          getState={getState}
          navigator={navigator}
        />
      );
    }
    if (routeId === 'companyProfile') {
      Mixpanel.track('Visited Company Profile Page');
      return (
        <CompanyProfile
          userState={userState}
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          signupState={signupState}
          loadCategories={loadCategories}
          saveCompanyDetails={saveCompanyDetails}
          companyState={companyState}
          fetchCompany={fetchCompany}
          saveStatutoryData={saveStatutoryData}
          navigator={navigator}
        />
      );
    }
    if (routeId === 'updateContact') {
      Mixpanel.track('Visited Update Contact Page');
      let node = (
        <UpdateContactNumber
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          userConfirmation={userConfirmation}
          userState={userState}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar(
        'UPDATE CONTACT DETAILS',
        node,
        navigator,
        true
      );
    }
    if (routeId === 'welcome') {
      return (
        <Welcome
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          loginState={loginState}
          login={login}
          userState={userState}
          fetchAppUpdates={fetchAppUpdates}
          getState={getState}
          navigator={navigator}
        />
      );
    }
    if (routeId === 'inquiry') {
      let node = (
        <Inquiry
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          name={route.name}
          fetchInquiry={fetchInquiry}
          inquiryState={inquiryState}
          fetchInquiryHistory={fetchInquiryHistory}
          inquiryHistoryState={inquiryHistoryState}
          inquiry_id={route.inquiry_id}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar('QUOTES DETAILS', node, navigator, true);
    }
    if (routeId === 'quote_submit') {
      heading = route.heading;
      let node = (
        <QuotationSubmit
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          name={route.name}
          inquiry_id={route.inquiry_id}
          heading={route.heading}
          inquiry={route.inquiry}
          submitQuote={submitQuote}
          fetchInquiry={fetchInquiry}
          inquiryState={inquiryState}
          editQuote={editQuote}
          navigator={navigator}
        />
      );
      Mixpanel.track('Visited Quote Edit/Submit Page');
      return this.renderWithStatusBar(heading, node, navigator, true);
    }
    if (routeId === 'purchase_order') {
      let node = (
        <PurchaseOrder
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          purchaseOrderState={purchaseOrderState}
          fetchPurchaseOrder={fetchPurchaseOrder}
          fetchPurchaseOrderItems={fetchPurchaseOrderItems}
          fetchPurchaseOrderDispatchPlans={fetchPurchaseOrderDispatchPlans}
          acceptPurchaseOrder={acceptPurchaseOrder}
          rejectPurchaseOrder={rejectPurchaseOrder}
          tabName={route.tabName}
          purchase_order_id={route.purchase_order_id}
          navigator={navigator}
        />
      );
      return this.renderWithStatusBar(route.po_number, node, navigator, true);
    }
    if (routeId === 'purchase_order_dispatch_plan') {
      let node = (
        <PurchaseOrderDispatchPlan
          showAlert={(type, title, message) =>
            this.showAlert(type, title, message)
          }
          purchaseOrderState={purchaseOrderState}
          acceptPurchaseOrder={acceptPurchaseOrder}
          rejectPurchaseOrder={rejectPurchaseOrder}
          plan_details={route.dispatch_plan_details}
          po_items={route.po_items}
          navigator={navigator}
          purchase_order_id={route.purchase_order_id}
        />
      );
      return this.renderWithStatusBar(
        route.dispatch_date,
        node,
        navigator,
        true
      );
    }
  }

  render() {
    const { logout } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationExperimental.Navigator
          style={{ flex: 1, backgroundColor: '#e9e9e9' }}
          ref={'NAV'}
          initialRoute={{ id: 'welcome', name: 'Welcome' }}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route, routeStack) =>
            NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
          }
        />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          titleNumOfLines={2}
          messageNumOfLines={5}
          tapToCloseEnabled={true}
          closeInterval={2000}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR
          }}
          onClose={data => this.onClose(data)}
          onCancel={data => this.onClose(data)}
          showCancel={true}
          imageSrc={require('../../img/tick.png')}
        />
      </View>
    );
  }
}

Index.propTypes = {
  loginState: PropTypes.object.isRequired,
  signupState: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  notificationsState: PropTypes.object.isRequired,
  companyState: PropTypes.object.isRequired,
  ratingState: PropTypes.object.isRequired,
  purchaseOrderState: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  fetchAppUpdates: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  fetchSellerDashboard: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  userConfirmation: PropTypes.func.isRequired,
  fetchCompany: PropTypes.func.isRequired,
  saveCompanyDetails: PropTypes.func.isRequired,
  saveStatutoryData: PropTypes.func.isRequired,
  fetchInquiries: PropTypes.func.isRequired,
  submitQuote: PropTypes.func.isRequired,
  fetchInquiry: PropTypes.func.isRequired,
  fetchInquiryHistory: PropTypes.func.isRequired,
  rejectBid: PropTypes.func.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  fetchPurchaseOrder: PropTypes.func.isRequired,
  fetchPurchaseOrderItems: PropTypes.func.isRequired,
  fetchPurchaseOrderDispatchPlans: PropTypes.func.isRequired,
  acceptPurchaseOrder: PropTypes.func.isRequired,
  rejectPurchaseOrder: PropTypes.func.isRequired
};

let mapStateToProps = state => {
  return {
    mainState: state,
    loginState: state.auth,
    // settlementState: state.settlement,
    // productsListState: state.productsList,
    // productState: state.product,
    signupState: state.signup,
    userState: state.user,
    notificationsState: state.notifications,
    ratingState: state.rating,
    companyState: state.company,
    // orderState: state.order,
    // stockState: state.stocks,
    inquiryState: state.inquiry,
    inquiryHistoryState: state.history,
    purchaseOrderState: state.purchase_order
  };
};
let mapDispatchToProps = dispatch => {
  return {
    login: userCredentials => dispatch(AuthActions.login(userCredentials)),
    getState: () => dispatch(AuthActions.getLoginState()),
    fetchAppUpdates: () => dispatch(AuthActions.fetchAppUpdates()),
    logout: () => dispatch(AuthActions.logout()),
    userConfirmation: () => dispatch(userConfirmation()),
    fetchCompany: company_id => dispatch(fetchCompany(company_id)),
    saveCompanyDetails: (company_id, credentials) =>
      dispatch(saveCompanyDetails(company_id, credentials)),
    saveStatutoryData: (company_id, credentials) =>
      dispatch(saveStatutoryData(company_id, credentials)),
    fetchSellerDashboard: () =>
      dispatch(DashboardActions.fetchSellerDashboard()),
    fetchNotifications: options =>
      dispatch(NotificationActions.fetchNotifications(options)),
    updateNotifications: ids =>
      dispatch(NotificationActions.updateNotifications(ids)),
    fetchInquiries: options => dispatch(InquiryActions.fetchInquiries(options)),
    submitQuote: (requestData, inquiry_id) =>
      dispatch(InquiryActions.submitQuote(requestData, inquiry_id)),
    editQuote: (requestData, inquiry_id, quote_id) =>
      dispatch(InquiryActions.editQuote(requestData, inquiry_id, quote_id)),
    fetchInquiry: inquiry_id =>
      dispatch(InquiryActions.fetchInquiry(inquiry_id)),
    fetchInquiryHistory: inquiry_id =>
      dispatch(InquiryActions.fetchInquiryHistory(inquiry_id)),
    rejectBid: (inquiry_id, requestData) =>
      dispatch(InquiryActions.rejectBid(inquiry_id, requestData)),
    fetchRating: () => dispatch(RatingActions.fetchRating()),
    fetchPurchaseOrders: options =>
      dispatch(PurchaseOrderActions.fetchPurchaseOrders(options)),
    fetchPurchaseOrder: purchase_order_id =>
      dispatch(PurchaseOrderActions.fetchPurchaseOrder(purchase_order_id)),
    fetchPurchaseOrderItems: (options, purchase_order_id) =>
      dispatch(
        PurchaseOrderActions.fetchPurchaseOrderItems(options, purchase_order_id)
      ),
    fetchPurchaseOrderDispatchPlans: purchase_order_id =>
      dispatch(
        PurchaseOrderActions.fetchPurchaseOrderDispatchPlans(purchase_order_id)
      ),
    acceptPurchaseOrder: (item_ids, purchase_order_id) =>
      dispatch(
        PurchaseOrderActions.acceptPurchaseOrder(item_ids, purchase_order_id)
      ),
    rejectPurchaseOrder: (item_ids, purchase_order_id) =>
      dispatch(
        PurchaseOrderActions.rejectPurchaseOrder(item_ids, purchase_order_id)
      )
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
