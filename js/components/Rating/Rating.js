import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  BackHandler
} from 'react-native';
import Text from '../Text';
import { Spinner } from 'native-base';
import { px } from '../../commons/helper';
import * as Colors from '../../commons/colors';
import * as Constants from '../../commons/Constants';
import { Grid, Row, Col } from 'react-native-easy-grid';
let ScreenHeight = Dimensions.get('window').height;
import ProgressBar from 'react-native-progress/Bar';
import { failedToLoadScreen } from '../Elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../selection.json';
const IconSvg = createIconSetFromIcoMoon(icomoonConfig);
import Mixpanel from 'react-native-mixpanel';
import NumberFormat from 'react-number-format';

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.03 * ScreenWidth;

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      req: false,
      com: false,
      err: false,
      ref: false,
      rating: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { fetchSellerDashboard, userState } = this.props;
    this.setState({ init: false, req: true, userData: userState });
    this.loadRatingData();
  }

  loadRatingData() {
    let { fetchRating, showAlert } = this.props;
    fetchRating().then(data => {
      let { req } = this.state;
      if (data.error) {
        showAlert('info', 'Error', data.error);
        if (req) {
          this.setState({ err: true });
        }
      } else {
        this.setState({ com: true, rating: data });
      }
      this.setState({ req: false, ref: false });
    });
  }

  handleRefresh() {
    const { fetchRating, showAlert } = this.props;
    this.setState({
      ref: true
    });
    this.loadRatingData();
  }

  renderReachRatingCard() {
    let { current_rating } = this.state.rating;
    targetRating = 5;
    if (current_rating > 4.5) {
      (targetRating = 5), (targetOutstanding = 70);
    } else if (current_rating > 4) {
      (targetRating = 4.5), (targetOutstanding = 70);
    } else if (current_rating > 3.5) {
      (targetRating = 4), (targetOutstanding = 50);
    } else {
      (targetRating = 3.5), (targetOutstanding = 40);
    }
    if (current_rating == 5) {
      //do nothing
    } else {
      return (
        <View style={styles.greenCard}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.greenCardText}>Reach </Text>
            <Text style={styles.greenCardTextBold}>{targetRating}</Text>
            <View style={styles.ratingWhite}>
              <Icon size={svgWidth} color="#FFFFFF" name="star" />
            </View>
            <Text style={styles.greenCardText}> and get upto </Text>
            <Text style={styles.greenCardTextBold}>
              {targetOutstanding}% outstanding
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.greenCardText}> amount paid early!!! </Text>
          </View>
        </View>
      );
    }
  }

  renderRatingDetailsCard() {
    let { user } = this.props.userState;
    let { current_rating, outstanding_percentage } = this.state.rating;
    return (
      <View style={styles.ratingDetailsCard}>
        <Grid style={{ flexDirection: 'row' }}>
          <Col size={60}>
            <Text style={styles.headerMain}>Dear,</Text>
            <Text style={styles.profileName}>{user.name}</Text>
            {current_rating < 3.5 ? (
              <Text style={styles.normalText}>
                You have achieved a rating of {current_rating}. To increase your
                Rating, use{' '}
                <Text style={styles.highlightText}>PARTNER PLUS</Text> for{' '}
                <Text style={styles.highlightText}>RFQ, PO acceptance</Text> and
                adhere to the{' '}
                <Text style={styles.highlightText}>deadlines.</Text>
              </Text>
            ) : (
              <Text style={styles.normalText}>
                Congratulations, you have achieved a rating of {current_rating}.
                Since your ratings are high, these are benefits you may receive
              </Text>
            )}
          </Col>
          <Col size={40}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: px(10)
              }}
            >
              <View style={styles.ratingBox}>
                <View style={styles.alignMiddle}>
                  <Text style={styles.userRating}>{current_rating}</Text>
                  <Text style={styles.userRatingText}>out of 5</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10
                }}
              >
                <Icon
                  size={svgWidth}
                  color={current_rating > 0.5 ? '#FFD54F' : '#F9F9F9'}
                  name="star"
                  style={styles.starMargin}
                />
                <Icon
                  size={svgWidth}
                  color={current_rating > 1.5 ? '#FFD54F' : '#F9F9F9'}
                  name="star"
                  style={styles.starMargin}
                />
                <Icon
                  size={svgWidth}
                  color={current_rating > 2.5 ? '#FFD54F' : '#F9F9F9'}
                  name="star"
                  style={styles.starMargin}
                />
                <Icon
                  size={svgWidth}
                  color={current_rating > 3.5 ? '#FFD54F' : '#F9F9F9'}
                  name="star"
                  style={styles.starMargin}
                />
                <Icon
                  size={svgWidth}
                  color={current_rating > 4.5 ? '#FFD54F' : '#F9F9F9'}
                  name="star"
                  style={styles.starMargin}
                />
              </View>
            </View>
          </Col>
        </Grid>
        {current_rating < 3.5 ? (
          <Text />
        ) : (
          <Grid style={{ flexDirection: 'row' }}>
            <Col>
              <View>
                <Text style={styles.conditionsText}>
                  • &nbsp; Upto {outstanding_percentage}% of outstanding amount
                  may be &nbsp;
                  <Text style={styles.highlightText}>
                    paid early (can be as soon as within 15 days).
                  </Text>
                </Text>
                <Text style={styles.conditionsText}>
                  • &nbsp;
                  <Text style={styles.highlightText}>Increased &nbsp;</Text>
                  Requests for Quote (RFQs)
                </Text>
                <Text style={styles.conditionsText}>
                  • &nbsp;
                  <Text style={styles.highlightText}>Increase &nbsp;</Text>
                  in number of orders
                </Text>
              </View>
            </Col>
          </Grid>
        )}
      </View>
    );
  }

  renderParametersHeading() {
    return <Text style={styles.ratingHeading}>Parameters</Text>;
  }

  setWidth(event) {
    const { width, height } = event.nativeEvent.layout;
    let w = 0.9 * width;
    this.setState({
      width: w
    });
  }

  renderDispatchAdherenceCard() {
    let { current_rating_criteria, rating_parameter } = this.state.rating;
    adherence =
      (rating_parameter && rating_parameter.dispatch_adherence) || 100;
    progress = adherence / 100;
    decreased =
      (current_rating_criteria.rating_parameters &&
        current_rating_criteria.rating_parameters.dispatch_adherence) <
      (current_rating_criteria.previous_rating_parameters &&
        current_rating_criteria.previous_rating_parameters.dispatch_adherence);
    return (
      <View
        style={styles.ratingDetailsCard}
        onLayout={event => this.setWidth(event)}
      >
        <View style={{ flex: 2 }}>
          <Text style={styles.secondaryHead}>
            Dispatch Adherence - {adherence}% &nbsp;
            <Icon
              name={decreased ? 'arrow-down' : 'arrow-up'}
              color={decreased ? '#E84855' : '#54BD48'}
            />
          </Text>
          <ProgressBar
            progress={progress}
            width={this.state.width}
            showsText={true}
            textStyle={{ color: '#FFFFFF' }}
            borderColor="#F9F9F9"
            borderRadius={0}
            unfilledColor="#DADADA"
            height={10}
            color="#00AFD7"
          />
          <Text style={styles.miniText}>
            Increase your rating by adhering to the timelines provided in PO.
          </Text>
        </View>
      </View>
    );
  }

  renderQualityAdherenceCard() {
    let { current_rating_criteria, rating_parameter } = this.state.rating;
    adherence = (rating_parameter && rating_parameter.quality_adherence) || 100;
    progress = adherence / 100;
    decreased =
      (current_rating_criteria.rating_parameters &&
        current_rating_criteria.rating_parameters.quality_adherence) <
      (current_rating_criteria.previous_rating_parameters &&
        current_rating_criteria.previous_rating_parameters.quality_adherence);
    return (
      <View style={styles.ratingDetailsCard}>
        <View style={{ flex: 2 }}>
          <Text style={styles.secondaryHead}>
            Quality Adherence - {adherence}% &nbsp;
            <Icon
              name={decreased ? 'arrow-down' : 'arrow-up'}
              color={decreased ? '#E84855' : '#54BD48'}
            />
          </Text>
          <ProgressBar
            progress={progress}
            width={this.state.width}
            borderColor="#F9F9F9"
            borderRadius={0}
            unfilledColor="#DADADA"
            height={10}
            color="#00AFD7"
          />
          <Text style={styles.miniText}>
            Make sure quality is as specified in COA to increase rating.
          </Text>
        </View>
      </View>
    );
  }

  renderPlatformAdherenceCard() {
    let { current_rating_criteria, rating_parameter } = this.state.rating;
    adherence =
      (rating_parameter && rating_parameter.platform_adherence) || 100;
    progress = adherence / 100;
    decreased =
      (current_rating_criteria.rating_parameters &&
        current_rating_criteria.rating_parameters.platform_adherence) <
      (current_rating_criteria.previous_rating_parameters &&
        current_rating_criteria.previous_rating_parameters.platform_adherence);
    return (
      <View style={styles.ratingDetailsCard}>
        <View style={{ flex: 2 }}>
          <Text style={styles.secondaryHead}>
            Platform Adherence - {adherence}% &nbsp;
            <Icon
              name={decreased ? 'arrow-down' : 'arrow-up'}
              color={decreased ? '#E84855' : '#54BD48'}
            />
          </Text>
          <ProgressBar
            progress={progress}
            width={this.state.width}
            borderColor="#F9F9F9"
            borderRadius={0}
            unfilledColor="#DADADA"
            height={10}
            color="#00AFD7"
          />
          <Text style={styles.miniText}>
            Use Partner Plus for RFQ and PO acceptance and increase your rating.
          </Text>
        </View>
      </View>
    );
  }

  renderEligibilityHeading() {
    return <Text style={styles.ratingHeading}>Eligibility Details</Text>;
  }

  formatValue(value) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₹'}
        decimalScale={2}
        renderText={value => (
          <Text style={styles.bizongoVolumeBigText}>{value}</Text>
        )}
      />
    );
  }

  renderBizongoVolumeCard() {
    let { purchase_order_sales } = this.state.rating;
    if (purchase_order_sales >= 6000000) {
      (goalAmount = ''), (goalOutstanding = ''), (outstanding = 60);
    } else if (purchase_order_sales >= 4000000) {
      (goalAmount = '60 Lakhs'), (goalOutstanding = 60), (outstanding = 40);
    } else if (purchase_order_sales >= 2000000) {
      (goalAmount = '40 Lakhs'), (goalOutstanding = 40), (outstanding = 20);
    } else {
      goalAmount = '20 Lakhs';
      (goalOutstanding = 20), (outstanding = 0);
    }
    text = !!goalAmount
      ? 'Reach ' +
        goalAmount +
        ' to be eligible for early payment for upto ' +
        goalOutstanding +
        '% of amount outstanding'
      : 'Eligible for upto ' + outstanding + '% outstanding amount.';
    return (
      <View style={styles.detailsCard}>
        <View style={{ flex: 2, padding: px(3) }}>
          <Text style={styles.bizongoVolumeSmallText}>
            Average Business in last 3 months with Bizongo{' '}
          </Text>
          <Text style={styles.bizongoVolumeBigText}>
            {this.formatValue(purchase_order_sales)}
          </Text>
        </View>
        <View style={{ flex: 2, padding: px(3), backgroundColor: '#34495E' }}>
          <Text
            style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}
            numberOfLines={3}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  }

  renderCreditRateCard() {
    let { settings } = this.state.rating;
    if (settings && settings.credit_rated == 'A') {
      goalCredit = '';
      goalOutstanding = '';
      creditPercent = 70;
    } else if (settings && settings.credit_rated == 'B') {
      goalCredit = 'A';
      goalOutstanding = 70;
      creditPercent = 50;
    } else {
      goalCredit = 'B';
      goalOutstanding = 50;
      creditPercent = 'N/A';
    }
    text = !!goalOutstanding
      ? 'Become a Credit Rated ' +
        goalCredit +
        ' partner for early payment of upto ' +
        goalOutstanding +
        '% of outstanding amount'
      : 'Eligible for upto ' + creditPercent + '% outstanding amount.';
    return (
      <View style={styles.detailsCard}>
        <View style={{ flex: 2, padding: px(3) }}>
          <Text style={styles.bizongoVolumeSmallText}> Credit Rating </Text>
          <Text style={styles.bizongoVolumeBigText}>
            {(settings && settings.credit_rated) || 'N/A'}
          </Text>
        </View>
        <View style={{ flex: 2, padding: px(3), backgroundColor: '#34495E' }}>
          <Text
            style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}
            numberOfLines={3}
          >
            {' '}
            {text}{' '}
          </Text>
        </View>
      </View>
    );
  }

  renderTurnoverNetworthCard() {
    let { settings } = this.state.rating;
    if (settings && settings.supplier_turnover < 20) {
      (turnOverOutstanding = ''),
        (turnOverAmountGoal = 20),
        (turnOverOutstandingGoal = 10);
    } else if (settings && settings.supplier_turnover < 40) {
      (turnOverOutstanding = 10),
        (turnOverAmountGoal = 40),
        (turnOverOutstandingGoal = 20);
    } else if (settings && settings.supplier_turnover < 60) {
      (turnOverOutstanding = 20),
        (turnOverAmountGoal = 60),
        (turnOverOutstandingGoal = 30);
    } else if (settings && settings.supplier_turnover >= 60) {
      turnOverOutstanding = 30;
      (turnOverAmountGoal = ''), (turnOverOutstandingGoal = '');
    } else {
      turnOverOutstanding = 0;
      (turnOverAmountGoal = 20), (turnOverOutstandingGoal = 10);
    }
    text = !!turnOverOutstandingGoal
      ? 'Reach ' +
        turnOverAmountGoal +
        ' CR to be eligible for early payment for upto ' +
        turnOverOutstandingGoal +
        '% of amount outstanding'
      : 'Eligible for upto ' + turnOverOutstanding + '% outstanding amount.';
    return (
      <View style={styles.detailsCard}>
        <View style={{ flex: 2, padding: px(3) }}>
          <Text style={styles.bizongoVolumeSmallText}>
            {' '}
            Turnover/Net Worth{' '}
          </Text>
          <Text style={styles.bizongoVolumeBigText}>
            {(settings && settings.supplier_turnover) || 0} CR
          </Text>
        </View>
        <View style={{ flex: 2, padding: px(3), backgroundColor: '#34495E' }}>
          <Text
            style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}
            numberOfLines={3}
          >
            {' '}
            {text}{' '}
          </Text>
        </View>
      </View>
    );
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

  renderView() {
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
        scrollEventThrottle={226}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.mainBackground}>
          {this.renderReachRatingCard()}
          {this.renderRatingDetailsCard()}
          {this.renderParametersHeading()}
          {this.renderDispatchAdherenceCard()}
          {this.renderQualityAdherenceCard()}
          {this.renderPlatformAdherenceCard()}
          {this.renderEligibilityHeading()}
          {this.renderCreditRateCard()}
          {this.renderBizongoVolumeCard()}
          {this.renderTurnoverNetworthCard()}
        </View>
      </ScrollView>
    );
  }

  render() {
    if (this.state.com && this.state.com) {
      Mixpanel.track('Visited Rating Show Page');
      return this.renderView();
    } else if (this.state.err) {
      return this.renderFailedComponent();
    } else {
      return <Spinner />;
    }
  }
}

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: Colors.WHITE
  },
  mainScroll: {
    backgroundColor: Colors.WHITE,
    paddingBottom: px(20)
  },
  greenCard: {
    backgroundColor: 'rgba(84,189,72, 0.5)',
    flex: 5,
    alignItems: 'flex-start',
    margin: px(3),
    padding: px(3),
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'rgb(84,189,72)',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  greenCardText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '400'
  },
  greenCardTextBold: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: 'bold'
  },
  ratingDetailsCard: {
    backgroundColor: Colors.BACKGROUND_GREY,
    margin: px(3),
    padding: px(3),
    borderRadius: 0
  },
  detailsCard: {
    backgroundColor: Colors.BACKGROUND_GREY,
    margin: px(3),
    borderRadius: 0
  },
  ratingHeading: {
    fontSize: 0.05 * ScreenWidth,
    fontWeight: 'bold',
    paddingLeft: px(6),
    color: Colors.HEADING_TEXT,
    marginTop: 20
  },
  ratingWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 1
  },
  secondaryHead: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.TEXT_BLACK,
    marginBottom: 10
  },
  bizongoVolumeSmallText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.TEXT_BLACK
  },
  bizongoVolumeBigText: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.PRIMARY_BLUE
  },
  normalText: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.TEXT_BLACK,
    marginBottom: 10
  },
  miniText: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.TEXT_BLACK,
    marginTop: 20
  },
  ratingBox: {
    backgroundColor: Colors.STAR_YELLOW,
    height: px(20),
    width: px(20)
  },
  alignMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  starMargin: {
    marginRight: 3,
    height: 13,
    width: 13
  },
  userRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.WHITE
  },
  userRatingText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontWeight: 'bold'
  },
  headerMain: {
    fontSize: 14,
    marginTop: px(2.5),
    marginBottom: px(1)
  },
  profileName: {
    fontSize: 0.05 * ScreenWidth,
    fontWeight: 'bold',
    color: Colors.TEXT_BLACK,
    fontFamily: Constants.MAIN_FONT
  },
  conditionsText: {
    fontSize: 11,
    color: Colors.TEXT_BLACK,
    marginBottom: 5
  },
  highlightText: {
    fontWeight: 'bold',
    color: Colors.PRIMARY_BLUE,
    fontSize: 11
  }
});
