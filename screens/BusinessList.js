import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import colors from '../constants/Colors';
import { queryBusinesses } from '../services/qbapi';
import { setBusinesses } from '../stores/businesses';

const BusinessList = (props) => {
  const { businesses } = props;
  const [businessList, setBusinessList] = useState(businesses);
  const navigation = useNavigation();

  useEffect(() => {
    async function setBusinessesFromAPI() {
      const response = await queryBusinesses();
      setBusinessList(response);
      props.setBusinesses(response);
    }

    if (isEmpty(businesses)) {
      setBusinessesFromAPI();
    }
  }, []);

  return (
    <FlatList
      data={businessList}
      keyExtractor={(item) => get(item, '3.value') + ''}
      renderItem={({ item, separators }) => (
        <TouchableHighlight
          key={get(item, '3.value')}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
          onPress={() => navigation.navigate('Detail', { detail: item })}
        >
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
        </TouchableHighlight>
      )}
    />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
  businesses: businesses.all,
});

const mapDispatchToProps = {
  setBusinesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
