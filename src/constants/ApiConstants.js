// All API Url
import APP_CONFIG from '../constants/config';
const ApiConstants = {
  //Image Url
  ImageBaseUrl: APP_CONFIG.IMAGE_URL,

  //Auth Urls
  loginUrl: 'user/authenticate',
  registerUrl: 'user/register',
  verifyEmailUrl: 'user/email/send-verification-link',
  sendOtpUrl: 'user/send-otp',
  verifyOtpUrl: 'user/verify-otp',
  resetPasswordUrl: 'user/reset-password',
  createMPinUrl: '/user/create-mpin',
  mPinAuthenticateUrl: '/user/mpin-authenticate',
  verifyMpinUrl: '/user/verify-mpin',
  refeshTokenUrl: '/user/refresh-token',
  ResetMpinUrl: '/user/reset-mpin',
  RegisterDevideUrl: '/register-device',

  //User Profile Urls
  getUserProfileUrl: 'user/get-profile',
  getUserInfoByIdeUrl: 'user/get-user',
  updateUserProfileUrl: 'user/update-profile',
  SendReportToAdmin: 'user/report-to-admin',
  HelpUrl: 'user/customer-support',

  //Event Urls
  eventUrl: 'event/get-events-by-userId',
  AllEventUrl: 'event',
  UpdateEventUrl: 'event',
  AddEventUrl: 'event',
  DeleteEventUrl: 'event',
  AddMultipalEventUrl: 'event/multievent',
  LocationUrl: 'location',
  EventCategoryUrl: 'category',
  registerUserUrl: 'event/contacts',
  eventParticipantsUrl: 'event/event-participants',
  inviteUser: '/event/invite-user',
  joinEventUrl: '/event/join-event',
  upcomingEventUrl: 'event/upcommingevents',
  getEventSchedule: 'event/eventschedule',

  //InfoChirps Urls
  infoChirpsUrl: 'info-chirps',
  AddNoteInfoChirpsUrl: 'event-info-chirps/note',
  getEventInfoChirpsUrl: 'event-info-chirps',
  addImageInfoChirpsUrl: 'event-info-chirps/image',
  addDocumentInfoChirpsUrl: 'event-info-chirps/document',
  addWebLinksInfoChirpsUrl: 'event-info-chirps/web-link',
  deleteWebLinksInfoChirpUrl: 'event-info-chirps/web-link',
  AddRsvpInfoChirpsUrl: 'event-info-chirps/rsvp',
  getEventRSVPInfochirpsUrl: '/event-rsvp',
  getEventRSVPDetailsUrl: '/event-rsvp-detail',
  responseRSVPInfochirpsUrl: '/event-response',
  responsePollInfochirpsUrl: '/event-poll-response',
  AddSocialMediaInfoChirpsUrl: 'event-info-chirps/social-media-url',
  AddPollInfoChirpsUrl: 'event-info-chirps/poll',
  AddCheckListInfoChirpsUrl: 'event-info-chirps/add-checklist',
  AddChoiceListInfoChirpsUrl: 'event-info-chirps/choicelist',
  responseChoiceListInfoChirpsUrl: '/event-choicelist-response',
  //Media Upload Urls
  mediaUploadUrl: '/media/upload',

  // Push Notification Urls
  pushNotificationUrl: 'push-notification/notifications-config',

  //chat
  ChatSend: 'chat/send',
  getChat: 'chat/get-message-by-eventId',
  getImageByEventId: 'chat/get-Image-by-eventId',
  deleteChat: 'chat',

  //Geolocation URL
  GeoLocationUrl: 'https://maps.googleapis.com/maps/api/geocode/json',

  // Terms Condition and Privacy policy URL
  TermsConditionURL: APP_CONFIG.Terms_Condition_URL,
  PrivacyPolicyURL: APP_CONFIG.Privacy_Policy_URL,
  AboutUsURL: APP_CONFIG.About_Us_URL,

  // Open gmail functionality
  supportFeedBackURL: APP_CONFIG.Support_FeedBack,
  reportAdminURL: APP_CONFIG.Report_Admin,
};
export default ApiConstants;
