import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions
} from 'react-native';
import Text from '../../Text';
import { Spinner } from 'native-base';
import PurchaseOrderItemCard from './PurchaseOrderItemCard';
import { Card, CardContent } from '../../CardThreeLevel';
import * as Colors from '../../../commons/colors';
import { failedToLoadScreen } from '../../Elements';
import Mixpanel from 'react-native-mixpanel';

let ScreenHeight = Dimensions.get('window').height;
export default class PurchaseOrderItems extends Component {
  constructor(props) {
    super(props);
    req_params = {
      page: 1,
      per_page: 10
    };
    this.state = {
      init: true,
      req: false,
      ref: false,
      com: false,
      err: false,
      laz: false,
      items: null,
      count: 0,
      endOfItems: false,
      req_params: req_params
    };
  }

  componentDidMount() {
    this.setState({ init: false, req: true });
    this.loadData();
    Mixpanel.track('Visited Purchase Orders Items Show Page');
  }

  loadData() {
    let { fetchPurchaseOrderItems, showAlert, purchase_order_id } = this.props;
    fetchPurchaseOrderItems(this.state.req_params, purchase_order_id).then(
      data => {
        let { init, req } = this.state;
        if (!!data.error) {
          showAlert('info', 'Error', data.error);
          if (init || req) {
            this.setState({ err: true });
          }
        } else {
          this.setState({
            err: false,
            com: true,
            req: false,
            items: data.bizongo_po_items,
            laz: false,
            count: data.count
          });
        }
      }
    );
  }

  renderContent() {
    let { items, endOfItems, count } = this.state;
    component = [];
    for (var i = 0; i < items.length; i++) {
      component.push(
        <View key={i}>
          <PurchaseOrderItemCard index={i + 1} item={items[i]} />
        </View>
      );
    }
    if (endOfItems) {
      component.push(
        <Text style={{ color: Colors.TEXT_BLACK, fontSize: 14 }}>
          Shown {count}/{count} Items
        </Text>
      );
    }
    return <View style={styles.contentView}>{component}</View>;
  }

  _onRefresh() {
    new_params = Object.assign({}, this.state.req_params, {
      page: 1
    });
    this.setState({ req: true, ref: false, req_params: new_params });
    this.loadData(new_params);
  }

  lazyLoad() {
    let { init, req, ref, laz, count, items } = this.state;
    req_params = Object.assign({}, this.state.req_params);
    req_params.page++;
    if (!init && !req && !ref && !laz) {
      if (count > items.length) {
        this.setState({ laz: true });
        this.loadData(req_params);
      } else {
        this.setState({ endOfItems: true });
      }
    }
  }

  onScroll(e) {
    var height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (ScreenHeight + offset >= height) {
      this.lazyLoad();
    }
  }

  renderView() {
    return (
      <ScrollView
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
        <Card styles={mainCard}>
          <CardContent styles={mainCard}>{this.renderContent()}</CardContent>
        </Card>
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

  render() {
    let { init, req, com } = this.state;
    if (init || req) {
      return this.renderLoading();
    } else if (com) {
      return this.renderView();
    } else {
      return this.renderError();
    }
  }
}

const styles = StyleSheet.create({
  contentView: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 20
  }
});

const mainCard = {
  card: {
    marginTop: 20,
    padding: 0
  },
  cardContent: {
    backgroundColor: Colors.BACKGROUND_LIGHT_GREY,
    borderWidth: 0,
    padding: 0
  }
};
