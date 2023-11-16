import React from 'react';
import FastImage from 'react-native-fast-image';

const FastImageView = ({style, uri, defaultSource}) => {
  // const {mode} = useSelector(state => state.settingReducer);

  // const defaultTintColor = mode === 'light' ? Colors.black : Colors.white;
  // const defaultStyle = StyleSheet.compose(style, {tintColor: defaultTintColor});
  return (
    <FastImage
      style={style}
      source={
        uri
          ? {
              uri: uri,
            }
          : defaultSource
      }
      resizeMode={FastImage.resizeMode.cover}
      defaultSource={defaultSource}
    />
  );
};

export default FastImageView;
