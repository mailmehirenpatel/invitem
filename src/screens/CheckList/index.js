// 3rd Party imports
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
// Local imports
import {Icons, Images} from '../../assets';
import {CustomNavbar, FastImageView} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import {
  getCheckListInfoChirps,
  updateCheckListOption,
} from '../../store/actions/InfoChirpsAction';
import styles from './styles';
import ApiConstants from '../../constants/ApiConstants';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {getRegisterUser} from '../../store/actions/EventAction';
import Colors from '../../theme/Colors';
import {ToastSuccess} from '../../constants/ToastConstants';

const EventCheckList = ({navigation}) => {
  const [CheckLists, setCheckLists] = useState([]);
  const [userData, setUserData] = useState([]);
  const {eventObjectData} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const {EventInfoChirpsData} = useSelector(state => state.infoChirps);

  const CheckListInfochirpsId = EventInfoChirpsData.find(
    i => i.name === 'add checklist',
  );
  // get checklist infochirps data
  useEffect(() => {
    if (CheckListInfochirpsId !== undefined) {
      dispatch(
        getCheckListInfoChirps(
          eventObjectData?.id,
          CheckListInfochirpsId.id,
          result => {
            result && setCheckLists(result);
          },
        ),
      );
    }
    dispatch(getRegisterUser(eventObjectData.id, data => setUserData(data)));
  }, [CheckListInfochirpsId, dispatch, eventObjectData?.id]);

  const toggleItemSelection = useCallback(
    (options, checkListId, checkListOptionId, inx) => () => {
      const updatedOptions = [...options];
      updatedOptions[inx].isSelected = !updatedOptions[inx].isSelected;
      const isSelectedCheckBox = Boolean(
        updatedOptions
          ?.filter(e => e?.isSelected)
          ?.filter(e => e?.checkListOptionId === checkListOptionId)
          ?.map(x => x?.isSelected)
          .toString(),
      );
      const updatedOptionPayload = {
        checkListId: checkListId,
        checkListOptionId: checkListOptionId,
        isSelected: isSelectedCheckBox,
      };
      dispatch(
        updateCheckListOption(updatedOptionPayload, (result, message) => {
          if (result) {
            ToastSuccess(message);
          }
        }),
      );
    },
    [dispatch],
  );
  const onProfilePress = useCallback(
    item => () => {
      navigation.navigate(NavigationRoutes.UserInfo, {
        USERid: item?.userId,
      });
    },
    [navigation],
  );

  /** render the checklist data */
  const renderItem = useCallback(
    ({item, index}) => {
      const user = Object.assign(
        {},
        ...userData?.filter(e => e?.id === item?.userId),
      );
      return (
        <View style={styles.renderEventPollMainView} key={index}>
          <View style={styles.questionView}>
            <View>
              <View style={styles.createdUserView}>
                <Text style={styles.questionText}>{item?.title}</Text>
                <TouchableOpacity onPress={onProfilePress(item)}>
                  <FastImageView
                    uri={`${ApiConstants.ImageBaseUrl}/${user?.profileUrl}`}
                    style={styles.createdProfileImage}
                    defaultSource={Images.profileImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.separatorView} />
              <FlatList
                data={item?.options}
                keyExtractor={itm => itm?.checkListOptionId}
                renderItem={({item: optionItem, index: inx}) => {
                  return (
                    <View style={styles.checkListOptions} key={inx}>
                      <View style={styles.checkIconContainer}>
                        {user?.isAdmin ? (
                          <CheckBox
                            tintColors={{
                              true: Colors.logoBackgroundColor,
                              false: Colors.AuthFiledBorder,
                            }}
                            boxType={'square'}
                            disabled={false}
                            tintColor={Colors.AuthFiledBorder}
                            style={styles.checkIcon}
                            value={optionItem?.isSelected}
                            onFillColor={Colors.logoBackgroundColor}
                            onCheckColor={Colors.White}
                            onTintColor={Colors.logoBackgroundColor}
                            onValueChange={toggleItemSelection(
                              item?.options,
                              item?.checkListId,
                              optionItem?.checkListOptionId,
                              inx,
                            )}
                          />
                        ) : (
                          <Image
                            source={Icons.checkIcon}
                            style={styles.checkIconStyle}
                          />
                        )}
                      </View>
                      <Text style={styles.optionText}>
                        {optionItem?.option}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      );
    },
    [onProfilePress, toggleItemSelection, userData],
  );
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.EventCheckList}
        leftIcon={Icons.backArrowIcon}
      />
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          scrollEnabled={true}
          data={CheckLists}
          keyExtractor={item => item.checkListId.toString()}
          renderItem={renderItem}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventCheckList;
