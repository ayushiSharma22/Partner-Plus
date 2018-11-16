import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from '../Text';
import * as Colors from '../../commons/colors';
import { px } from '../../commons/helper';
import Tab from './Tab';
import { Spinner } from 'native-base';
import { renderEmptyScreen, failedToLoadScreen } from '../Elements';
import InquiryCard from './InquiryCard';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mixpanel from 'react-native-mixpanel';

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

let tabs = [
  {
    name: '',
    label: 'Request',
    heading: 'REQUEST FOR QUOTES'
  },
  {
    name: 'given',
    label: 'Given',
    heading: 'QUOTES GIVEN'
  },
  {
    name: 'accepted',
    label: 'Accepted',
    heading: 'QUOTES ACCEPTED'
  },
  {
    name: 'lost',
    label: 'Lost',
    heading: 'QUOTES LOST'
  }
];

export default class Inquiries extends Component {
  constructor(props) {
    super(props);
    let { options, filter, name } = this.props;
    if (!options) {
      options = {};
    }
    if (!filter) {
      filter = { startDate: '', endDate: '' };
    }
    req_params = {
      page: 1,
      per_page: 5,
      status: options.status || '',
      validity_time: options.time || '',
      date_filter: filter
    };
    if (!name) {
      name = tabs[0].heading;
    }
    req_params = Object.assign({}, req_params, options);
    this.state = {
      init: true,
      req: false,
      ref: false,
      com: false,
      err: false,
      laz: false,
      width: 300,
      errorMessage: false,
      data: null,
      count: 0,
      selectedTab: '',
      buttonState: 'idle',
      clearButtonState: 'idle',
      req_params: req_params,
      name: name,
      showLabel: true
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData(this.state.req_params);
    this.timeoutHandle = setTimeout(() => {
      this.setState({ showLabel: false });
    }, 3000);
  }

  handleBackButtonClick() {
    let { navigator } = this.props;
    navigator.pop();
  }

  loadData(options) {
    let { fetchInquiries, showAlert } = this.props;
    fetchInquiries(options).then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        showAlert('info', 'Error', data.error);
        if (init || req) {
          this.setState({ err: true });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevState = this.props.inquiryState;
    const nextState = nextProps.inquiryState;

    let { init, req, ref, laz } = this.state;

    if (!prevState.complete && nextState.complete) {
      if (init || req || ref) {
        this.setState({
          init: false,
          req: false,
          ref: false,
          com: true,
          data: nextState.data.quotes,
          count: nextState.data.quote_count
        });
      } else if (laz) {
        let newData = nextState.data.quotes;
        newData = this.state.data.concat(nextState.data.quotes);
        new_params = this.state.req_params;
        new_params.page++;
        this.setState({
          laz: false,
          data: newData,
          count: nextState.data.quote_count,
          req_params: new_params
        });
      }
    }
  }

  _onRefresh() {
    new_params = Object.assign({}, this.state.req_params, {
      page: 1
    });
    this.setState({ req: true, ref: false, req_params: new_params });
    this.loadData(new_params);
  }

  openInquiry(inquiry_id, name) {
    let { navigator } = this.props;
    navigator.push({ id: 'inquiry', inquiry_id: inquiry_id, name: name });
  }

  renderInquiries() {
    all_inquiries = this.state.data;
    name = this.state.name;
    if (all_inquiries.length > 0) {
      component = [];
      for (var i = 0; i < all_inquiries.length; i++) {
        inquiry =
          name === 'REQUEST FOR QUOTES' || name === 'QUOTES GIVEN'
            ? all_inquiries[i].quote_by_category[0]
            : all_inquiries[i];
        component.push(
          <View key={i}>
            <InquiryCard
              inquiry={inquiry}
              inquiry_index={i}
              openInquiry={(inquiry_id, name) =>
                this.openInquiry(inquiry_id, name)
              }
              name={name}
            />
          </View>
        );
      }
      return component;
    } else {
      return renderEmptyScreen(
        'No Quotes',
        "Currently you don't have any active Quotes in this Section"
      );
    }
  }

  changeTab(index) {
    if (!this.state.ref && !this.state.req) {
      new_params = Object.assign({}, this.state.req_params, {
        status: tabs[index].name,
        page: 1
      });
      this.setState({
        req: true,
        com: false,
        err: false,
        req_params: new_params,
        name: tabs[index].heading
      });
      this.loadData(new_params);
    }
  }

  makeItems = (nItems, tabs, styles) => {
    const items = [];
    active_tab = this.state.req_params.status;
    for (tab in tabs) {
      active = false;
      if (active_tab === tabs[tab].name) {
        active = true;
      }
      items[tab] = (
        <Tab
          key={tab}
          label={tabs[tab].label}
          active={active}
          tab_index={tab}
          changeTab={index => this.changeTab(index)}
        />
      );
    }
    return items;
  };

  renderTabs() {
    items = [];
    items.push(
      <ScrollView
        key="scrollView"
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flex: 1 }}
        style={styles.scrollViewStyle}
      >
        {this.makeItems(tabs.length, tabs, [
          styles.itemWrapper,
          styles.horizontalItemWrapper
        ])}
      </ScrollView>
    );
    const horizontalScrollView = <View style={styles.scrollView}>{items}</View>;
    return horizontalScrollView;
  }

