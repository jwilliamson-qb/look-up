import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';
import cityPurple from '../assets/images/city_purple.png';
import cityRed from '../assets/images/city_red.png';
import colors from '../constants/Colors';

const CustomHeader = (props) => {
  const dummyImages = [cityPurple, cityRed];
  const { indexControl, backgroundURI, onClose } = props;

  const image = backgroundURI.length ?
    { uri: backgroundURI, cache: 'force-cache' } :
    dummyImages[indexControl % 2];

  return (
    <ImageBackground source={image} style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => onClose()}
        >
          <Icon
            type="MaterialCommunityIcons"
            name="close"
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
  closeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    width: 32,
    height: 32,
    padding: 2,
    margin: 16,
  },
  closeIcon: {
    fontSize: 28,
    color: colors.black,
  },
});

export default CustomHeader;
