// 3rd Party Imports
import React, {useCallback, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import {useDispatch, useSelector} from 'react-redux';
// Local Imports
import {Icons} from '../../assets';
import {CircleFilledIcon, CustomNavbar} from '../../components';
import {Strings} from '../../config/strings';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import {createMPinApi} from '../../store/actions/AuthAction';
import styles from './styles';
import {onSetMpin} from '../../store/slice/AuthSlice';

const ConfirmPinScreen = ({navigation}) => {
  // Global Confirm-Pin Field References
  const pinView = useRef(null);

  // userId Get Through UseSelector
  const userId = useSelector(state => state.auth.userId);

  const [confirmedPin, setConfirmedPin] = useState('');
  const [EnteredPin, SetEnteredPin] = useState('');

  // goBack Functionality
  const onBackPress = useCallback(() => navigation.goBack(), [navigation]);

  const dispatch = useDispatch();

  // Entered and Confirmed Pin Value Length and clearAll Condition
  const changeValue = useCallback(
    value => {
      if (EnteredPin.length === 4 && value.length === 4) {
        createMPin(value);
      } else if (EnteredPin.length === 4 && value.length > 0) {
        setConfirmedPin(value);
      } else if (value.length === 4) {
        SetEnteredPin(value);
        pinView.current.clearAll();
      }
    },
    [EnteredPin.length, createMPin],
  );

  // Create m-pin api calling when Entered and Confirmed Pin are Same...
  const createMPin = useCallback(
    cPin => {
      if (EnteredPin === cPin) {
        try {
          dispatch(
            createMPinApi(
              {
                mPin: EnteredPin,
                confirmMPin: cPin,
              },
              (isSuccess, message) => {
                if (isSuccess) {
                  ToastSuccess(message);
                  dispatch(onSetMpin(cPin));
                  navigation.navigate(NavigationRoutes.EventScreen);
                } else {
                  ToastError(message);
                }
              },
            ),
          );
        } catch (err) {
          console.log('create mpin-api-calling-err ==> ', err);
        }
      } else {
        ToastError(Strings.MPINMatchError);
        SetEnteredPin('');
        setConfirmedPin('');
        pinView.current.clearAll();
      }
    },
    [EnteredPin, dispatch, navigation],
  );

  const handleButtonPress = useCallback(
    key => {
      if (key === Strings.customRight) {
        if (confirmedPin.length > 0) {
          setConfirmedPin(confirmedPin.slice(0, -1));
        } else if (confirmedPin.length === 0) {
          pinView.current.initValue(EnteredPin.slice(0, -1).toString());
          SetEnteredPin(EnteredPin.slice(0, -1));
        }
        pinView.current.clear();
      }
    },
    [EnteredPin, confirmedPin],
  );

  return (
    <View style={styles.confirmPinMainContainer}>
      <CustomNavbar onPress={onBackPress} leftIcon={Icons.backArrowIcon} />

      <View style={styles.confirmPinTopContainer}>
        <CircleFilledIcon
          icon={Icons.numberPadIcon}
          containerStyle={styles.confirmPinIconStyle}
          iconStyle={styles.numberPadIconStyle}
        />

        <Text style={styles.confirmPinMainHeading}>
          <Text>
            {EnteredPin.length !== 4
              ? Strings.enterYourPin
              : Strings.ConfirmYourPin}
          </Text>
        </Text>
      </View>

      <View style={styles.confirmPinContainer}>
        <ReactNativePinView
          ref={pinView}
          inputSize={34}
          pinLength={4}
          buttonSize={76}
          buttonAreaStyle={styles.confirmPinButtonStyle}
          inputViewEmptyStyle={styles.inputViewEmptyStyle}
          inputViewFilledStyle={styles.inputViewFilledStyle}
          buttonViewStyle={styles.inputButtonViewStyle}
          onValueChange={value => changeValue(value)}
          onButtonPress={key => handleButtonPress(key)}
          buttonTextStyle={styles.inputButtonStyle}
          customLeftButton={<View style={styles.inputViewEmptyCloseStyle} />}
          customRightButton={
            <View style={styles.inputViewEmptyCloseStyle}>
              <Image
                source={Icons.confirmPinCloseIcon}
                style={styles.confirmPinCloseIcon}
              />
            </View>
          }
        />

        <View>
          <Text style={styles.confirmPinBottomHeading}>
            {Strings.ConfirmPinBottomHeading}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmPinScreen;
