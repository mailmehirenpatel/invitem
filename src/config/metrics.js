import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Used via Metrics.baseMargin
const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? verticalScale(64) : verticalScale(54),
  icons: {
    tiny: 10,
    small: 15,
    medium: 20,
    large: 40,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  size: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
    xxl: 25,
    xxxl: 30,
  },
};
export {verticalScale, moderateScale, scale, Metrics};
