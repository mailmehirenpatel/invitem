import React from 'react';
import {FlatList, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import moment from 'moment';
import {Strings} from '../../config/strings';
import AppConstants from '../../constants/AppConstants';
import styles from './styles';

const RSVPPopup = ({isVisible, onView, data}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <View style={styles.mainDetailView} key={index}>
                    <View>
                      <Text style={styles.rsvpTitleText}>{item?.title}</Text>
                      <Text style={styles.pleaseConfirmText}>
                        {Strings.pleaseConfirmAttendance}
                      </Text>
                      <Text style={styles.rsvpCloseText}>
                        {`${Strings.rsvpClosesOn} ${moment(
                          item?.rsvpDate,
                        ).format(AppConstants.DateFormats.DayMonthYearTime)}`}
                      </Text>
                    </View>
                    <View style={styles.buttonsView}>
                      <Pressable
                        style={styles.viewRSVPButton}
                        onPress={() => onView(item?.rsvpId)}>
                        <Text style={styles.viewText}>{Strings.view}</Text>
                      </Pressable>
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default RSVPPopup;
