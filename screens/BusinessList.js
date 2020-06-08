import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import colors from '../constants/Colors';
import { queryBusinesses } from '../services/qbapi';
import { setBusinesses } from '../stores/businesses';
import useLocationService from '../hooks/LocationProvider';
import { calculateDistance } from '../services/location';

const BusinessList = (props) => {
  const { businesses } = props;
  const [businessList, setBusinessList] = useState(businesses);
  const [distances, setDistances] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const location = useLocationService();
  async function setBusinessesFromAPI() {
    setRefreshing(true);
    const response = await queryBusinesses();
    setBusinessList(response);
    props.setBusinesses(response);
    setRefreshing(false);
  }

  async function setDistancesFromAPI() {
    setRefreshing(true);
    const distanceResponse = await calculateDistance(businesses, location);
    setDistances(distanceResponse);
    setRefreshing(false);
  }

  useEffect(() => {
    if (isEmpty(businesses)) {
      setBusinessesFromAPI();
    }
    if (isEmpty(distances)) {
      setDistancesFromAPI();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(distances)}</Text>
      <FlatList
        data={businessList}
        style={styles.container}
        keyExtractor={(item) => get(item, '3.value') + ''}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={get(item, '3.value')}
            style={styles.view}
            onPress={() => navigation.navigate('Detail', { detail: item })}
          >
            <View style={styles.leftSide}>
              <Text style={styles.type}>{get(item, '15.value', '')}</Text>
              <Text style={styles.title}>{get(item, '6.value') + ''}</Text>
              <View>
                <Text style={styles.subTitle}>{'Services'}</Text>
                <Text style={styles.metadata}>{get(item, '16.value', '') + ''}</Text>
              </View>
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.distance}>{' :P m away'}</Text>
            </View>
          </TouchableOpacity>
        )}
        onRefresh={setBusinessesFromAPI}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: 25,
    // marginTop: 30,
    overflow: 'hidden',
  },
  view: {
    padding: 15,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  type: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colors.tintColor,
  },
  metadata: {
    fontSize: 15,
    fontWeight: 'normal',
    textTransform: 'lowercase',
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    borderLeftWidth: 1,
    borderLeftColor: colors.gray,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  distance: {
    color: colors.tintColor,
  },
});

const mapStateToProps = ({ businesses }) => ({
  businesses: businesses.all,
});

const mapDispatchToProps = {
  setBusinesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
