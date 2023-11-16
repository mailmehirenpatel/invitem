// Local Imports
import NavigationRoutes from '../constants/NavigationRoutes';
import AddCheckList from '../screens/AddChecklist';
import AddChoiceList from '../screens/AddChoiceList';
import AddDocument from '../screens/AddDocuments';
import AddEventScreen from '../screens/AddEventScreen';
import AddImage from '../screens/AddImage';
import AddLocation from '../screens/AddLocation';
import AddRSVP from '../screens/AddRSVP';
import AddSocialMedia from '../screens/AddSocialMedia';
import AddUser from '../screens/AddUser';
import AddVoteOrPoll from '../screens/AddVoteOrPoll';
import AddWebsite from '../screens/AddWebsite';
import AdminInfo from '../screens/AdminInfo';
import ConfirmPinScreen from '../screens/ConfirmPin';
import CreateNote from '../screens/CreateNote';
import EventCalendar from '../screens/EventCalendar';
import EventDetail from '../screens/EventDetail';
import EventLocation from '../screens/EventLocation';
import EventNote from '../screens/EventNote';
import EventPoll from '../screens/EventPoll';
import EventProfile from '../screens/EventProfileScreen';
import EventScreen from '../screens/EventScreen';
import GuestEventProfile from '../screens/GuestEventProfile';
import GuestList from '../screens/GuestList';
import Login from '../screens/Login';
import MpinCode from '../screens/MpinCode';
import OtpVerification from '../screens/OtpVerification';
import PollResults from '../screens/PollResults';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileSetting from '../screens/ProfileSetting';
import ResetPassword from '../screens/ResetPassword';
import RsvpComments from '../screens/RsvpComments';
import RsvpForm from '../screens/RsvpForm';
import SignUp from '../screens/SignUp';
import SocialMedia from '../screens/SocialMedia';
import UpdateEventScreen from '../screens/UpdateEventScreen';
import TermsCondition from '../screens/TermsCondition';
import ForgotPassword from '../screens/forgotPassword';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import AboutUs from '../screens/AboutUs';
import ReportToAdmin from '../screens/ReportToAdmin';
import Help from '../screens/Help';
import WebsiteLink from '../screens/WebsiteLink';
import EventDocument from '../screens/EventDocument';
import DocumentViewer from '../screens/AddDocuments/Component';
import ResetMPin from '../screens/ResetMPin';
import UserInfo from '../screens/UserInfo';
import EventCheckList from '../screens/CheckList';
import EventChoiceList from '../screens/EventChoiceList';
import ChoiceResult from '../screens/choiceResult';
import EventScheduleList from '../screens/EventScheduleList';
import UpdateEventScheduleList from '../screens/UpdateEventScheduleList';
import AddEventSchedule from '../screens/AddEventSchedule';
import UpcomingEvents from '../screens/EventCalendar';

// Common Options for Header Shown False
const commonOptions = {
  headerShown: false,
};

// Auth Screens
export const authScreens = {
  [NavigationRoutes.Login]: {
    component: Login,
    options: commonOptions,
  },
  [NavigationRoutes.SignUp]: {
    component: SignUp,
    options: commonOptions,
  },
  [NavigationRoutes.ForgotPassword]: {
    component: ForgotPassword,
    options: commonOptions,
  },
  [NavigationRoutes.OtpVerification]: {
    component: OtpVerification,
    options: commonOptions,
  },
  [NavigationRoutes.ResetPassword]: {
    component: ResetPassword,
    options: commonOptions,
  },
};