  lazyLoad() {
    let { init, req, ref, laz, count, data } = this.state;
    req_params = Object.assign({}, this.state.req_params);
    req_params.page++;
    if (!init && !req && !ref && !laz) {
      if (count > data.length) {
        this.setState({ laz: true });
        this.loadData(req_params);
      }
    }
  }

  onScroll(e) {
    var windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      this.lazyLoad();
    }
  }

  renderContent() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.BACKGROUND_LIGHT_GREY }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.ref}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        onScroll={this.onScroll.bind(this)}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        {this.renderInquiries()}
      </ScrollView>
    );
  }

  renderLoading() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Spinner />
        </View>
      </View>
    );
  }

  renderError() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.loadData(this.state.req_params)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  renderStages() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }

  openFilters() {
    let { navigator } = this.props;
    navigator.push({
      id: 'filters',
      name: this.state.name,
      startDate: this.state.req_params.date_filter.startDate,
      endDate: this.state.req_params.date_filter.endDate
    });
  }

  clearFilters() {
    new_params = Object.assign({}, this.state.req_params, {
      page: 1,
      date_filter: { startDate: '', endDate: '' }
    });
    this.setState({ req: true, ref: false, req_params: new_params });
    this.loadData(new_params);
  }

  render() {
    Mixpanel.track('Visited Inquiries Page');
    let { showLabel } = this.state;
    if (!this.state.req_params.date_filter.startDate) {
      iconname = 'filter';
      buttonColor = '#00AFD7';
      title = 'Filters';
    } else {
      iconname = 'remove';
      buttonColor = '#E84855';
      title = 'Clear Filters';
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.renderTabs()}
        {this.renderStages()}
        <FAB
          large
          title={'Title'}
          buttonColor={buttonColor}
          visible={true}
          iconTextColor={'#FFFFFF'}
          iconTextComponent={<Icon name={iconname} />}
          onClickAction={
            !this.state.req_params.date_filter.startDate
              ? this.openFilters.bind(this)
              : this.clearFilters.bind(this)
          }
        />
        <View style={[styles.floatView]}>
          {showLabel && iconname == 'remove' ? (
            <Text style={styles.floatTitle}>{title}</Text>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    elevation: 2,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    },
    backgroundColor: Colors.TEXT_BLACK
  },
  itemWrapper: {
    padding: px(3)
  },
  horizontalItemWrapper: {
    color: Colors.TEXT_BLACK
  },
  scrollViewStyle: {
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: Colors.TEXT_BLACK
  },
  filterButton: {
    fontSize: 10,
    color: Colors.TEXT_BLACK
  },
  floatView: {
    position: 'absolute',
    bottom: 0.045 * ScreenHeight,
    right: 0.2 * ScreenWidth,
    backgroundColor: Colors.WHITE,
    elevation: 1
  },
  floatTitle: {
    color: Colors.SECONDARY_BLUE,
    padding: 10
  }
});
