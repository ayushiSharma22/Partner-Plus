import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  email_id: null,
  name: null,
  phone_number: null,
  password: null,
  validatingEmail: false,
  validEmail: false,
  invalidEmail: false,
  invalidEmailError: null,
  validatingPhone: false,
  validPhone: false,
  invalidPhone: false,
  invalidPhoneError: null,
  userCredentials: null,
  userData: null,
  signupRequest: false,
  signupComplete: false,
  nextRoute: null,
  signupError: false,
  signupErrorMessage: null,
  OTPsending: false,
  OTPsent: false,
  OTPsendError: false,
  OTPsendErrorMessage: null,
  OTPverifying: false,
  OTPverified: false,
  OTPverifyError: false,
  OTPverifyErrorMessage: null,
  verifyData: null,
  listCategories: [
    'Food Packaging',
    'Flexible Packaging',
    'Material Handling',
    'Packaging Materials',
    'Pouches \u0026 Films'
  ],
  loadingCategories: false,
  loadedCategories: false,
  loadCategoriesError: false,
  loadCategoriesErrorMessage: null,
  company_name: null,
  business_category: null,
  vat_tin_cst_number: null,
  pan_number: null,
  registeringCompany: false,
  registeredCompany: false,
  registerCompanyError: false,
  registerCompanyErrorMessage: null,
  companyDetails: null,
  companyData: null,
  registeringBillingDetails: false,
  registeredBillingDetails: false,
  registerBillingDetailsError: false,
  registerBillingDetailsErrorMessage: null,
  beneficiary_name: null,
  account_number: null,
  name_of_the_bank: null,
  IFSC_code: null,
  address: null,
  city: null,
  state: null,
  country: null,
  pincode: null
};
const signup = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMAIL_VALIDATE_REQUEST: {
      return {
        ...state,
        validatingEmail: true,
        validEmail: false,
        invalidEmail: false,
        email_id: action.email_id
      };
    }

    case ActionTypes.EMAIL_VALIDATE_COMPLETE: {
      return {
        ...state,
        validatingEmail: false,
        validEmail: true,
        invalidEmail: false
      };
    }

    case ActionTypes.EMAIL_VALIDATE_ERROR: {
      return {
        ...state,
        validatingEmail: false,
        validEmail: false,
        invalidEmail: true,
        invalidEmailError: action.error
      };
    }

    case ActionTypes.PHONE_VALIDATE_REQUEST: {
      return {
        ...state,
        validatingPhone: true,
        validPhone: false,
        invalidPhone: false,
        OTPsent: false,
        phone_number: action.phone_number
      };
    }

    case ActionTypes.PHONE_VALIDATE_COMPLETE: {
      return {
        ...state,
        validatingPhone: false,
        validPhone: true,
        invalidPhone: false
      };
    }

    case ActionTypes.PHONE_VALIDATE_ERROR: {
      return {
        ...state,
        validatingPhone: false,
        validPhone: false,
        invalidPhone: true,
        invalidPhoneError: action.error
      };
    }

    case ActionTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        signupRequest: true,
        signupComplete: false,
        signupError: false,
        signupErrorMessage: null,
        userCredentials: action.payload
      };
    }

    case ActionTypes.SIGNUP_COMPLETE: {
      return {
        ...state,
        signupRequest: false,
        signupComplete: true,
        signupError: false,
        signupErrorMessage: null,
        nextRoute: 'signup_mobile',
        userData: action.payload
      };
    }

    case ActionTypes.SIGNUP_ERROR: {
      return {
        ...state,
        signupRequest: false,
        signupComplete: false,
        signupError: true,
        signupErrorMessage: action.error
      };
    }

    case ActionTypes.SEND_OTP_REQUEST: {
      return {
        ...state,
        OTPsending: true,
        OTPsent: false,
        OTPsendError: false,
        OTPsendErrorMessage: null,
        OTPverifying: false,
        OTPverified: false,
        OTPverifyError: false,
        OTPverifyErrorMessage: null
      };
    }

    case ActionTypes.SEND_OTP_COMPLETE: {
      return {
        ...state,
        OTPsending: false,
        OTPsent: true,
        OTPsendError: false,
        OTPsendErrorMessage: null,
        OTPverifying: false,
        OTPverified: false,
        OTPverifyError: false,
        OTPverifyErrorMessage: null
      };
    }

    case ActionTypes.SEND_OTP_ERROR: {
      return {
        ...state,
        OTPsending: false,
        OTPsent: false,
        OTPsendError: true,
        OTPsendErrorMessage: action.error,
        OTPverifying: false,
        OTPverified: false,
        OTPverifyError: false,
        OTPverifyErrorMessage: null
      };
    }

    case ActionTypes.VERIFY_OTP_REQUEST: {
      return {
        ...state,
        OTPsending: false,
        OTPsent: false,
        OTPsendError: false,
        OTPsendErrorMessage: null,
        OTPverifying: true,
        OTPverified: false,
        OTPverifyError: false,
        OTPverifyErrorMessage: null
      };
    }

    case ActionTypes.VERIFY_OTP_COMPLETE: {
      return {
        ...state,
        OTPsending: false,
        OTPsent: false,
        OTPsendError: false,
        OTPsendErrorMessage: null,
        OTPverifying: false,
        OTPverified: true,
        OTPverifyError: false,
        OTPverifyErrorMessage: null,
        nextRoute: 'signup_company',
        verifyData: action.payload
      };
    }

    case ActionTypes.VERIFY_OTP_ERROR: {
      return {
        ...state,
        OTPsending: false,
        OTPsent: false,
        OTPsendError: false,
        OTPsendErrorMessage: null,
        OTPverifying: false,
        OTPverified: false,
        OTPverifyError: true,
        OTPverifyErrorMessage: action.error
      };
    }

    case ActionTypes.LOAD_CATEGORIES_REQUEST: {
      return {
        ...state,
        loadingCategories: true,
        loadedCategories: false,
        loadCategoriesError: false,
        loadCategoriesErrorMessage: null
      };
    }

    case ActionTypes.LOAD_CATEGORIES_COMPLETE: {
      return {
        ...state,
        loadingCategories: false,
        loadedCategories: true,
        loadCategoriesError: false,
        loadCategoriesErrorMessage: null,
        listCategories: action.payload
      };
    }

    case ActionTypes.LOAD_CATEGORIES_ERROR: {
      return {
        ...state,
        loadingCategories: false,
        loadedCategories: false,
        loadCategoriesError: true,
        loadCategoriesErrorMessage: action.error
      };
    }

    case ActionTypes.REGISTER_COMPANY_REQUEST: {
      return {
        ...state,
        registeringCompany: true,
        registeredCompany: false,
        registerCompanyError: false,
        registerCompanyErrorMessage: null,
        companyDetails: action.payload
      };
    }

    case ActionTypes.REGISTER_COMPANY_COMPLETE: {
      return {
        ...state,
        registeringCompany: false,
        registeredCompany: true,
        registerCompanyError: false,
        registerCompanyErrorMessage: null,
        companyData: action.payload,
        nextRoute: 'signup_billing'
      };
    }

    case ActionTypes.REGISTER_COMPANY_ERROR: {
      return {
        ...state,
        registeringCompany: false,
        registeredCompany: false,
        registerCompanyError: true,
        registerCompanyErrorMessage: action.error
      };
    }

    case ActionTypes.REGISTER_BILLING_DETAILS_REQUEST: {
      return {
        ...state,
        companyDetails: action.payload,
        registeringBillingDetails: true,
        registeredBillingDetails: false,
        registerBillingDetailsError: false,
        registerBillingDetailsErrorMessage: null
      };
    }

    case ActionTypes.REGISTER_BILLING_DETAILS_COMPLETE: {
      return {
        ...state,
        companyData: action.payload,
        registeringBillingDetails: false,
        registeredBillingDetails: true,
        registerBillingDetailsError: false,
        registerBillingDetailsErrorMessage: null,
        nextRoute: 'home'
      };
    }

    case ActionTypes.REGISTER_BILLING_DETAILS_ERROR: {
      return {
        ...state,
        registeringBillingDetails: false,
        registeredBillingDetails: false,
        registerBillingDetailsError: true,
        registerBillingDetailsErrorMessage: action.error
      };
    }

    case ActionTypes.RESET_SIGNUP_STATE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default signup;
