import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Icons} from '../../assets';
import styles from './styles';
const CustomSelectDropDown = ({
  data,
  defaultButtonText,
  buttonStyle,
  searchPlaceHolder,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
  defaultValue,
  defaultValueByIndex,
  isReset,
}) => {
  const dropdownRef = useRef({});
  useEffect(() => {
    isReset && dropdownRef.current.reset();
  }, [isReset]);

  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <SelectDropdown
        data={data}
        ref={dropdownRef}
        defaultValueByIndex={defaultValueByIndex}
        defaultValue={defaultValue}
        defaultButtonText={defaultButtonText}
        searchPlaceHolder={searchPlaceHolder}
        disableAutoScroll
        renderSearchInputRightIcon={() => (
          <Image source={Icons.searchIcon} style={styles.searchIconStyle} />
        )}
        buttonStyle={buttonStyle}
        buttonTextStyle={styles.dropDownTextStyle}
        search
        dropdownIconPosition="right"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onSelect={onSelect}
        renderDropdownIcon={() => (
          <Image
            source={Icons.showDropdownIcon}
            style={[
              styles.dropDownImageStyle,
              {transform: [{rotate: !isFocused ? '0deg' : '180deg'}]},
            ]}
          />
        )}
        rowTextStyle={styles.dropDownItemStyle}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
      />
    </View>
  );
};

export default CustomSelectDropDown;
