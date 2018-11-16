import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import CompanyDetails from './CompanyDetails';
import StatutoryInformation from './StatutoryInformation';
import Text from '../Text';
import { Button, Container, Content, Header, Tabs, Icon } from 'native-base';
import myTheme from '../../themes/light';
import { backButtonPress } from '../../commons/Utils';
import * as Colors from '../../commons/colors';
import { failedToLoadScreen } from '../Elements';

export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      imgWidth: 70
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
  }

  loadData() {
    const { userState, fetchCompany } = this.props;
    let company_id = null;
    if (userState.user && userState.user.company_id) {
      company_id = userState.user.company_id;
      fetchCompany(company_id).then(data => {
        this.setState({ req: false });
        if (data.error) {
          this.setState({ com: false, err: true });
          showAlert('info', 'Error', data.error);
        } else {
          this.setState({ com: true, err: false });
        }
      });
    }
  }

  handleBackButtonPress() {
    const { navigator } = this.props;
    backButtonPress(navigator);
  }

  renderFailedComponent() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  setImageWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let w = width;
    if (height > width) {
      w = height;
    }
    this.setState({
      imgWidth: w / 4
    });
  }

  renderImage() {
    let { companyState } = this.props;
    let { name, business_category } = companyState.data.company;
    return (
      <View
        style={{ flex: 1, backgroundColor: Colors.PRIMARY_BLUE }}
        onLayout={event => this.setImageWidth(event)}
      >
        <View
          style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' }}
        >
          <Button transparent onPress={this.handleBackButtonPress.bind(this)}>
            <Icon
              name="md-arrow-back"
              style={{ fontSize: 30, color: Colors.WHITE }}
            />
          </Button>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              source={require('../../../img/warehouse.png')}
              defaultSource={require('../../../img/warehouse.png')}
              style={{
                width: this.state.imgWidth,
                height: this.state.imgWidth,
                borderRadius: this.state.imgWidth / 2,
                borderWidth: 2,
                borderColor: 'white'
              }}
            />
            <Text
              style={{ color: Colors.WHITE, fontSize: 20, fontWeight: 'bold' }}
            >
              {name}
            </Text>
            <Text style={{ color: Colors.WHITE, fontSize: 17 }}>
              {business_category}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderContent() {
    const {
      userState,
      companyState,
      signupState,
      loadCategories,
      saveCompanyDetails,
      saveStatutoryData,
      showAlert
    } = this.props;
    return (
      <Container style={{ flex: 1 }}>
        {this.renderImage()}
        <Tabs theme={myTheme} style={{ flex: 2 }}>
          <View
            tabTextColor={Colors.SECONDARY_BLUE}
            tabLabel="Company Details"
            style={{ flex: 1 }}
            heading="Company Details"
          >
            <CompanyDetails
              companyState={companyState}
              saveCompanyDetails={saveCompanyDetails}
              showAlert={showAlert}
              loadCategories={loadCategories}
              signupState={signupState}
            />
          </View>
          <View
            tabTextColor={Colors.SECONDARY_BLUE}
            tabLabel="Statutory Information"
            style={{ flex: 1 }}
            heading="Statutory Information"
          >
            <StatutoryInformation
              userState={userState}
              saveStatutoryData={saveStatutoryData}
              showAlert={showAlert}
              companyState={companyState}
            />
          </View>
        </Tabs>
      </Container>
    );
  }

  render() {
    let { init, req, com, err } = this.state;
    if (init || req) {
      return <Spinner />;
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderFailedComponent();
    }
  }
}
