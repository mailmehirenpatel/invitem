// 3rd Party Imports
import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Local Imports
import {Icons} from '../../assets';
import {Metrics} from '../../config/metrics';
import ErrorView from '../ErrorView';
import styles from './styles';

const CustomDropDown = forwardRef(
  (
    {
      data,
      title,
      placeholder,
      labelId,
      labelName,
      selected,
      onSelect,
      style,
      error,
      dropDownContainer = {},
      isDisable = false,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [listFiltered, setFilterData] = useState(data);
    const [dropdownTop, setDropdownTop] = useState(0);
    // Global Custom Dropdown Field References
    const DropdownButton = createRef();
    // Create StyleSheet Compose File and Use to Other Screen for Styling
    const buttonContainer = StyleSheet.compose(styles.button, [
      style,
      error ? styles.errorBorder : {},
    ]);
    const dropDownStyle = StyleSheet.compose(
      styles.dropdown,
      dropDownContainer,
    );

    // Dropdown Show and Hide Functionality
    const toggleDropdown = () => {
      visible ? setVisible(false) : openDropdown();
    };

    useEffect(() => {
      setFilterData(data);
    }, [data]);

    // Open Dropdown Function
    const openDropdown = () => {
      DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        const screenHeight = Metrics.screenHeight;
        const dropdownHeight = h + dropDownStyle[0].maxHeight; // Adjust this value if needed
        const dropdownPosition = py + h;

        if (dropdownPosition + dropdownHeight > screenHeight) {
          setDropdownTop(py - dropdownHeight); // Adjust the adjustment value if needed
        } else {
          setDropdownTop(py + h);
        }
      });
      setVisible(true);
    };

    // dropdown Select Item Functionality
    const onItemPress = useCallback(
      item => () => {
        onSelect(item);
        setVisible(false);
      },
      [onSelect],
    );

    // On Selection Functionality
    const onSelection = useCallback(() => setVisible(false), []);

    // FlatList Render Items
    const renderItem = ({item}) => (
      <Pressable style={styles.itemView} onPress={onItemPress(item)}>
        <Text style={styles.textItem}>{item[labelName]}</Text>
      </Pressable>
    );

    // Dropdown FlatList Data
    const renderDropdown = () => {
      return (
        <Modal visible={visible} transparent animationType="none">
          <Pressable style={styles.overlay} onPress={onSelection}>
            <View style={[dropDownStyle, {top: dropdownTop}]}>
              <FlatList
                data={listFiltered}
                renderItem={renderItem}
                keyExtractor={item => item[labelId]}
              />
            </View>
          </Pressable>
        </Modal>
      );
    };

    return (
      <>
        <View ref={ref} style={buttonContainer}>
          {renderDropdown()}
          <Text style={styles.titleText}>{title}</Text>
          <Pressable
            ref={DropdownButton}
            disabled={isDisable}
            style={styles.selectionView}
            onPress={toggleDropdown}>
            {selected ? (
              <Text style={styles.selectedText}>{selected[labelName]}</Text>
            ) : (
              <Text style={styles.placeHolderText}>{placeholder}</Text>
            )}

            {visible ? (
              <Image style={styles.downArrow} source={Icons.hideDropdownIcon} />
            ) : (
              <Image style={styles.downArrow} source={Icons.showDropdownIcon} />
            )}
          </Pressable>
        </View>
        {error ? (
          <ErrorView {...{error}} errorStyle={styles.errorStyle} />
        ) : null}
      </>
    );
  },
);

export default CustomDropDown;
