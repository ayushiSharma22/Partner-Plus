import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated
} from 'react-native';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {Icon} from 'native-base'

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};
const Style = StyleSheet.create({
  dateTouch: {
    width: 142
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    color: '#333'
  },
  placeholderText: {
    color: '#c9c9c9'
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  }
});
class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.format = this.props.format || FORMATS[this.props.mode];
    // date = this.props.date || this.getDate();

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      disabled: this.props.disabled,
      animatedHeight: new Animated.Value(0)
    };

    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillMount() {
    // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
    console.ignoredYellowBox = [
      'Warning: Failed propType'
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ];
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.props.height,
          duration: this.props.duration
        }
      ).start();
    } else {
      this.setState({
        animatedHeight: new Animated.Value(0)
      });
    }
  }

  onPressCancel() {
    this.setModalVisible(false);
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);
  }

  getDate(date = this.props.date) {
    if (!date) {
      let now = new Date();
      if (this.props.minDate) {
        let minDate = this.getDate(this.props.minDate);

        if (now < minDate) {
          return minDate;
        }
      }

      if (this.props.maxDate) {
        let maxDate = this.getDate(this.props.maxDate);

        if (now > maxDate) {
          return maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, this.format).toDate();
  }

  getDateStr(date = this.props.date) {
    if (date instanceof Date) {
      return Moment(date).format(this.format);
    } else {
      return Moment(this.getDate(date)).format(this.format);
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date), this.state.date);
    }
  }


  onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      this.datePicked();
    }
  }

  onTimePicked({action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this.datePicked();
    }
  }

  onDatetimePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);


      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: !this.format.match(/h|a/)
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    }
  }

  onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this.datePicked();
    }
  }

  onPressDate() {
    if (this.state.disabled) {
      return true;
    }

    // reset state
    this.setState({
      date: this.getDate()
    });

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {

      // 选日期
      if (this.props.mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatePicked);
      } else if (this.props.mode === 'time') {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: !this.format.match(/h|a/)
        }).then(this.onTimePicked);
      } else if (this.props.mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatetimePicked);
      } else {
        throw new Error('The specified mode is not supported');
      }
    }
  }

  render() {
    let customStyles = this.props.customStyles;
    this.format = this.props.format || FORMATS[this.props.mode];
    const dateInputStyle = [
      Style.dateInput, customStyles.dateInput,
      this.state.disabled && Style.disabled,
      this.state.disabled && customStyles.disabled
    ];

    return (

        <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
              <Icon  name="md-create" style={{color:'black'}} onPress={this.onPressDate}/>

          {this.props.showIcon && <Image
            style={[Style.dateIcon, customStyles.dateIcon]}
            source={this.props.iconSource}
          />}
          {Platform.OS === 'ios' && <Modal
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false);}}
          >
            <TouchableHighlight
              style={Style.datePickerMask}
              activeOpacity={1}
              underlayColor={'#00000077'}
              onPress={this.onPressCancel}
            >
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{flex: 1}}
              >
                <Animated.View
                  style={[Style.datePickerCon, {height: this.state.animatedHeight}, customStyles.datePickerCon]}
                >
                  <DatePickerIOS
                    date={this.state.date}
                    mode={this.props.mode}
                    minimumDate={this.props.minDate && this.getDate(this.props.minDate)}
                    maximumDate={this.props.maxDate && this.getDate(this.props.maxDate)}
                    onDateChange={(date) => this.setState({date: date})}
                    style={[Style.datePicker, customStyles.datePicker]}
                  />
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressCancel}
                    style={[Style.btnText, Style.btnCancel, customStyles.btnCancel]}
                  >
                    <Text
                      style={[Style.btnTextText, Style.btnTextCancel, customStyles.btnTextCancel]}
                    >
                      {this.props.cancelBtnText}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressConfirm}
                    style={[Style.btnText, Style.btnConfirm, customStyles.btnConfirm]}
                  >
                    <Text style={[Style.btnTextText, customStyles.btnTextConfirm]}>{this.props.confirmBtnText}</Text>
                  </TouchableHighlight>
                </Animated.View>
              </TouchableHighlight>
            </TouchableHighlight>
          </Modal>}
        </View>
    );
  }
}

DatePicker.defaultProps = {
  mode: 'date',
  date: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: 'CONFIRM',
  cancelBtnText: 'CANCEL',
  iconSource: 'https://s-media-cache-ak0.pinimg.com/236x/3f/00/41/3f00411d6521ab4c2223b2b74dde7d0f.jpg',
  customStyles: {},

  // whether or not show the icon
  showIcon: true,
  disabled: false,
  placeholder: ''
};

DatePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default DatePicker;
