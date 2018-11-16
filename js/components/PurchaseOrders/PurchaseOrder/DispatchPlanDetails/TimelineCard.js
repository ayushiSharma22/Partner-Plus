import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../../Text';
import Moment from 'moment';
import { px, underscoreless } from '../../../../commons/helper';
import { Badge } from '../../../Elements';
import Timeline from 'react-native-timeline-listview';
import * as Colors from '../../../../commons/colors';

export default class TimelineCard extends Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    let { status } = this.props;
    return (
      <View style={styles.timelineHeadingView}>
        <Text style={styles.timelineHeading}>TIMELINE</Text>
        <View style={styles.timelineHeadingStatusView}>
          <Badge
            status={this.getStatus(status)}
            message={status.toUpperCase()}
          />
        </View>
      </View>
    );
  }

  getStatus(status) {
    if (status === 'open') {
      return 'warning';
    } else if (status === 'done') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  renderMainView() {
    let { timelines, location, pincode } = this.props;
    data = [];

    for (index in timelines) {
      date = Moment(timelines[index].deadline).format('DD MMM, YYYY');
      date =
        date +
        (index == timelines.length - 1
          ? '\nLocation - ' + location + ' - ' + pincode
          : '');
      date_today = Moment(new Date());
      deadline = Moment(timelines[index].deadline);
      prev_index = index >= 1 ? index - 1 : 0;
      next_index =
        index < timelines.length - 1 ? Number(index) + 1 : timelines.length - 1;
      dateActive =
        deadline <= date_today &&
        Moment(timelines[prev_index].deadline) < date_today;
      active = dateActive || index == 0 || timelines[index].status === 'done';
      activeDot = timelines[index].status === 'done';
      activeLine =
        active &&
        (index == 0 || Moment(timelines[next_index].deadline) < date_today);
      titleComponent = (
        <Badge
          status={this.getStatus(timelines[index].status)}
          message={timelines[index].status.toUpperCase()}
        />
      );
      item = {
        titleView: true,
        title: underscoreless(timelines[index].timeline_type.toUpperCase()),
        titleMainViewStyle: {
          flexDirection: 'row',
          justifyContent: 'space-between'
        },
        titleViewStyle: {
          flex: 1,
          color: active ? Colors.PRIMARY_BLUE : Colors.PRIMARY_GREY,
          fontSize: 14,
          fontWeight: 'bold',
          marginTop: -10
        },
        addComponentViewStyle: {
          marginLeft: 'auto',
          paddingRight: 10
        },
        titleComponent: titleComponent,
        descriptionStyle: {
          color: active ? Colors.TEXT_BLACK : Colors.PRIMARY_GREY,
          fontSize: 14,
          fontWeight: 'bold',
          marginTop: 5,
          marginBottom: 20,
          flexDirection: 'column'
        },
        description: date,
        active: active,
        circleColor: active ? Colors.PRIMARY_BLUE : Colors.PRIMARY_GREY,
        dotColor: activeDot ? Colors.PRIMARY_BLUE : Colors.WHITE,
        lineColor: activeLine ? Colors.PRIMARY_BLUE : Colors.PRIMARY_GREY
      };
      data.push(item);
    }

    return (
      <Timeline
        data={data}
        showTime={false}
        innerCircle={'dot'}
        descriptionStyle={{
          color: data.active ? Colors.TEXT_BLACK : Colors.PRIMARY_GREY,
          fontSize: 14,
          fontWeight: 'bold',
          marginTop: 5,
          marginBottom: 20
        }}
        titleStyle={{
          color: data.active ? Colors.PRIMARY_BLUE : Colors.PRIMARY_GREY,
          fontSize: 14,
          marginTop: -10
        }}
        renderFullLine={false}
      />
    );
  }

  render() {
    return (
      <View styles={styles.timelineCardView}>
        {this.renderHeader()}
        {this.renderMainView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timelineCardView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: px(1),
    backgroundColor: Colors.BACKGROUND_GREY,
    borderRadius: 5,
    margin: 5,
    elevation: 1,
    marginTop: 10,
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  timelineHeadingView: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.SECONDARY_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timelineHeading: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: 'bold',
    flex: 1
  },
  timelineHeadingStatusView: {
    marginLeft: 'auto'
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row'
  }
});
