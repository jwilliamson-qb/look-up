import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import get from 'lodash/get';
import colors from '../constants/Colors';
import { queryBusinesses } from '../services/qbapi';


export default function BusinessList() {
    const [businesses, setBusinesses] = useState([]);
  
    useEffect(() => {
      async function setBusinessesFromAPI() {
        const response = await queryBusinesses();
        setBusinesses(response);
      }
      setBusinessesFromAPI();
    });
    return(
        <FlatList
            ItemSeparatorComponent={() => (
            <Text style={[styles.separator]} >{""}</Text>
            )}
            data={businesses}
            keyExtractor={item => get(item, '3.value') + ''}
            renderItem={({item, separators}) => (
            <TouchableHighlight
                key={get(item, '3.value')}
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: colors.backgroundColor}}>
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
            >
        </FlatList>
  );
}

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