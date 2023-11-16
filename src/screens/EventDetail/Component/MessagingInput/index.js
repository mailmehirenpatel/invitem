// 3rd Party Imports
import React, {useState} from 'react';
import {Image, Pressable, TextInput, View} from 'react-native';

// Local Imports
import {Icons} from '../../../../assets';
import CircleFilledIcon from '../../../../components/CircleFilledIcon';
import Colors from '../../../../theme/Colors';
import styles from './styles';

const MessagingInput = ({onIconPress, onSendPress, ...props}, ref) => {
  const [focused, setFocused] = useState(false);
  // Focus and Blur Functionality
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={ref}
        placeholderTextColor={Colors.PlaceholderLight}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={true}
        keyboardType={'default'}
        returnKeyType={'next'}
        {...props}
      />
      <View style={styles.rightIconsContainer}>
        <Pressable onPress={onIconPress}>
          <Image style={styles.rightIcon} source={Icons.attachment} />
        </Pressable>
        <CircleFilledIcon
          icon={Icons.sendArrow}
          iconStyle={styles.iconSend}
          containerStyle={styles.sendBtnContainer}
          onPress={onSendPress}
        />
      </View>
    </View>
  );
};

export default MessagingInput;
