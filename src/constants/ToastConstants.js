// 3rd Party Imports
import Toast from 'react-native-simple-toast';
// Local Imports
import Colors from '../theme/Colors';

// Toast Development Message Show
const ToastInDevelopment = () =>
  Toast.show('In Development', Toast.SHORT, {
    backgroundColor: Colors.logoBackgroundColor,
    textColor: Colors.White,
  });

// Toast Success Message
const ToastSuccess = SuccessMsg =>
  Toast.show(SuccessMsg, Toast.LONG, {
    backgroundColor: Colors.ApprovedGreenColor,
    textColor: Colors.White,
  });

// Toast Error Message
const ToastError = errMsg =>
  Toast.show(errMsg, Toast.LONG, {
    backgroundColor: Colors.RejectedRedColor,
    textColor: Colors.White,
  });

export {ToastInDevelopment, ToastSuccess, ToastError};
