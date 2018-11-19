import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import Modal from 'react-native-modalbox';
import UpdateComponent from '../UpdateComponent';
import MandatoryUpdateComponent from '../MandatoryUpdateComponent';
import * as LocalServices from '../../services/LocalServices';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: false,
      complete: false,
      error: false,
      modalWidth: 300,
      modalHeight: 300
    };
    this.updateModalHeight = this.updateModalHeight.bind(this);
    this.updateModalWidth = this.updateModalWidth.bind(this);
    this.closeUpdateModal = this.closeUpdateModal.bind(this);
    this.closeMandatoryUpdateModal = this.closeMandatoryUpdateModal.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const { getState, loginState, navigator, fetchAppUpdates } = this.props;
    if (loginState.loggedIn) {
      navigator.replace({ id: 'home' });
    } else {
      this.setState({ request: true });
      getState().then(data => {
        if (data.loggedIn) {
          this.setState({ routeId: 'home' });
        } else {
          this.setState({ routeId: 'login' });
        }
        fetchAppUpdates().then(updateData => {
          this.setState({ request: false });
          if (!updateData.errors) {
            this.setState({ complete: true });
            let { navigator } = this.props;
            let { routeId } = this.state;
            if (routeId) {
              navigator.push({ id: routeId });
            }
            if (updateData.killswitch) {
              this.openMandatoryUpdateModal();
            } else if (updateData.update) {
              flag = false;
              currentTime = new Date();

              LocalServices.getLastUpdateNotificationTime().then(
                last_update_notification_time => {
                  if (!last_update_notification_time) {
                    flag = true;
                  } else if (
                    LocalServices.getHoursDifference(
                      last_update_notification_time,
                      currentTime
                    ) > 24
                  ) {
                    flag = true;
                  } else if (
                    last_update_notification_time.getDate() <
                    currentTime.getDate()
                  ) {
                    flag = true;
                  }

                  if (flag) {
                    this.openUpdateModal();
                    LocalServices.setLastUpdateNotificationTime();
                  } else {
                    this.continueApp();
                  }
                }
              );
            } else {
              this.continueApp();
            }
          } else {
            this.setState({ error: true });
          }
        });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const prevLoginState = this.props.loginState;
    const nextLoginState = nextProps.loginState;
    const { showAlert, navigator } = nextProps;

    if (nextLoginState.stateComplete && !prevLoginState.stateComplete) {
      if (this.state.request) {
        // this.setState({request: false, complete: true});
        let routeId = 'login';
        // let userId = ''
        if (nextLoginState.loggedIn) {
          routeId = 'home';
        }
        // navigator.replace({id: routeId});
      }
    }
    if (nextLoginState.stateError && !prevLoginState.stateError) {
      if (this.state.request) {
        // this.setState({request: false, error: true});
        showAlert('info', 'Error', 'Some error occured');
      }
    }
  }
  openUpdateModal() {
    this.refs.updateModal.open();
  }
  closeUpdateModal() {
    this.refs.updateModal.close();
    this.continueApp();
  }
  updateModalHeight(height) {
    this.setState({ modalHeight: height });
  }
  updateModalWidth(width) {
    this.setState({ modalWidth: width });
  }
  openMandatoryUpdateModal() {
    this.refs.mandatoryUpdateModal.open();
  }
  closeMandatoryUpdateModal() {
    this.refs.mandatoryUpdateModal.close();
  }
  continueApp() {
    let { navigator } = this.props;
    let { routeId } = this.state;
    if (routeId) {
      navigator.replace({ id: routeId });
    }
  }
  renderUpdateModal() {
    return (
      <Modal
        style={[
          styles.modal,
          styles.modal3,
          { width: this.state.modalWidth, height: this.state.modalHeight }
        ]}
        position={'center'}
        swipeArea={20}
        ref={'updateModal'}
        swipeToClose={false}
        backdropPressToClose={false}
        animationDuration={200}
      >
        <ScrollView>
          <UpdateComponent
            updateModalHeight={this.updateModalHeight}
            updateModalWidth={this.updateModalWidth}
            closeUpdateModal={this.closeUpdateModal}
          />
        </ScrollView>
      </Modal>
    );
  }
  renderMandatoryUpdateModal() {
    return (
      <Modal
        style={[
          styles.modal,
          styles.modal3,
          { width: this.state.modalWidth, height: this.state.modalHeight }
        ]}
        position={'center'}
        swipeArea={20}
        ref={'mandatoryUpdateModal'}
        swipeToClose={false}
        backdropPressToClose={false}
        animationDuration={200}
      >
        <ScrollView>
          <MandatoryUpdateComponent
            updateModalHeight={this.updateModalHeight}
            updateModalWidth={this.updateModalWidth}
            closeMandatoryUpdateModal={this.closeMandatoryUpdateModal}
          />
        </ScrollView>
      </Modal>
    );
  }
  renderSpinner() {
    console.log(this.state);
    if (this.state.request) {
      return <Spinner color="white" />;
    }
    return null;
  }
  render() {
    return (
      <ImageBackground
        source={require('../../../img/temp-splash.png')}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.welcomeView}>
          {this.renderSpinner()}
          {this.renderUpdateModal()}
          {this.renderMandatoryUpdateModal()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  welcomeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 24
  }
});
