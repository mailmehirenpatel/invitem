// 3rd Party Imports
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

// Local Imports
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import GoogleAdsComponent from '../../components/CustomGoogleAdd/GoogleAdsComponent';
import {Strings} from '../../config/strings';
import {getEventNoteInfoChirps} from '../../store/actions/InfoChirpsAction';
import styles from './styles';
import Clipboard from '@react-native-community/clipboard';
import {ToastSuccess} from '../../constants/ToastConstants';

const EventNote = ({navigation, route}) => {
  const {InfoChirpsDetails} = route.params;
  const [NoteList, setNoteList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getEventNoteInfoChirps(
        InfoChirpsDetails.eventId,
        InfoChirpsDetails.id,
        result => {
          result && setNoteList(result);
        },
      ),
    );
  }, [InfoChirpsDetails.eventId, InfoChirpsDetails.id, dispatch]);

  return (
    <View style={styles.eventNoteDataMainContainer}>
      <CustomNavbar
        leftIcon={Icons.backArrowIcon}
        title={Strings.EventNote}
        containerStyle={styles.navContainerStyle}
      />
      <View style={styles.contentContainer}>
        <FlatList
          data={NoteList ? NoteList : []}
          scrollEnabled={true}
          renderItem={({item}) => (
            <View style={styles.eventNoteDataContainer}>
              <Text style={styles.eventNoteDataTitle}>
                {Strings.title} :{' '}
                <Text style={styles.eventNoteDataDescription}>
                  {item.title}
                </Text>
              </Text>
              <Text style={styles.eventNoteDataTitle}>
                {Strings.Description} :
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(item.description);
                  ToastSuccess(Strings.copied);
                }}>
                <View>
                  <Text style={styles.eventNoteDataDescription}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <GoogleAdsComponent />
    </View>
  );
};

export default EventNote;