// Dashboard Screens
export const dashboardScreens = {
  [NavigationRoutes.MpinCode]: {
    component: MpinCode,
    options: commonOptions,
  },
  [NavigationRoutes.OtpVerification]: {
    component: OtpVerification,
    options: commonOptions,
  },
  [NavigationRoutes.ResetMPin]: {
    component: ResetMPin,
    options: commonOptions,
  },
  [NavigationRoutes.AddWebsite]: {
    component: AddWebsite,
    options: commonOptions,
  },
  [NavigationRoutes.AddDocument]: {
    component: AddDocument,
    options: commonOptions,
  },
  [NavigationRoutes.CreateNote]: {
    component: CreateNote,
    options: commonOptions,
  },
  [NavigationRoutes.EventCalendar]: {
    component: EventCalendar,
    options: commonOptions,
  },
  [NavigationRoutes.UpcomingEvents]: {
    component: UpcomingEvents,
    options: commonOptions,
  },
  [NavigationRoutes.EventScreen]: {
    component: EventScreen,
    options: commonOptions,
  },
  [NavigationRoutes.EventProfile]: {
    component: EventProfile,
    options: commonOptions,
  },
  [NavigationRoutes.SocialMedia]: {
    component: SocialMedia,
    options: commonOptions,
  },
  [NavigationRoutes.WebsiteLink]: {
    component: WebsiteLink,
    options: commonOptions,
  },
  [NavigationRoutes.RsvpForm]: {
    component: RsvpForm,
    options: commonOptions,
  },
  [NavigationRoutes.AddEvent]: {
    component: AddEventScreen,
    options: commonOptions,
  },
  [NavigationRoutes.UpdateEvent]: {
    component: UpdateEventScreen,
    options: commonOptions,
  },
  [NavigationRoutes.AddImage]: {
    component: AddImage,
    options: commonOptions,
  },
  [NavigationRoutes.EventDetail]: {
    component: EventDetail,
    options: commonOptions,
  },
  [NavigationRoutes.RsvpComments]: {
    component: RsvpComments,
    options: commonOptions,
  },
  [NavigationRoutes.AdminInfo]: {
    component: AdminInfo,
    options: commonOptions,
  },
  [NavigationRoutes.Profile]: {
    component: ProfileScreen,
    options: commonOptions,
  },
  [NavigationRoutes.UserInfo]: {
    component: UserInfo,
    options: commonOptions,
  },
  [NavigationRoutes.ProfileSetting]: {
    component: ProfileSetting,
    options: commonOptions,
  },
  [NavigationRoutes.EventPoll]: {
    component: EventPoll,
    options: commonOptions,
  },
  [NavigationRoutes.PollResults]: {
    component: PollResults,
    options: commonOptions,
  },
  [NavigationRoutes.ChoiceResults]: {
    component: ChoiceResult,
    options: commonOptions,
  },
  [NavigationRoutes.AddChecklist]: {
    component: AddCheckList,
    options: commonOptions,
  },
  [NavigationRoutes.AddUser]: {
    component: AddUser,
    options: commonOptions,
  },
  [NavigationRoutes.AddVoteOrPoll]: {
    component: AddVoteOrPoll,
    options: commonOptions,
  },
  [NavigationRoutes.AddChoiceList]: {
    component: AddChoiceList,
    options: commonOptions,
  },
  [NavigationRoutes.EventCheckList]: {
    component: EventCheckList,
    options: commonOptions,
  },
  [NavigationRoutes.AddSocialMedia]: {
    component: AddSocialMedia,
    options: commonOptions,
  },
  [NavigationRoutes.AddRSVP]: {
    component: AddRSVP,
    options: commonOptions,
  },
  [NavigationRoutes.ConfirmPin]: {
    component: ConfirmPinScreen,
    options: commonOptions,
  },
  [NavigationRoutes.EventNote]: {
    component: EventNote,
    options: commonOptions,
  },
  [NavigationRoutes.EventLocation]: {
    component: EventLocation,
    options: commonOptions,
  },
  [NavigationRoutes.AddLocation]: {
    component: AddLocation,
    options: commonOptions,
  },
  [NavigationRoutes.GuestEventProfile]: {
    component: GuestEventProfile,
    options: commonOptions,
  },
  [NavigationRoutes.GuestList]: {
    component: GuestList,
    options: commonOptions,
  },
  [NavigationRoutes.TermsCondition]: {
    component: TermsCondition,
    options: commonOptions,
  },
  [NavigationRoutes.PrivacyPolicy]: {
    component: PrivacyPolicy,
    options: commonOptions,
  },
  [NavigationRoutes.ReportToAdmin]: {
    component: ReportToAdmin,
    options: commonOptions,
  },
  [NavigationRoutes.Help]: {
    component: Help,
    options: commonOptions,
  },
  [NavigationRoutes.AboutUs]: {
    component: AboutUs,
    options: commonOptions,
  },
  [NavigationRoutes.EventDocument]: {
    component: EventDocument,
    options: commonOptions,
  },
  [NavigationRoutes.DocumentViewer]: {
    component: DocumentViewer,
    options: commonOptions,
  },
  [NavigationRoutes.EventChoiceList]: {
    component: EventChoiceList,
    options: commonOptions,
  },
  [NavigationRoutes.EventScheduleList]: {
    component: EventScheduleList,
    options: commonOptions,
  },
  [NavigationRoutes.UpdateEventScheduleList]: {
    component: UpdateEventScheduleList,
    options: commonOptions,
  },
  [NavigationRoutes.AddEventSchedule]: {
    component: AddEventSchedule,
    options: commonOptions,
  },
};
