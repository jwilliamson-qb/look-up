import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import get from 'lodash/get';
import { connect } from 'react-redux';
import colors from '../constants/Colors';
import { queryBusinesses } from '../services/qbapi';
import { setBusinesses } from '../stores/businesses';

const BusinessList = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    async function setBusinessListFromAPI() {
      const response = await queryBusinesses();
      setBusinessList(response);
      setBusinesses(response);
    }
    setBusinessListFromAPI();
  }, []);

  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <Text style={[styles.separator]}>{''}</Text>
      )}
      data={businessList}
      keyExtractor={(item) => get(item, '3.value') + ''}
      renderItem={({ item, separators }) => (
        <TouchableHighlight
          key={get(item, '3.value')}
          onPress={() => this._onPress(item)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <View style={{ backgroundColor: colors.backgroundColor }}>
            <Text style={styles.title}>{get(item, '6.value') + ''}</Text>
            <View>
              <Text style={styles.subTitle}>{'Business type'}</Text>
              <Text style={styles.metadata}>{get(item, '15.value', '')}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>{'Services'}</Text>
              <Text style={styles.metadata}>{get(item, '16.value', '') + ''}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.gray,
    borderBottomColor: colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  metadata: {
    fontSize: 15,
    fontWeight: 'normal',
    textTransform: 'lowercase',
  },
});

const mapStateToProps = ({ businesses }) => ({
  businesses: businesses.businesses,
});

const mapDispatchToProps = {
  setBusinesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
