import React from 'react';
import get from 'lodash/get';
import { StyleSheet, Text, View, Platform } from 'react-native';
import colors from '../constants/Colors';

const BusinessDetail = (props) => {
  const item = get(props, 'route.params.detail');

  return (
    <View style={styles.view}>
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
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.backgroundColor,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  separator: {
    backgroundColor: colors.gray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : '',
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

export default BusinessDetail;
