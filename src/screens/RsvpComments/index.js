// 3rd Party Imports
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

// Local Imports
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar, CustomProfileImage} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import {getRSVPDetails} from '../../store/actions/InfoChirpsAction';
import Colors from '../../theme/Colors';
import {styles} from './styles';

// FlatList Render items
const renderRsvpComments = ({item, index}) => {
  return (
    <View style={styles.rsvpCommentMainContainer} key={index}>
      <View style={styles.rsvpCommentDetail}>
        <CustomProfileImage
          image={item.profile}
          imageStyle={styles.leftImage}
        />
        <View style={styles.rsvpRightContainer}>
          <View style={styles.commentTitleContainer}>
            <Text style={styles.titleTextStyle}>{item.createdBy}</Text>
            <Image source={item.icon} style={styles.commentRightIcon} />
          </View>
          <Text style={styles.descriptionTextStyle}>{item.comment}</Text>
        </View>
      </View>
      <View style={styles.rsvpDateContainer}>
        <Text style={styles.dateTextStyle}>{item.date}</Text>
      </View>
    </View>
  );
};

const RsvpComments = ({route}) => {
  // Value Pass Through Navigation Params
  const {rsvpObj} = route?.params;
  const dispatch = useDispatch();

  const [RSVPDetailsList, setRSVPDetailsList] = useState([]);

  useEffect(() => {
    dispatch(
      getRSVPDetails(rsvpObj.rsvpId, rsvpObj.eventInfoChirpId, result => {
        result && setRSVPDetailsList(result);
      }),
    );
  }, [dispatch, rsvpObj.eventInfoChirpId, rsvpObj.rsvpId]);

  // Value Through AppConstants File
  const {Attend, UnAttend} = AppConstants.RsvpTabs;

  // Value Pass Through Navigation Params
  const [SelectedTab, setSelectedTab] = useState(Attend);

  return (
    <View style={styles.mainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.RsvpResponses}
      />
      <View style={styles.contentContainer}>
        <View style={styles.rsvpStatusContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(Attend);
            }}
            style={[
              styles.attendUnattendContainer,
              {
                borderBottomColor:
                  SelectedTab === Attend
                    ? Colors.DarkGreen
                    : Colors.Transparent,
              },
            ]}>
            <Text
              style={[
                styles.attendUnattendTextStyle,
                {
                  color: SelectedTab === Attend ? Colors.Black : Colors.Gray,
                },
              ]}>
              {Strings.Attend} (
              {
                RSVPDetailsList.filter(i => {
                  return i.rsvpOption === 'Accept';
                }).length
              }
              )
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedTab(UnAttend);
            }}
            style={[
              styles.attendUnattendContainer,
              {
                borderBottomColor:
                  SelectedTab === UnAttend
                    ? Colors.DarkGreen
                    : Colors.Transparent,
              },
            ]}>
            <Text
              style={[
                styles.attendUnattendTextStyle,
                {
                  color:
                    SelectedTab === UnAttend
                      ? Colors.DarkGreen
                      : Colors.rsvpTextColor,
                },
              ]}>
              {Strings.unAttend} (
              {
                RSVPDetailsList.filter(i => {
                  return i.rsvpOption === 'Decline';
                }).length
              }
              )
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatListView}
          data={
            SelectedTab === Attend
              ? RSVPDetailsList.filter(i => {
                  return i.rsvpOption === 'Accept';
                })
              : RSVPDetailsList.filter(i => {
                  return i.rsvpOption === 'Decline';
                })
          }
          renderItem={renderRsvpComments}
          keyExtractor={item => item.id}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default RsvpComments;
