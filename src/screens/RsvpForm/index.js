// 3rd Party Imports
import React, {useCallback, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

// Local Imports
import {useDispatch, useSelector} from 'react-redux';

import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import fonts from '../../config/fonts';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {ToastSuccess} from '../../constants/ToastConstants';
import {responseEventRSVPInfoChirps} from '../../store/actions/InfoChirpsAction';
import Colors from '../../theme/Colors';
import {styles} from './styles';
import moment from 'moment';
export default function RsvpForm({navigation, route}) {
  const {InfoChirpsDetails} = route?.params;
  // Value Through AppConstants File
  const {Attend, UnAttend} = AppConstants.RsvpTabs;

  // const [Comment, setComment] = useState('');

  const [RSVPList, setRSVPList] = useState(InfoChirpsDetails);
  const [SelectedObject, setSelectedObject] = useState({});
  const dispatch = useDispatch();
  // const {eventObjectData} = useSelector(state => state.event);
  // Navigate To Other Screen ̦and Value Pass Through Navigation Params
  const handleAttend = useCallback(
    item => {
      navigation.navigate(NavigationRoutes.RsvpComments, {rsvpObj: item});
    },
    [navigation],
  );

  const responseRSVP = useCallback(
    (item, option) => {
      let requestData = {
        rsvpId: item.rsvpId,
        rsvpOption: option,
        comment:
          item.rsvpId === SelectedObject.rsvpId
            ? SelectedObject.comment === undefined
              ? item.comment
              : SelectedObject.comment
            : item.comment,
      };

      dispatch(
        responseEventRSVPInfoChirps(requestData, (isSuccess, message) => {
          if (isSuccess) {
            ToastSuccess(message);
          }
        }),
      );
    },
    [SelectedObject.comment, SelectedObject.rsvpId, dispatch],
  );

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar title={Strings.RSVPForm} leftIcon={Icons.backArrowIcon} />
      <View style={styles.contentContainer}>
        <FlatList
          data={RSVPList}
          renderItem={({item, index}) => (
            <View style={styles.rsvpMainContainer}>
              <View style={styles.rsvpTitleMainContainer}>
                {new Date() > new Date(item.rsvpDate) && (
                  <Text style={styles.rsvpExpiredTextStyle}>
                    {Strings.rsvpExpired}
                  </Text>
                )}

                <View style={styles.rsvpTitleContainer}>
                  <Text style={styles.rsvpTitleName} numberOfLines={2}>
                    {Strings.RSVP} : {item.title}
                  </Text>
                  <View>
                    <Text style={styles.rsvpDate}>
                      {Strings.rsvpDate}
                      {new Date(item.rsvpDate).toLocaleDateString()}
                    </Text>
                    <Text style={styles.rsvpDate}>
                      {Strings.rsvpTime}
                      {moment(item.rsvpDate).format(
                        AppConstants.TimeFormats.HourMinutesSecond,
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.rsvpDetailsContainer}>
                <Text style={styles.rsvpDescriptionData}>
                  {item.description}
                </Text>
                <CustomLabelTextInput
                  editable={new Date() > new Date(item.rsvpDate) ? false : true}
                  label={Strings.addCommentPlaceholder}
                  inputStyle={{
                    fontFamily: fonts.type.RobotoSerifRegular,
                    fontSize: fonts.size.s15,
                    color: Colors.logoBackgroundColor,
                    fontWeight: fonts.weight.w400,
                  }}
                  onFocus={() => {
                    console.log('Focused.... ', item);
                    setSelectedObject(item);
                  }}
                  containerStyle={{}}
                  onChangeText={txt => {
                    RSVPList[index].comment = txt;
                    setRSVPList([...RSVPList]);
                  }}
                  value={item.comment}
                  returnKeyType={'next'}
                  errorTextStyle={styles.errorTextStyle}
                  autoCapitalize={'words'}
                />
                <View style={styles.rsvpBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      responseRSVP(item, 1);
                    }}
                    disabled={
                      new Date() < new Date(item.rsvpDate) ? false : true
                    }
                    style={[
                      styles.rsvpAccept,
                      {
                        borderColor:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.Gray
                            : item.isSelected
                            ? item.rsvpOption === 'Accept'
                              ? Colors.logoBackgroundColor
                              : Colors.Gray
                            : Colors.Gray,
                        backgroundColor:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.GrayLite
                            : item.isSelected
                            ? item.rsvpOption === 'Accept'
                              ? Colors.logoBackgroundColor
                              : Colors.White
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.Gray
                            : item.isSelected
                            ? item.rsvpOption === 'Accept'
                              ? Colors.White
                              : Colors.Black
                            : Colors.Black,
                      }}>
                      {Strings.accept}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={
                      new Date() < new Date(item.rsvpDate) ? false : true
                    }
                    onPress={() => {
                      responseRSVP(item, 2);
                    }}
                    style={[
                      styles.rsvpDecline,
                      {
                        borderColor:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.Gray
                            : item.isSelected
                            ? item.rsvpOption === 'Decline'
                              ? Colors.BTNLiteGreen
                              : Colors.Gray
                            : Colors.Gray,
                        backgroundColor:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.GrayLite
                            : item.isSelected
                            ? item.rsvpOption === 'Decline'
                              ? Colors.BTNLiteGreen
                              : Colors.White
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          new Date() > new Date(item.rsvpDate)
                            ? Colors.Gray
                            : item.isSelected
                            ? item.rsvpOption === 'Decline'
                              ? Colors.White
                              : Colors.Black
                            : Colors.Black,
                      }}>
                      {Strings.decline}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleAttend(item);
                  }}
                  style={styles.rsvpResultContainer}>
                  <Text style={styles.rsvpResultText}>{Strings.seeResult}</Text>
                  <Image
                    source={Icons.rightArrow}
                    style={styles.rightArrowStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.rsvpId.toString()}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
}
