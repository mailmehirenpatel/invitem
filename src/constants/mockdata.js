import {Icons} from '../assets';
import {Strings} from '../config/strings';
import Colors from '../theme/Colors';
import mockImages from './MockImages/images';
import NavigationRoutes from './NavigationRoutes';

const weekDays = [
  {
    id: 0,
    name: 'Sun',
  },
  {
    id: 1,
    name: 'Mon',
  },
  {
    id: 2,
    name: 'Tue',
  },
  {
    id: 3,
    name: 'Wed',
  },
  {
    id: 4,
    name: 'Thu',
  },
  {
    id: 5,
    name: 'Fri',
  },
  {
    id: 6,
    name: 'Sat',
  },
];

const eventStatusData = [
  {
    id: 1,
    name: 'Confirm',
    color: Colors.YellowText,
  },
  {
    id: 2,
    name: 'Accepted',
    color: Colors.Green,
  },
  {
    id: 153,
    name: 'Declined',
    color: Colors.Red,
  },
  {
    id: 189,
    name: 'Host',
    color: Colors.DottedBorder,
  },
];
const recurringData = [
  {
    id: 0,
    name: 'Every day',
  },
  {
    id: 1,
    name: 'Every week',
  },
  {
    id: 2,
    name: 'Every 2 weeks',
  },
  {
    id: 3,
    name: 'Every month',
  },
];
const stopRecurringData = [
  {
    id: 1,
    name: 'Never',
  },
  {
    id: 2,
    name: 'Ask me',
  },
];
const answerDeadlineData = [
  {
    id: 0,
    day: '1 day before',
  },
  {
    id: 1,
    day: '2 days before',
  },
  {
    id: 2,
    day: '7 days before',
  },
  {
    id: 3,
    day: '14 days before',
  },
  {
    id: 4,
    day: 'month before',
  },
];
const AdminInfoData = [
  {
    id: 1,
    title: Strings.CreateNote,
    icon: Icons.NoteIcn,
    iconTintColor: '#75CEC4',
    iconBackground: 'rgba(117, 206, 196, 0.2)',
    screen: NavigationRoutes.CreateNote,
  },
  {
    id: 2,
    title: Strings.AddImage,
    icon: Icons.GalleryIcn,
    iconTintColor: '#6435F4',
    iconBackground: 'rgba(100, 53, 244, 0.2)',
    screen: NavigationRoutes.AddImage,
  },

  {
    id: 3,
    title: Strings.AddDocument,
    icon: Icons.DocIcn,
    iconTintColor: '#E0C213',
    iconBackground: 'rgba(224, 194, 19, 0.2)',
    screen: NavigationRoutes.AddDocument,
  },
  {
    id: 4,
    title: Strings.AddWebsite,
    icon: Icons.websiteIcn,
    iconTintColor: '#11C782',
    iconBackground: 'rgba(17, 199, 130, 0.2)',
    screen: NavigationRoutes.AddWebsite,
  },
  {
    id: 5,
    title: Strings.ImportCalendar,
    icon: Icons.CalendarIcn,
    iconTintColor: '#E71E4F',
    iconBackground: 'rgba(231, 30, 79, 0.2)',
    screen: undefined,
  },
  {
    id: 6,
    title: Strings.AddRSVP,
    icon: Icons.inviteUserIcn,
    iconTintColor: '#F26942',
    iconBackground: 'rgba(242, 105, 66, 0.2)',
    screen: NavigationRoutes.AddRSVP,
  },
  {
    id: 7,
    title: Strings.AddVoteOrPoll,
    icon: Icons.pieIcn,
    iconTintColor: '#A752C0',
    iconBackground: 'rgba(167, 82, 192, 0.2)',
    screen: NavigationRoutes.AddVoteOrPoll,
  },
  {
    id: 8,
    title: Strings.AddLocation,
    icon: Icons.mapPin,
    iconTintColor: '#28A908',
    iconBackground: 'rgba(40, 169, 8, 0.2)',
    screen: NavigationRoutes.AddLocation,
  },
  {
    id: 9,
    title: Strings.AddCheckList,
    icon: Icons.storeIcn,
    iconTintColor: '#0896A9',
    iconBackground: 'rgba(40, 169, 8, 0.2)',
    screen: NavigationRoutes.AddChecklist,
  },
  {
    id: 10,
    title: Strings.AddChoiceList,
    icon: Icons.choiceIcon,
    iconTintColor: '#A90825',
    iconBackground: 'rgba(169, 8, 37, 0.2)',
    screen: NavigationRoutes.AddChoiceList,
  },
  {
    id: 11,
    title: Strings.AddSocialMedia,
    icon: Icons.shareIcn,
    iconTintColor: '#03816A',
    iconBackground: 'rgba(3, 129, 106, 0.2)',
    screen: NavigationRoutes.AddSocialMedia,
  },
];

