// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

// Local Imports
import {CustomImagePicker} from '../../../../components';
import {Strings} from '../../../../config/strings';
import styles from './styles';

const UploadImageComponent = ({callBack, isClear}) => {
  const [isPick, setPick] = useState(false);
  const [imagePath, setImagePath] = useState(undefined);

  // Upload Button Functionality
  const onUpload = useCallback(() => {
    setPick(true);
  }, []);

  return (
    <View style={styles.mainViewContainer}>
      <View style={styles.uploadImageContainer}>
        <Text style={styles.mainViewLogoTitle}>{Strings.SelectImage}</Text>
        <Pressable onPress={onUpload} style={styles.uploadButtonContainer}>
          <Text style={styles.uploadButtonText}>{Strings.Select}</Text>
        </Pressable>
      </View>
      <CustomImagePicker
        isPickerVisible={isPick}
        setPickerVisible={setPick}
        setImageSource={value => {
          setImagePath(value);
          callBack(value);
        }}
      />
    </View>
  );
};

export default UploadImageComponent;
