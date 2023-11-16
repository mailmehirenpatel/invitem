// THIRD PARTY IMPORTS
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
//LOCAL IMPORTS
import {Icons, Images} from '../../assets';
import Colors from '../../theme/Colors';
import CustomImagePicker from '../CustomImagePicker';
import styles from './styles';

const ScreenContainer = ({
  renderContent,
  containerStyle,
  bottomLayer = false,
  headerContent,
  isProfile,
}) => {
  const [isPick, setPick] = useState(false);
  const [imageSource, setImageSource] = useState();
  // Define Status Bar Color
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(Colors.Transparent);
  }
  return (
    <View style={[containerStyle, styles.container]}>
      <ImageBackground
        source={Images.auth_header}
        imageStyle={styles.imgBackgroundImage}
        style={styles.imageBackground}>
        {isProfile ? (
          <Pressable style={styles.centerImageContainer}>
            {imageSource ? (
              <Image
                source={{uri: imageSource.path}}
                style={styles.profileAvatarImage}
              />
            ) : (
              <Image
                source={Images.profileImage}
                style={styles.defaultAvatarImage}
              />
            )}

            <Pressable
              style={styles.CameraIconContainer}
              onPress={() => setPick(true)}>
              <Image source={Icons.cameraIcon} style={styles.CameraIconStyle} />
            </Pressable>
          </Pressable>
        ) : (
          <Pressable>
            <Image source={Icons.logo} style={styles.CenterImage} />
          </Pressable>
        )}
        <CustomImagePicker
          isPickerVisible={isPick}
          setPickerVisible={setPick}
          setImageSource={setImageSource}
        />
      </ImageBackground>
      <View style={styles.renderContent}>{renderContent()}</View>
      {bottomLayer && <SafeAreaView style={styles.footerArea} />}
    </View>
  );
};

ScreenContainer.propTypes = {
  renderContent: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  bottomLayer: PropTypes.bool,
  backgroundImage: PropTypes.any,
};

export default ScreenContainer;
