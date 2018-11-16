import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../../../Text';
import CollapsibleCard from '../../../../commons/CollapsibleCard';
import { px } from '../../../../commons/helper';
import * as Colors from '../../../../commons/colors';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../../../selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

let ScreenWidth = Dimensions.get('window').width;
let svgWidth = 0.1 * ScreenWidth;

export default class DispatchPlanItemCard extends Component {
  constructor(props) {
    super(props);
  }

  getHeader() {
    let { product_details, quantity, product_matrices } = this.props.item;
    return (
      <View style={{ backgroundColor: Colors.WHITE, marginTop: 10 }}>
        <Text style={styles.heading}>{product_details.product_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'nowrap'
          }}
        >
          <View style={styles.footerQuantityComponentView}>
            <Icon size={svgWidth} color={Colors.TEXT_BLACK} name="boxes" />
            <Text style={styles.footerValueText}>
              {quantity} {product_matrices[0].unit}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderProperty(key, value, unit = '') {
    if (!!key && !!value) {
      return (
        <View style={styles.propertyView}>
          <View style={styles.keyView}>
            <Text style={styles.keyText}>{key}</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.valueText}>
              : &nbsp; {value} {unit ? unit : ''}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderSpecifications(specs) {
    let component = [],
      i = 1;
    for (index in specs) {
      component.push(
        <View style={styles.propertyView} key={i}>
          <View style={styles.keyView}>
            <Text style={styles.keyText}>{index}</Text>
          </View>
          <View style={styles.valueView}>
            <Text style={styles.valueText}>: &nbsp; {specs[index]}</Text>
          </View>
        </View>
      );
      i++;
    }
    return component;
  }

  getContent() {
    let { product_matrices, product_details } = this.props.item;
    product_matrix_name = product_matrices[0].name;
    product_matrix_value =
      product_matrices[0].value + ' ' + product_matrices[0].unit;
    spec = product_details.product_specifications;
    return (
      <View style={styles.contentView}>
        <View style={styles.specificationsHeaderWrapper}>
          <Text style={styles.specificationsHeader}>SPECIFICATIONS</Text>
        </View>
        {this.renderProperty(product_matrix_name, product_matrix_value)}
        {this.renderSpecifications(spec)}
      </View>
    );
  }

  render() {
    return (
      <CollapsibleCard
        collapsible={true}
        mainCardStyle={styles.mainCardStyle}
        arrowStyle={styles.arrowStyle}
        heading={this.getHeader()}
        content={this.getContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 5
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700'
  },
  contentView: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10
  },
  propertyView: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    paddingBottom: 10
  },
  keyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  valueView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  keyText: {
    color: Colors.TEXT_BLACK,
    fontWeight: 'bold',
    fontSize: 14
  },
  valueText: {
    color: Colors.TEXT_BLACK,
    fontSize: 14
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 0.03 * ScreenWidth,
    color: Colors.TEXT_BLACK
  },
  specificationsHeaderWrapper: {
    padding: 5,
    marginTop: 10,
    marginBottom: 5
  },
  specificationsHeader: {
    color: Colors.PRIMARY_BLUE,
    fontWeight: '700'
  },
  mainCardStyle: {
    padding: px(2),
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    margin: 5,
    elevation: 1,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: Colors.TEXT_BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  arrowStyle: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: 50,
    width: 20,
    textAlign: 'center'
  },
  footerQuantityComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footerTimeComponentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  footerValueText: {
    fontSize: 12,
    color: Colors.TEXT_BLACK
  },
  fontBold: {
    fontWeight: 'bold'
  }
});
