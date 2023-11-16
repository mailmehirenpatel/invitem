// 3rd Party Imports
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Image, Keyboard, Pressable, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Local Imports
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {CustomNavbar} from '../../components';
import CustomLabelTextInput from '../../components/CustomLabelTextInput';
import {Strings} from '../../config/strings';
import {ToastError, ToastSuccess} from '../../constants/ToastConstants';
import APP_CONFIG from '../../constants/config';
import validationSchema from '../../services/validationServices';
import {
  AddLocationData,
  getLocationData,
} from '../../store/actions/EventAction';
import {getAddressFromCoordinates, getCurrentLocation} from '../../utils';
import styles from './styles';
const locationFormRef = createRef();

const AddLocation = ({navigation, route}) => {
  const {getNewLocationData} = route.params || {};
  const [locationData, setLocationData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [Coordinates, setCoordinates] = useState({lat: 0, long: 0});

  const gPlacesRef = useRef();
  // Global Add Location Field References
  const inputRef = {
    locationName: createRef(),
    contactNumber: createRef(),
    address: createRef(),
    city: createRef(),
    country: createRef(),
    state: createRef(),
  };

  const dispatch = useDispatch();

  // Location Save
  const onSave = useCallback(() => locationFormRef.current.handleSubmit(), []);

  const onSubmit = useCallback(
    value => {
      const data = {
        id: 0,
        locationName: value?.locationName,
        address: value?.address,
        city: value?.city,
        state: value?.state,
        country: value?.country,
        latitude: Coordinates.lat,
        longitude: Coordinates.long,
      };
      try {
        dispatch(
          AddLocationData(data, (isSuccess, message, result) => {
            if (isSuccess) {
              ToastSuccess(message);
              dispatch(getLocationData());
              navigation.goBack();
              getNewLocationData(result);
            } else {
              ToastError(message);
            }
          }),
        );
      } catch (error) {
        console.log('Err : ', error);
      }
    },
    [
      Coordinates.lat,
      Coordinates.long,
      dispatch,
      getNewLocationData,
      navigation,
    ],
  );
  const handleFetchDetails = useCallback(() => setIsSearching(true), []);

  // Clear Search
  const handleClearSearch = useCallback(() => setIsSearching(false), []);

  // UseEffect Call for Set location Address
  useEffect(() => {
    gPlacesRef.current?.setAddressText('');
  }, []);

  // Current Location Functionality
  const onCurrentLocation = useCallback(async () => {
    getCurrentLocation()
      .then(res => {
        getAddressFromCoordinates(res?.latitude, res?.longitude).then(
          addressRes => {
            const details = addressRes[0];
            const countryComponent = details.address_components.find(
              component => component.types.includes('country'),
            );
            const cityComponent = details.address_components.find(component =>
              component.types.includes('locality'),
            );
            const LocationName = details.address_components.find(component =>
              component.types.includes('sublocality_level_1'),
            );

            const stateName = details.address_components.find(component =>
              component.types.includes('administrative_area_level_1'),
            );

            locationFormRef.current.setFieldValue(
              'state',
              stateName ? stateName?.long_name : '',
            );
            locationFormRef.current.setFieldValue(
              'address',
              details?.formatted_address,
            );

            locationFormRef.current.setFieldValue(
              'locationName',
              LocationName?.long_name,
            );
            locationFormRef.current.setFieldValue(
              'city',
              cityComponent ? cityComponent.long_name : '',
            );
            locationFormRef.current.setFieldValue(
              'country',
              countryComponent ? countryComponent.long_name : '',
            );
            setCoordinates({lat: res?.latitude, long: res?.longitude});
          },
        );
      })
      .catch(err => console.log('error location ', err));
  }, []);

  // Location Selection Functionality
  const onPressLocation = useCallback((data, details) => {
    const {geometry} = details;
    const {location} = geometry;
    const {lat, lng} = location;
    locationFormRef.current.setFieldValue('address', data.description);
    if (details && details.address_components) {
      const countryComponent = details.address_components.find(component =>
        component.types.includes('country'),
      );
      const cityComponent = details.address_components.find(component =>
        component.types.includes('locality'),
      );
      const stateName = details.address_components.find(component =>
        component.types.includes('administrative_area_level_1'),
      );

      locationFormRef.current.setFieldValue(
        'state',
        stateName ? stateName?.long_name : '',
      );
      locationFormRef.current.setFieldValue(
        'locationName',
        data?.structured_formatting?.main_text,
      );
      locationFormRef.current.setFieldValue(
        'city',
        cityComponent ? cityComponent.long_name : '',
      );
      locationFormRef.current.setFieldValue(
        'country',
        countryComponent ? countryComponent.long_name : '',
      );
    }
    setCoordinates({lat: lat, long: lng});
    setLocationData(prev => [...prev, data]);
    gPlacesRef.current?.setAddressText('');
  }, []);

  // TO DO once apis integration done
  const renderLocation = useCallback(({item, index}) => {
    return (
      <View style={styles.locationDetailView} key={index}>
        <Image style={styles.detailLocationIconStyle} source={Icons.location} />
        <View style={styles.textsView}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item?.structured_formatting?.main_text}
          </Text>
          <Text style={styles.detailText} numberOfLines={2}>
            {item?.description}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={Strings.AddLocation}
        leftIcon={Icons.backArrowIcon}
        rightText={Strings.Save}
        onRightAction={onSave}
      />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.searchView,
            isSearching && styles.searchViewWithLocation,
          ]}>
          <GooglePlacesAutocomplete
            ref={gPlacesRef}
            placeholder={Strings.SearchLocation}
            renderLeftButton={() => (
              <View style={styles.leftView}>
                <Image source={Icons.searchIcon} style={styles.searchIcon} />
              </View>
            )}
            fetchDetails={true}
            query={{
              key: APP_CONFIG.GOOGLE_API_KEY,
              language: 'en',
            }}
            textInputProps={{
              onFocus: handleFetchDetails,
              onBlur: handleClearSearch,
            }}
            styles={{
              container: [
                styles.searchContainerStyle,
                isSearching && styles.searchContainerwithLocation,
              ],
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.locationList,
            }}
            onPress={(data, details = null) => onPressLocation(data, details)}
          />
        </View>
        <Pressable
          style={styles.currentLocationView}
          onPress={onCurrentLocation}>
          <View style={styles.locationIconView}>
            <Image source={Icons.location} style={styles.iconStyle} />
          </View>
          <Text style={styles.useMyCurrentLocationText}>
            {Strings.UseMyCurrentLocation}
          </Text>
        </Pressable>
        {/* TO DO once apis integration done */}
        {/* {locationData.length > 0 && (
          <FlatList
            data={locationData}
            renderItem={renderLocation}
            keyExtractor={(item, index) => index.toString()}
            style={styles.listContainer}
          />
        )} */}
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled">
          <View style={styles.addressContainer}>
            <Formik
              innerRef={locationFormRef}
              initialValues={{
                locationName: '',
                // contactNumber: '',
                address: '',
                city: '',
                country: '',
                state: '',
              }}
              validationSchema={validationSchema.addLocation}
              onSubmit={onSubmit}>
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
                    label={Strings.LocationNamePlaceholder}
                    ref={inputRef.locationName}
                    value={values.locationName}
                    returnKeyType={'next'}
                    keyboardType={'default'}
                    error={touched.locationName && errors.locationName}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    onChangeText={handleChange('locationName')}
                    onSubmitEditing={() => inputRef.address.current.focus()}
                  />
                  {/* Contect Number filed */}
                  {/* <CustomTextInput
                    ref={inputRef.contactNumber}
                    placeholder={Strings.ContactNumberPlaceholder}
                    value={values.contactNumber}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    error={touched.contactNumber && errors.contactNumber}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    onChangeText={handleChange('contactNumber')}
                    onSubmitEditing={() => inputRef.address.current.focus()}
                  /> */}
                  <CustomLabelTextInput
                    label={Strings.AddressPlaceholder}
                    ref={inputRef.address}
                    placeholder={Strings.AddressPlaceholder}
                    value={values.address}
                    returnKeyType={'next'}
                    keyboardType={'default'}
                    multiline
                    numberOfLines={4}
                    error={touched.address && errors.address}
                    inputStyle={styles.addressInput}
                    containerStyle={[
                      styles.inputContainer,
                      styles.addressInputContainer,
                    ]}
                    errorTextStyle={styles.errorTextStyle}
                    onChangeText={handleChange('address')}
                    onSubmitEditing={() => inputRef.city.current.focus()}
                  />
                  <CustomLabelTextInput
                    label={Strings.CityNamePlaceholder}
                    ref={inputRef.city}
                    placeholder={Strings.CityNamePlaceholder}
                    value={values.city}
                    returnKeyType={'next'}
                    keyboardType={'default'}
                    error={touched.city && errors.city}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    errorTextStyle={styles.errorTextStyle}
                    onChangeText={handleChange('city')}
                    onSubmitEditing={() => inputRef.state.current.focus()}
                  />
                  <CustomLabelTextInput
                    label={Strings.StateNamePlaceholder}
                    ref={inputRef.state}
                    placeholder={Strings.StateNamePlaceholder}
                    value={values.state}
                    returnKeyType={'next'}
                    keyboardType={'default'}
                    error={touched.state && errors.state}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    errorTextStyle={styles.errorTextStyle}
                    onChangeText={handleChange('state')}
                    onSubmitEditing={() => inputRef.country.current.focus()}
                  />
                  <CustomLabelTextInput
                    label={Strings.CountryNamePlaceholder}
                    ref={inputRef.country}
                    placeholder={Strings.CountryNamePlaceholder}
                    value={values.country}
                    returnKeyType={'done'}
                    keyboardType={'default'}
                    error={touched.country && errors.country}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    errorTextStyle={styles.errorTextStyle}
                    onChangeText={handleChange('country')}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddLocation;
