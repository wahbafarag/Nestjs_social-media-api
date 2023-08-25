export const ErrorCodes = {
  UNEXPECTED_ERROR: {
    code: 'UNEXPECTED_ERROR',
    message: 'Unexpected error , try again later',
  },

  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized to access , Please login first',
  },

  INVALID_SIGNUP_DATA: {
    code: 'INVALID_SIGNUP_DATA',
    message:
      'Invalid signup data , Please check your data and make sure it is valid or its in the right format',
  },

  USERNAME_ALREADY_EXISTS: {
    code: 'USERNAME_ALREADY_EXISTS',
    message: 'Username already exists , Please choose another one',
  },

  EMAIL_ALREADY_EXISTS: {
    code: 'EMAIL_ALREADY_EXISTS',
    message: 'Email already exists , Please choose another one',
  },

  PHONE_ALREADY_EXISTS: {
    code: 'PHONE_ALREADY_EXISTS',
    message:
      'This phone number is linked to another account , Please choose another one',
  },

  EMAIL_NOT_EXISTS: {
    code: 'EMAIL_NOT_EXISTS',
    message: 'Email not exists , Please Signup',
  },

  USERNAME_NOT_EXISTS: {
    code: 'USERNAME_NOT_EXISTS',
    message: 'Username not exists , Please Signup',
  },

  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message:
      'User not found , make sure that you are providing the right values',
  },

  // both wrong password or email
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid credentials',
  },

  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    message: 'Invalid token',
  },

  INVALID_REQUEST: {
    code: 'INVALID_REQUEST',
    message: 'Invalid request or this route is no longer exists',
  },

  USER_NOT_ACTIVE: {
    code: 'USER_NOT_ACTIVE',
    message:
      'This Account is not active anymore , Please activate it first then login',
  },

  USER_DEACTIVATED: {
    code: 'USER_DEACTIVATED',
    message: 'You deactivated your account ,Come back soon ',
  },

  USER_ACTIVATED: {
    code: 'USER_ACTIVATED',
    message: 'Welcome back! , You activated your account and now you can login',
  },

  USER_DELETED: {
    code: 'USER_DELETED',
    message: 'You deleted your account Successfully,Sorry to see you go',
  },

  INVALID_ID: {
    code: 'INVALID_ID',
    message:
      'Invalid ID , make sure that the value is correct or in the right format',
  },

  UNSUPPORTED_ACTION: {
    code: 'UNSUPPORTED_ACTION',
    message: 'You are allowed to change your profile info not your passwords',
  },

  EXPIRED_TOKEN: {
    code: 'EXPIRED_TOKEN',
    message: 'Token expired ,We sent you a new one , Please check your email',
  },

  PASSWORD_UPDATED: {
    code: 'PASSWORD_UPDATED',
    message:
      'Password updated successfully,Please login again with the new password',
  },

  INVALID_DELETE_REQUEST: {
    code: 'INVALID_DELETE_REQUEST',
    message: 'Invalid Email ,please enter valid data and try again',
  },

  USER_VERIFIED: {
    code: 'USER_VERIFIED',
    message: 'User verified successfully , Please login',
  },

  VERIFY_AFTER_REGISTER: {
    code: 'VERIFY_AFTER_REGISTER',
    message:
      'Account created successfully ,Inorder to use out platform Please verify your email',
  },

  POST_SAVED: {
    code: 'POST_SAVED',
    message: 'Post saved successfully',
  },
  POST_UNSAVED: {
    code: 'POST_UNSAVED',
    message: 'Post unsaved successfully',
  },
};
