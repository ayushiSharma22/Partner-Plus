import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { px, em } from '../../commons/helper';
import * as Constants from '../../commons/Constants';
import { failedToLoadScreen } from '../Elements';
import * as Colors from '../../commons/colors';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import DashboardCard from './DashboardCard';
import ExpiringInquiryCard from './ExpiringInquiryCard';
import PurchaseOrderCard from './PurchaseOrderCard';
import Mixpanel from 'react-native-mixpanel';

let ScreenHeight = Dimensions.get('window').height;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      userData: null,
      dashboard: null,
      inquirySummary: null,
      imgWidth: 65
    };
  }

  componentDidMount() {
    Mixpanel.track('Visited Dashboard');
    this.props.startLoading();
    this.loadData();
  }

  openRating() {
    let { navigator } = this.props;
    navigator.push({ id: 'rating' });
  }

  openRFQ(sortBy) {
    Mixpanel.track('Clicked Expiring Inquiry Card');
    let { navigator } = this.props;
    navigator.push({ id: 'home', sort: { sortBy }, activeTab: 'quotes' });
  }

  openPurchaseOrders() {
    Mixpanel.track('Clicked Expiring Inquiry Card');
    let { navigator } = this.props;
    navigator.push({ id: 'home', activeTab: 'po' });
  }

  loadData() {
    const { userState } = this.props;
    this.setState({ init: false, req: true, userData: userState });
    this.loadNameCard();
  }

  loadNameCard() {
    let { fetchSellerDashboard, showAlert } = this.props;
    fetchSellerDashboard().then(data => {
      let { req } = this.state;
      if (data.error) {
        showAlert('info', 'Error', data.error);
        if (req) {
          this.setState({ err: true });
        }
      } else {
        this.setState({ com: true, dashboard: data });
      }
      this.setState({ req: false, ref: false });
      this.props.doneLoading();
    });
  }

  handleRefresh() {
    this.setState({ ref: true, com: false });
    this.loadNameCard();
  }

  renderHeader() {
    return <View style={styles.homeHeader}>{this.renderHomeHeader()}</View>;
  }

  renderFailedComponent() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.loadData()}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  renderHome() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.ref}
            onRefresh={() => this.handleRefresh()}
          />
        }
        style={styles.mainScroll}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.mainBackground}>{this.renderHeader()}</View>
      </ScrollView>
    );
  }

  renderHomeHeader() {
    let { userData, dashboard } = this.state;
    return (
      <View>
        <DashboardCard
          userData={userData}
          rating={dashboard.rating_statistics}
          openRating={() => this.openRating()}
        />
        <ExpiringInquiryCard
          totalInquiry={dashboard.inquiry_stats.open_inquiries_count}
          expiringInquiry={dashboard.inquiry_stats.expiring_in_24_hours}
          openRFQ={() => this.openRFQ()}
        />
        <PurchaseOrderCard
          openPurchaseOrdersCount={
            dashboard.po_statistics.pending_po_items_count
          }
          openPurchaseOrders={() => this.openPurchaseOrders()}
        />
      </View>
    );
  }

  render() {
    if (this.state.com) {
      return this.renderHome();
    } else if (this.state.err) {
      return this.renderFailedComponent();
    } else {
      return <Spinner />;
    }
  }
}

const styles = MediaQueryStyleSheet.create(
  {
    mainBackground: {
      backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
      padding: 5
    },
    mainScroll: {
      backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
      height: ScreenHeight
    },
    bar: {
      marginLeft: px(20)
    },
    bottomText: {
      marginTop: 20,
      fontSize: 10,
      fontFamily: Constants.MAIN_FONT
    },
    starMain: {
      marginLeft: em(1.4),
      zIndex: 2
    },
    whiteStar: {
      width: em(3),
      height: em(3),
      left: em(2),
      position: 'absolute',
      top: em(0.8)
    },
    sectionStyle: {
      flex: 4,
      minHeight: px(70)
    },
    headerRating: {
      color: Colors.STAR_YELLOW,
      position: 'absolute',
      top: em(1.6),
      left: em(3.2),
      fontSize: 15,
      backgroundColor: 'transparent',
      fontWeight: '900'
    },
    homeHeader: {
      backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
      marginBottom: px(2),
      paddingBottom: px(1)
    },
    redButton: {
      color: Colors.RED
    },
    primaryButton: {
      color: Colors.PRIMARY_BLUE
    },
    nextButtonStyle: {
      padding: px(3),
      borderRadius: 0,
      margin: px(5)
    },
    nextButtonLabel: {
      color: 'white',
      fontSize: 16
    },
    inquiriesText: {
      fontSize: em(0.7),
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      paddingTop: 50,
      color: Colors.PRIMARY_BLUE
    },
    expiringInquiriesText: {
      fontSize: 10,
      color: Colors.RED,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 0,
      fontWeight: '600'
    },
    welcomeFlex: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: px(3),
      backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
      borderRadius: 10,
      margin: 5,
      elevation: 1,
      shadowColor: Colors.TEXT_BLACK,
      shadowOffset: {
        width: 10,
        height: 10
      }
    },
    secondaryBackground: {
      marginTop: px(3),
      padding: px(2),
      backgroundColor: Colors.SECONDARY_BLUE
    },
    titleName: {
      color: Colors.WHITE,
      fontSize: 12,
      fontWeight: '900'
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.TEXT_BLACK,
      fontFamily: Constants.MAIN_FONT
    },
    dataQuantity: {
      fontSize: 20,
      fontWeight: '900',
      marginRight: 10
    },
    dataText: {
      fontSize: 12,
      fontWeight: 'normal',
      marginTop: 5
    },
    blue: {
      color: Colors.SECONDARY_BLUE
    },
    green: {
      color: Colors.GREEN
    },
    headerMain: {
      fontSize: 14,
      marginTop: px(2.5),
      marginBottom: px(1)
    },
    header: {
      fontSize: 18,
      marginLeft: px(3.7),
      marginTop: px(2.5),
      marginBottom: px(2.5)
    },
    headerLight: {
      marginLeft: px(3.7),
      marginBottom: px(2)
    },
    marginBottom: {
      marginBottom: 15
    },
    noData: {
      color: Colors.PRIMARY_BLUE,
      fontSize: em(1.2),
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      paddingTop: 50
    }
  },
  {
    '@media (min-device-height: 720)': {
      whiteStar: {
        left: em(1.7),
        top: em(0.6)
      },
      headerRating: {
        left: em(3),
        top: em(1.5)
      }
    },
    '@media (min-device-width: 321)': {
      whiteStar: {
        left: em(1.6),
        top: em(0.5)
      },
      headerRating: {
        left: em(2.9),
        top: em(1.4)
      }
    }
  }
);
