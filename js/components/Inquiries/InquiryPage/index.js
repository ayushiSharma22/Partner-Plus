import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from '../../Text';
import * as Constants from '../../../commons/Constants';
import { Spinner } from 'native-base';
import { Button } from 'react-native-elements';
import { failedToLoadScreen } from '../../Elements';
import InquiryDetails from './InquiryDetails';
import InquiryProductDetails from './InquiryProductDetail';
import InquirySpecifications from './InquirySpecifications';
import InquiryQuote from './InquiryQuote';
import InquiryQuoteHistory from './InquiryQuoteHistory';
import * as Colors from '../../../commons/colors';
import Mixpanel from 'react-native-mixpanel';

let ScreenHeight = Dimensions.get('window').height;

export default class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      data: null,
      history: null,
      progressButton: true,
      nextPropHeading: 'SUBMIT QUOTE'
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true, com: false });
    this.loadData();
  }

  loadData() {
    let { inquiry_id, fetchInquiry } = this.props;
    fetchInquiry(inquiry_id).then(data => {
      if (
        !!data.quotes[0].supplier_quote &&
        !!data.quotes[0].supplier_quote.price_per_unit
      ) {
        this.fetchHistory(data.quotes[0]);
      } else {
        let { init, req } = this.state;
        if (!!data.error) {
          if (init || req) {
            this.setState({ com: false, err: true });
          }
        } else {
          // Analytics.logEvent(EventTypes.OPEN_ORDER_EVENT, { orderId: orderId });
          this.setState({ com: true, err: false, data: data.quotes[0] });
        }
        this.setState({ init: false, req: false, ref: false });
      }
    });
  }

  fetchHistory(quote) {
    let { inquiry_id, fetchInquiryHistory } = this.props;
    fetchInquiryHistory(quote.supplier_quote.id).then(data => {
      let { init, req } = this.state;
      if (!!data.error) {
        if (init || req) {
          this.setState({ com: false, err: true });
        }
      } else {
        // Analytics.logEvent(EventTypes.OPEN_ORDER_EVENT, { orderId: orderId });
        this.setState({ com: true, err: false, data: quote, history: data });
      }
      this.setState({ init: false, req: false, ref: false });
    });
  }

  renderInquiryDetails() {
    let { status, time_remaining } = this.state.data;
    let { name } = this.props;
    return (
      <View style={{ marginTop: 10 }}>
        <InquiryDetails
          inquiry={this.state.data}
          rejectBidAction={() => this.openRejectBidModal()}
          name={name}
        />
      </View>
    );
  }

  renderProductDetails() {
    return <InquiryProductDetails inquiry={this.state.data} />;
  }

  renderInquirySpecifications() {
    if (
      !!this.state.data.product &&
      !!this.state.data.product.product_specifications
    ) {
      return <InquirySpecifications inquiry={this.state.data} />;
    }
  }

  renderQuote() {
    if (
      !!this.state.data.supplier_quote &&
      !!this.state.data.supplier_quote.price_per_unit
    ) {
      return <InquiryQuote inquiry={this.state.data} />;
    }
  }

  renderQuoteHistoryHeader() {
    if (
      !!this.state.history &&
      !!this.state.history.history_versions.length > 0
    ) {
      return (
        <View style={styles.historyHeadingView}>
          <Text style={styles.historyHeading}>QUOTE HISTORY</Text>
        </View>
      );
    }
  }

  renderQuoteHistory() {
    if (
      !!this.state.history &&
      !!this.state.history.history_versions.length > 0
    ) {
      return (
        <InquiryQuoteHistory
          history={this.state.history}
          inquiry={this.state.inquiry}
        />
      );
    }
  }

  quotationAction(btn) {
    this.setState({ progressButton: false });
    let { navigator } = this.props;
    navigator.push({
      id: 'quote_submit',
      inquiry_id: this.props.inquiry_id,
      inquiry: this.state.data,
      heading: btn,
      name: this.props.name
    });
  }

  setWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let w = 0.9 * width;
    this.setState({
      width: w,
      fullWidth: width,
      inputWidth: w - 20
    });
  }

  renderButton() {
    let { time_remaining, status, supplier_quote } = this.state.data;
    if (time_remaining && supplier_quote && supplier_quote.price_per_unit) {
      (btn = 'EDIT QUOTE'), (btnBgColor = '#00AFD7');
      show = supplier_quote.is_qualified ? false : true;
    } else if (time_remaining) {
      (btn = 'SUBMIT QUOTE'), (btnBgColor = '#54BD48');
      show = true;
    } else if (!!supplier_quote && !!supplier_quote.price_per_unit) {
      (btn = 'QUOTE ACCEPTED'), (btnBgColor = '#54BD48');
      show = false;
    } else {
      (btn = 'QUOTE LOST'), (btnBgColor = '#E84855');
      show = false;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: show ? 0.08 * ScreenHeight : 0,
          elevation: 2.5,
          shadowColor: '#000000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: {
            height: 1,
            width: 0.3
          }
        }}
        onLayout={event => this.setWidth(event)}
      >
        {!!show ? (
          <Button
            raised
            buttonStyle={{
              backgroundColor: btnBgColor,
              borderRadius: 0,
              width: this.state.fullWidth,
              padding: 10,
              height: 0.08 * ScreenHeight,
              bottom: 0,
              elevation: 1
            }}
            textStyle={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold'
            }}
            title={btn}
            onPress={() => this.quotationAction(btn)}
          />
        ) : (
          <Text />
        )}
      </View>
    );
  }

  renderContent() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView
          style={{ flex: 1 }}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          {this.renderInquiryDetails()}
          {this.renderQuote()}
          {this.renderProductDetails()}
          {this.renderInquirySpecifications()}
          {this.renderQuoteHistoryHeader()}
          {this.renderQuoteHistory()}
        </ScrollView>
        {this.renderButton()}
      </View>
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
        <TouchableOpacity onPress={this.loadData.bind(this)}>
          {failedToLoadScreen()}
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    let { init, req, com } = this.state;
    Mixpanel.track('Visited Inquiries Show Page');
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderContent();
    } else {
      return this.renderError();
    }
  }
}

const mainCard = {
  card: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 5
  },
  cardTitle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fafafa',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1
  },
  cardContent: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#fafafa',
    borderRightWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  cardFooter: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ffffff',
    padding: 0
  }
};

const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    height: 0.08 * ScreenHeight
  },
  loginButtonBackground: {
    flex: 1,
    padding: 10,
    height: 50
  },
  rejectButtonBackground: {
    flex: 1,
    padding: 10,
    height: 40
  },
  loginButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: Constants.MAIN_FONT
  },
  rejectButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Constants.MAIN_FONT
  }
});

const styles = StyleSheet.create({
  historyHeadingView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  historyHeading: {
    fontSize: 24,
    color: Colors.SECONDARY_BLUE,
    fontWeight: 'bold'
  }
});
