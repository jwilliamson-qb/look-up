import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import colors from '../constants/Colors';
import { queryBusinesses } from '../services/qbapi';
import { setBusinesses } from '../stores/businesses';
import useLocationService from '../hooks/LocationProvider';
import { calculateDistance } from '../services/location';

const BusinessList = (props) => {
  const { businesses } = props;
  const [refreshing, setRefreshing] = useState(true);
  const [filterText, setFilterText] = useState('');
  const navigation = useNavigation();
  const location = useLocationService();

  const sortedBusinesses = sortBy(businesses, ['distance'], ['asc']);

  async function refresh() {
    setRefreshing(true);
    const response = await queryBusinesses();
    if (response) {
      if (location) {
        const distances = await calculateDistance(response, location);
        const businessesWithDistance = response.map((business, index) => {
          const meters = get(distances[index], 'distance.value', 0);
          const miles = parseFloat((meters / 1609.344).toFixed(1));
          return {
            ...business,
            distance: miles,
          };
        });
        props.setBusinesses(businessesWithDistance);
      } else {
        props.setBusinesses(businesses);
      }
    }
    setRefreshing(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.filterInput}
        onChangeText={(text) => setFilterText(text)}
        value={filterText}
        placeholder="Search..."
      />
      <FlatList
        data={sortedBusinesses}
        style={styles.container}
        keyExtractor={(item) => get(item, '3.value') + ''}
        renderItem={({ item }) => {
          if (!JSON.stringify(item).toUpperCase().includes(filterText.toUpperCase())) {
            return null;
          }
          return (
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
              {!!get(item, 'distance') && (
                <View style={styles.rightSide}>
                  <Text style={styles.distance}>{get(item, 'distance') + ' mi'}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        onRefresh={refresh}
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
  filterInput: {
    backgroundColor: colors.gray,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    width: 150,
    alignSelf: 'flex-end',
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
    alignItems: 'center',
    width: 80,
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
