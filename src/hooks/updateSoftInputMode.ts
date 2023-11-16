import {Platform} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';

interface SoftInputMode {
  enableAdjustPan: () => void;
  disableAdjustPan: () => void;
}

const updateSoftInputMode = (): SoftInputMode => {
  const enableAdjustPan = (): void => {
    if (Platform.OS === 'android') {
      AvoidSoftInput.setAdjustPan();
      AvoidSoftInput.setEnabled(true);
    }
  };

  const disableAdjustPan = (): void => {
    if (Platform.OS === 'android') {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    }
  };

  return {
    enableAdjustPan,
    disableAdjustPan,
  };
};

export default updateSoftInputMode;