const RsvpAttendCommentData = [
  {
    id: 1,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
  {
    id: 2,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
  {
    id: 3,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
  {
    id: 4,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
];

const RsvpUnAttendCommentData = [
  {
    id: 1,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
  {
    id: 2,
    image: mockImages.addUser1,
    title: 'Macdonald',
    icon: Icons.attendIcon,
    description: 'Thank you for organize event.',
    date: '1st July, 2023',
  },
];
const MeetingType = [
  {
    id: 1,
    name: 'Private',
  },
  {
    id: 2,
    name: 'On Invite',
  },
  {
    id: 3,
    name: 'Public',
  },
];

const EventData = [
  {
    id: 1,
    image: mockImages.FIH_Pro_League,
    eventName: 'FIH Pro League',
  },
  {
    id: 2,
    image: mockImages.Junior_World_Cup,
    eventName: 'Junior World Cup',
  },
  {
    id: 3,
    image: mockImages.FIH_Congress,
    eventName: 'FIH Congress',
  },
  {
    id: 4,
    image: mockImages.Indoor_World_Cup,
    eventName: 'Indoor World Cup',
  },
  {
    id: 5,
    image: mockImages.Youth_Hokey_Games,
    eventName: 'Youth Hokey Games',
  },
  {
    id: 6,
    image: mockImages.Hokey_Premium_League,
    eventName: 'Hokey Premium League',
  },
  {
    id: 7,
    image: mockImages.Junior_World_Cup,
    eventName: 'Junior World Cup',
  },
  {
    id: 8,
    image: mockImages.FIH_Pro_League,
    eventName: 'FIH Pro League',
  },
  {
    id: 9,
    image: mockImages.Indoor_World_Cup,
    eventName: 'Indoor World Cup',
  },
  {
    id: 10,
    image: mockImages.FIH_Congress,
    eventName: 'FIH Congress',
  },
  {
    id: 11,
    image: mockImages.Youth_Hokey_Games,
    eventName: 'Youth Hokey Games',
  },
  {
    id: 12,
    image: mockImages.Hokey_Premium_League,
    eventName: 'Hokey Premium League',
  },
];
const AddUserData = [
  {
    id: 1,
    name: 'Justin J. Wasserman',
    image: Icons.choiceIcon,
    color: Colors.BlueProfileNotificationIcon,
    isGuest: true,
    guest: 'Guest',
  },
  {
    id: 2,
    name: 'Ha R. Reed',
    image: mockImages.addUser2,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 3,
    name: 'Rosemary G. Stapleton',
    image: mockImages.addUser3,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 4,
    name: 'Grace S. Negron',
    image: mockImages.addUser4,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 5,
    name: 'David N. Burke',
    image: mockImages.addUser5,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 6,
    name: 'Justin J. Wasserman',
    image: mockImages.addUser6,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 7,
    name: 'Jimmy S. Engel',
    image: mockImages.addUser7,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 8,
    name: 'Bill J. Davis',
    image: mockImages.addUser8,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 9,
    name: 'Tommy C. Micco',
    image: mockImages.addUser9,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 10,
    name: 'Oscar B. Kunkel',
    image: mockImages.addUser10,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 11,
    name: 'Carla J. Yamasaki',
    image: mockImages.addUser11,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 12,
    name: 'Derrick E. Brown',
    image: mockImages.addUser12,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 13,
    name: 'Erminia T. Nordstrom',
    image: mockImages.addUser13,
    color: Colors.BlueProfileNotificationIcon,
  },
  {
    id: 14,
    name: 'Daniel C. Forward',
    image: mockImages.addUser14,
    color: Colors.BlueProfileNotificationIcon,
  },
];

const CalendarData = [
  {
    id: 1,
    scheduleEventName: 'Hokey Match',
    eventTime: '22nd June 6:00pm',
  },
  {
    id: 2,
    scheduleEventName: 'Junior League',
    eventTime: '1st July 3:00pm',
  },
  {
    id: 3,
    scheduleEventName: 'Fise League',
    eventTime: '4th July 7:00pm',
  },
  {
    id: 4,
    scheduleEventName: 'Hokey Match',
    eventTime: '10th July 5:00pm',
  },
];
const SocialData = [
  {
    id: 1,
    socialPlatFormName: Strings.Facebook,
    platformIcon: Icons.faceBookSocialIcon,
  },
  {
    id: 2,
    socialPlatFormName: Strings.Instagram,
    platformIcon: Icons.instagramSocialIcon,
  },
  {
    id: 3,
    socialPlatFormName: Strings.Twitter,
    platformIcon: Icons.twitterSocialIcon,
  },
  {
    id: 4,
    socialPlatFormName: Strings.LinkedIn,
    platformIcon: Icons.linkedInSocialIcon,
  },
];

const EventProfileNotifications = [
  {
    id: 1,
    name: Strings.MuteNotification,
    image: Icons.bellIcon,
    color: Colors.GreenProfileNotificationIcon,
  },
  {
    id: 2,
    name: Strings.MuteChat,
    image: Icons.messageIcon,
    color: Colors.PurpleProfileNotificationIcon,
  },
  {
    id: 3,
    name: Strings.MuteParticipant,
    image: Icons.micIcon,
    color: Colors.BlueProfileNotificationIcon,
  },
];

const guestEventProfileNotifications = [
  // {
  //   id: 1,
  //   name: Strings.MuteNotification,
  //   image: Icons.bellIcon,
  //   color: Colors.GreenProfileNotificationIcon,
  // },
  {
    id: 2,
    name: Strings.MuteChat,
    image: Icons.messageIcon,
    color: Colors.PurpleProfileNotificationIcon,
  },
];
const EventPollData = [
  {
    title: 'Which Location Do you link most?',
    data: [
      {
        id: 1,
        option: '37 Westcomb Crescent',
        isSelected: true,
      },
      {
        id: 2,
        option: '112 Parkside Dr',
        isSelected: false,
      },
      {
        id: 3,
        option: 'Raiders Rd',
        isSelected: false,
      },
      {
        id: 4,
        option: '6 Doiron Dr',
        isSelected: false,
      },
    ],
  },
];

const EventPollResultsData = [
  {
    id: 1,
    selectedOption: '37 Westcomb Crescent',
    votes: 6,
  },
  {
    id: 2,
    selectedOption: '112 Parkside Dr',
    votes: 9,
  },
  {
    id: 3,
    selectedOption: 'Raiders Rd',
    votes: 12,
  },
  {
    id: 4,
    selectedOption: '6 Doiron Dr',
    votes: 7,
  },
];

const infoTabDescription = {
  description:
    'Now add info your guest may need\nto know by selecting options below.\n The more info you add the less\n questions you receive.',
};
const EventNoteTitle = {
  title: 'Development Vs Design',
};
const EventNoteDescription = {
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
};
const listEventFeature = [
  {
    id: 1,
    icon: Icons.websiteIcn,
    name: Strings.WebsiteLink,
    color: '#11C782',
  },
  {
    id: 2,
    icon: Icons.PollIcn,
    name: Strings.Poll,
    color: '#F26942',
  },
  {
    id: 3,
    icon: Icons.RsvpIcn,
    name: Strings.RSVP,
    color: '#11C782',
  },
  {
    id: 4,
    icon: Icons.DocIcn,
    name: Strings.Document,
    color: '#E0C213',
  },
  {
    id: 5,
    icon: Icons.mapPin,
    name: Strings.Location,
    color: '#28A908',
  },
  {
    id: 6,
    icon: Icons.CalendarIcn,
    name: Strings.Calendar,
    color: '#E71E4F',
  },
  {
    id: 7,
    icon: Icons.NoteIcn,
    name: Strings.Note,
    color: '#75CEC4',
  },
  {
    id: 8,
    icon: Icons.GalleryIcn,
    name: Strings.Photo,
    color: '#6435F4',
  },
  {
    id: 9,
    icon: Icons.shareIcn,
    name: Strings.socialMedia,
    color: '#03816A',
  },
];
const listChatUsers = [
  {
    id: 1,
    name: 'Justin J. Wasserman',
    message: 'Lorem Ipsum has been the industry s standard dummy text',
    profile: mockImages.ProfileSelection1,
    time: '11:50AM',
  },
  {
    id: 2,
    name: 'Justin J. Wasserman',
    message: 'Lorem Ipsum has been the industry s standard dummy text',
    profile: mockImages.ProfileSelection1,
    time: '11:50AM',
  },
  {
    id: 3,
    name: 'Justin J. Wasserman',
    message: 'Lorem Ipsum has been the industry s standard dummy text',
    profile: mockImages.ProfileSelection2,
    time: '11:50AM',
  },
  {
    id: 4,
    name: 'Justin J. Wasserman',
    message: 'Lorem Ipsum has been the industry s standard dummy text',
    profile: mockImages.ProfileSelection1,
    time: '11:50AM',
  },
  {
    id: 5,
    name: 'Justin J. Wasserman',
    message: 'Lorem Ipsum has been the industry s standard dummy text',
    profile: mockImages.ProfileSelection1,
    time: '11:50AM',
  },
];
const ListEventSettings = [
  {
    id: 1,
    title: Strings.AccountSetting,
    icon: Icons.settingIcn,
    iconTintColor: '#75CEC4',
    iconBackground: 'rgba(117, 206, 196, 0.2)',
  },
  {
    id: 2,
    title: Strings.ThemeMode,
    icon: Icons.themeIcn,
    iconTintColor: '#03816A',
    iconBackground: 'rgba(3, 129, 106, 0.2)',
  },
  {
    id: 3,
    title: Strings.Notification,
    icon: Icons.notificationIcn,
    iconTintColor: '#6435F4',
    iconBackground: 'rgba(100, 53, 244, 0.2)',
  },
  {
    id: 4,
    title: Strings.StorageAndData,
    icon: Icons.storageIcn,
    iconTintColor: '#33BEF8',
    iconBackground: 'rgba(51, 190, 248, 0.2)',
  },
  {
    id: 5,
    title: Strings.Help,
    icon: Icons.helpIcn,
    iconTintColor: '#E0C213',
    iconBackground: 'rgba(224, 194, 19, 0.2)',
  },
  {
    id: 6,
    title: Strings.InviteFriends,
    icon: Icons.inviteUserIcn,
    iconTintColor: '#11C782',
    iconBackground: 'rgba(17, 199, 130, 0.2)',
  },
  {
    id: 7,
    title: Strings.ReportToAdmin,
    icon: Icons.userIcn,
    iconTintColor: '#E71E4F',
    iconBackground: 'rgba(231, 30, 79, 0.2)',
  },
  {
    id: 8,
    title: Strings.Logout,
    icon: Icons.logoutIcn,
    iconTintColor: '#F26942',
    iconBackground: 'rgba(242, 105, 66, 0.2)',
  },
];
const ListProfileSettings = [
  // {
  //   id: 1,
  //   title: Strings.Notification,
  //   icon: Icons.notificationIcn,
  //   iconTintColor: '#6435F4',
  //   iconBackground: 'rgba(100, 53, 244, 0.2)',
  // },
  // {
  //   id: 2,
  //   title: Strings.StorageAndData,
  //   icon: Icons.storageIcn,
  //   iconTintColor: '#33BEF8',
  //   iconBackground: 'rgba(51, 190, 248, 0.2)',
  // },
  {
    id: 3,
    title: Strings.InviteFriends,
    icon: Icons.inviteUserIcn,
    iconTintColor: '#11C782',
    iconBackground: 'rgba(17, 199, 130, 0.2)',
  },
  // {
  //   id: 4,
  //   title: Strings.Password,
  //   icon: Icons.lockIcon,
  //   iconTintColor: '#E71E4F',
  //   iconBackground: 'rgba(231, 30, 79, 0.2)',
  // },
  {
    id: 5,
    title: Strings.Mpin,
    icon: Icons.numberPadIcon,
    iconTintColor: '#03816A',
    iconBackground: 'rgba(3, 129, 106, 0.2)',
  },
  {
    id: 6,
    title: Strings.TermsAndCondition,
    icon: Icons.termsAndConditionIcon,
    iconTintColor: '#E71E4F',
    iconBackground: 'rgba(231, 30, 79, 0.2)',
  },
  {
    id: 7,
    title: Strings.PrivacyPolicy,
    icon: Icons.privacyAndPolicyIcon,
    iconTintColor: '#11C782',
    iconBackground: 'rgba(17, 199, 130, 0.2)',
  },
  {
    id: 8,
    title: Strings.AboutUs,
    icon: Icons.aboutUsIcon,
    iconTintColor: '#6435F4',
    iconBackground: 'rgba(100, 53, 244, 0.2)',
  },
  {
    id: 9,
    title: Strings.ReportToAdmin,
    icon: Icons.DocIcn,
    iconTintColor: '#E0C213',
    iconBackground: 'rgba(224, 194, 19, 0.2)',
  },
  {
    id: 10,
    title: Strings.Help,
    icon: Icons.helpIcon,
    iconTintColor: '#28A908',
    iconBackground: 'rgba(40, 169, 8, 0.2)',
  },
  {
    id: 11,
    title: Strings.Logout,
    icon: Icons.logoutIcn,
    iconTintColor: '#F26942',
    iconBackground: 'rgba(242, 105, 66, 0.2)',
  },
];
const MarkerData = [
  {
    title: 'Chandlodiya',
    coordinates: {
      latitude: 23.074644,
      longitude: 72.544146,
    },
    image: mockImages.ProfileSelection2,
  },
  {
    title: 'Naranpura',
    coordinates: {
      latitude: 23.056086,
      longitude: 72.549988,
    },
    image: mockImages.FIH_Pro_League,
  },
  {
    title: 'Ranip Event',
    coordinates: {
      latitude: 23.078091,
      longitude: 72.57579,
    },
    image: mockImages.Indoor_World_Cup,
  },
  {
    title: 'RTO Event',
    coordinates: {
      latitude: 23.014509,
      longitude: 72.591759,
    },
    image: mockImages.Junior_World_Cup,
  },
];

const addMultipleLocation = [
  {
    title: 'Ranip, Ahmedabad',
    coordinates: {
      latitude: 23.301588287083753,
      longitude: 72.24953044749412,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    title: 'Naranpura, Ahmedabad',
    coordinates: {
      latitude: 33.301588287083753,
      longitude: 75.24953044749412,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    title: 'Keshod',
    coordinates: {
      latitude: 21.301588287083753,
      longitude: 70.24953044749412,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    title: 'RAJKOT',
    coordinates: {
      latitude: 22.303591397254458,
      longitude: 70.79929946676883,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
];
export {
  AddUserData,
  AdminInfoData,
  CalendarData,
  EventData,
  EventPollData,
  EventPollResultsData,
  listEventFeature,
  listChatUsers,
  ListEventSettings,
  EventProfileNotifications,
  MeetingType,
  RsvpAttendCommentData,
  RsvpUnAttendCommentData,
  SocialData,
  infoTabDescription,
  ListProfileSettings,
  EventNoteDescription,
  EventNoteTitle,
  MarkerData,
  guestEventProfileNotifications,
  addMultipleLocation,
  weekDays,
  eventStatusData,
  recurringData,
  stopRecurringData,
  answerDeadlineData,
};
