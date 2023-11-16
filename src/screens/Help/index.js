import {Formik} from 'formik';
import React, {createRef, useCallback} from 'react';
import {Linking, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {CustomButton, CustomNavbar} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import {Strings} from '../../config/strings';
import {ToastSuccess} from '../../constants/ToastConstants';
import config from '../../constants/config';
import validationSchema from '../../services/validationServices';
import {requestHelp} from '../../store/actions/AuthAction';
import styles from './style';
const Help = ({navigation}) => {
  const inputRef = {
    email: createRef(),
    message: createRef(),
  };

  const {isLogin} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const HelpCall = useCallback(
    ({email, message}) => {
      let requestData = {
        email: email,
        message: message,
      };
      dispatch(
        requestHelp(requestData, (isSuccess, Message) => {
          if (isSuccess) {
            ToastSuccess(Message);
            navigation.goBack();
          }
        }),
      );
    },
    [dispatch, navigation],
  );

  const onTermsCondition = useCallback(() => {
    Linking.openURL(config.Terms_Condition_URL);
  }, []);

  const onPrivacyPolicy = useCallback(() => {
    Linking.openURL(config.Privacy_Policy_URL);
  }, []);
  return (
    <View style={styles.ContentContainer}>
      <CustomNavbar leftIcon={Icons.backArrowIcon} title={Strings.Help} />
      <View style={styles.SubContainer}>
        <Formik
          initialValues={{
            message: '',
            email: isLogin.email,
          }}
          validationSchema={validationSchema.addHelp}
          onSubmit={HelpCall}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <CustomLabelTextInput
                ref={inputRef.email}
                label={Strings.Email}
                containerStyle={{}}
                keyboardType={'email-address'}
                onChangeText={handleChange('email')}
                value={values.email.trim()}
                editable={false}
                returnKeyType={'next'}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                onSubmitEditing={handleSubmit}
              />
              <CustomLabelTextInput
                ref={inputRef.message}
                label={Strings.MessageHere}
                inputStyle={styles.labelInputStyle}
                numberOfLines={5}
                multiline={true}
                containerStyle={{}}
                keyboardType={'default'}
                onChangeText={handleChange('message')}
                value={values.message.trim()}
                returnKeyType={'next'}
                onBlur={handleBlur('message')}
                error={touched.message && errors.message}
                onSubmitEditing={handleSubmit}
              />
              <Text style={styles.termsConditionText}>
                <Text
                  style={styles.termsConditionText}
                  onPress={onTermsCondition}>
                  {Strings.termsConditionText}
                </Text>
                <Text style={styles.andText}>{Strings.And}</Text>
                <Text
                  style={styles.privacyPolicyText}
                  onPress={onPrivacyPolicy}>
                  {Strings.PrivacyPolicyText}
                </Text>
              </Text>
              <CustomButton
                title={Strings.sendMessage}
                onPress={handleSubmit}
                btnStyle={styles.btnSignIn}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Help;
