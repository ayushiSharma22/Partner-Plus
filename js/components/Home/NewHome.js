import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import Settlements from '../Settlements/Settlements';
import Dashboard from './Dashboard';
import Inquiries from '../Inquiries/Inquiries';
import PurchaseOrders from '../PurchaseOrders/PurchaseOrders';
import DispatchPlans from '../DispatchPlans/DispatchPlans';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenWidth = Dimensions.get('window').width;
let iconSize = 0.05 * ScreenWidth;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'dashboard',
      activeTab: this.props.activeTab ? this.props.activeTab : 'home',
      loading: false,
      fontSize: 8,
      width: 400,
      height: 400
    };
  }

  tabs = [
    {
      key: 'home',
      name: 'outline-home-24px',
      nameActive: 'baseline-home-24px',
      label: 'HOME',
      barColor: '#FFFFFF',
      labelActive: { color: '#00AFD7' }
    },
    {
      key: 'quotes',
      name: 'target-outlines-quotes',
      nameActive: 'bid',
      label: 'QUOTES',
      barColor: '#FFFFFF'
    },
    {
      key: 'po',
      name: 'outline-file_copy-24px',
      nameActive: 'outline-file_copy-24px_active',
      label: 'PO',
      barColor: '#FFFFFF'
    },
    {
      key: 'dispatch-plan',
      name: 'plan',
      nameActive: 'plan',
      label: 'DISPATCH PLAN',
      barColor: '#FFFFFF'
    },
    {
      key: 'settlements',
      name: 'rupee_settlement',
      nameActive: 'rupee_settlement',
      label: 'SETTLEMENTS',
      barColor: '#FFFFFF'
    }
  ];

  renderIcon = uri => ({ isActive }) => (
    <Icon size={iconSize} color={isActive ? '#00AFD7' : '#54575A'} name={uri} />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={tab.key === this.state.activeTab}
      key={tab.key}
      label={tab.label}
      labelStyle={{
        color: tab.key === this.state.activeTab ? '#00AFD7' : '#54575A',
        fontSize: this.state.fontSize
      }}
      renderIcon={this.renderIcon(tab.name)}
      style={styles.bottomNavigationStyle}
    />
  );

  startLoading() {
    this.setState({ loading: true });
  }

  doneLoading() {
    this.setState({ loading: false });
  }

  setHeightWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let size = 0.02 * width;
    this.setState({
      width: width,
      height: height,
      fontSize: size
    });
  }

  render() {
    let tab = this.state.activeTab;
    if (tab === 'home') {
      showView = (
        <Dashboard
          {...this.props}
          startLoading={() => this.startLoading()}
          doneLoading={() => this.doneLoading()}
        />
      );
    } else if (tab === 'quotes') {
      showView = (
        <Inquiries
          {...this.props}
          startLoading={() => this.startLoading()}
          doneLoading={() => this.doneLoading()}
        />
      );
    } else if (tab === 'po') {
      showView = (
        <PurchaseOrders
          {...this.props}
          startLoading={() => this.startLoading()}
          doneLoading={() => this.doneLoading()}
        />
      );
    } else if (tab === 'dispatch-plan') {
      showView = (
        <DispatchPlans
          {...this.props}
          startLoading={() => this.startLoading()}
          doneLoading={() => this.doneLoading()}
        />
      );
    } else if (tab === 'settlements') {
      showView = (
        <Settlements
          {...this.props}
          startLoading={() => this.startLoading()}
          doneLoading={() => this.doneLoading()}
        />
      );
    }
    return (
      <View style={{ flex: 1 }} onLayout={event => this.setHeightWidth(event)}>
        <View style={{ flex: 1 }}>{showView}</View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          rippleColor="white"
          useLayoutAnimation={true}
          renderTab={this.renderTab}
          tabs={this.tabs}
          style={styles.bottomNavigationStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabPanel: {
    backgroundColor: 'white',
    height: 50,
    elevation: 1,
    flexDirection: 'row',
    marginBottom: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  svgImage: {
    height: 0.05 * ScreenWidth,
    width: 0.02 * ScreenWidth
  },
  bottomNavigationStyle: {
    paddingLeft: 0.01 * ScreenWidth,
    paddingRight: 0.01 * ScreenWidth
  }
});
