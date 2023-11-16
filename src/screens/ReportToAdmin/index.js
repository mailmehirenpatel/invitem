import React, {createRef, useCallback} from 'react';
import {View} from 'react-native';
import {CustomButton, CustomNavbar} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import styles from './styles';

import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {Strings} from '../../config/strings';
import {ToastSuccess} from '../../constants/ToastConstants';
import validationSchema from '../../services/validationServices';
import {SendReportToAdmin} from '../../store/actions/AuthAction';
const ReportToAdmin = ({navigation}) => {
  const inputRef = {
    subject: createRef(),
    message: createRef(),
  };

  const dispatch = useDispatch();

  const ReportToAdminCall = useCallback(
    ({subject, message}) => {
      let requestData = {
        title: subject,
        description: message,
      };
      dispatch(
        SendReportToAdmin(requestData, (isSuccess, Message) => {
          if (isSuccess) {
            ToastSuccess(Message);
            navigation.goBack();
          }
        }),
      );
    },
    [dispatch, navigation],
  );

  return (
    <View style={styles.ContentContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.ReportToAdmin}
      />
      <View style={styles.SubContainer}>
        <Formik
          initialValues={{
            message: '',
            subject: '',
          }}
          validationSchema={validationSchema.addReportToAdmin}
          onSubmit={ReportToAdminCall}>
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
                ref={inputRef.subject}
                label={'Subject'}
                containerStyle={{}}
                keyboardType={'default'}
                onChangeText={handleChange('subject')}
                value={values.subject.trim()}
                returnKeyType={'next'}
                onBlur={handleBlur('subject')}
                onSubmitEditing={() => inputRef.message.current.focus()}
                error={touched.subject && errors.subject}
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
                onSubmitEditing={handleSubmit}
                error={touched.message && errors.message}
              />

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

export default ReportToAdmin;
