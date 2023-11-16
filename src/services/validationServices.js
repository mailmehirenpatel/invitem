// 3rd Party Imports
import * as Yup from 'yup';

// Local Imports
import {Strings} from '../config/strings';

//Social media regex
export const socialMediaRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:(?:facebook\.com|fb\.com)\/\S+|twitter\.com\/\S+|instagram\.com\/\S+|linkedin\.com\/\S+|youtube\.com\/\S+|pinterest\.com\/\S+|tumblr\.com\/\S+|snapchat\.com\/\S+|reddit\.com\/\S+|github\.com\/\S+|medium\.com\/\S+|vine\.co\/\S+|vimeo\.com\/\S+)/i;

// Password Characters Validation
const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*./-]).{8,}$/;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
);

export const WEBSITELINK_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

const validationSchema = {
  // SignUp Validations
  signUp: Yup.object().shape({
    firstName: Yup.string().required(Strings.EmptyFirstName).trim(),
    lastName: Yup.string().required(Strings.EmptyLastName).trim(),
    phoneNumber: Yup.string()
      .min(10, Strings.phoneNoValidation)
      .matches(PHONE_REGEX, Strings.PhoneError)
      .required(Strings.EmptyContactNumber),
    email: Yup.string()
      .email(Strings.EmailError)
      .matches(EMAIL_REGEX, Strings.EmailError)
      .required(Strings.EmptyEmail),
    password: Yup.string()
      .min(8, Strings.PasswordShouldBe)
      .required(Strings.EmptyPassword),
    confirmPassword: Yup.string()
      .required(Strings.EmptyPassword)
      .oneOf([Yup.ref(Strings.password), null], Strings.ConfirmPasswordError),
  }),

  // Login Validations
  login: Yup.object({
    userName: Yup.string()
      .email(Strings.EmailError)
      .matches(EMAIL_REGEX, Strings.EmailError)
      .required(Strings.EmptyEmail),
    password: Yup.string()
      .min(8, Strings.PasswordShouldBe)
      .required(Strings.EmptyPassword)
      .trim(),
  }),

  // Reset Password Validations
  resetPassword: Yup.object({
    password: Yup.string()
      .matches(/^\S*$/, Strings.WhiteSpaceNotAllowed)
      .matches(PASSWORD_REGEX, Strings.PasswordShouldBe)
      .max(50, Strings.InvalidPassword)
      .required(Strings.EmptyPassword)
      .trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Strings.PasswordNotMatch)
      .required(Strings.EmptyConfirmPassword)
      .trim(),
  }),

  // Forgot Password Validations
  forgotPassword: Yup.object({
    email: Yup.string()
      .email(Strings.EmailError)
      .matches(EMAIL_REGEX, Strings.EmailError)
      .required(Strings.EmptyEmail),
  }),

  // Add UserData Validations
  addUserData: Yup.object({
    guest: Yup.string().required(Strings.GuestUserValidation),
    email: Yup.string()
      .required(Strings.EmptyGuestName)
      .email(Strings.EmailError)
      .matches(EMAIL_REGEX, Strings.EmailError)
      .required(Strings.EmptyEmail),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, Strings.EmptyContactNumberValidations)
      .required(Strings.EmptyContactNumber),
  }),

  // Profile Data Validations
  ProfileData: Yup.object({
    firstName: Yup.string().required(Strings.EmptyFirstName),
    lastName: Yup.string().required(Strings.EmptyLastName),
    phoneNumber: Yup.string()
      .min(10, Strings.phoneNoValidation)
      .matches(PHONE_REGEX, Strings.PhoneError)
      .required(Strings.EmptyContactNumber),
  }),

  // Add Location Validations
  addLocation: Yup.object({
    locationName: Yup.string().required(Strings.EmptyLocationName),
    address: Yup.string().required(Strings.EmptyAddress),
    city: Yup.string().required(Strings.EmptyCity),
    country: Yup.string().required(Strings.EmptyCountry),
    state: Yup.string().required(Strings.EmptyState),
  }),
  // Add Help  Validation.
  addReportToAdmin: Yup.object({
    subject: Yup.string().required(Strings.EmptySubject).trim(),
    message: Yup.string().required(Strings.EmptyMessage).trim(),
  }),
  //  Add report to admin Validation.
  addHelp: Yup.object({
    email: Yup.string().required(Strings.EmptyEmail).trim(),
    message: Yup.string().required(Strings.EmptyMessage).trim(),
  }),
};

export default validationSchema;
