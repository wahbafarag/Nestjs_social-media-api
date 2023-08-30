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

  REJECT_POST_EDIT: {
    code: 'REJECT_POST_EDIT',
    message: 'You are not allowed to edit this post',
  },

  POST_NOT_FOUND: {
    code: 'POST_NOT_FOUND',
    message: 'Post not found',
  },

  POST_DELETED: {
    code: 'POST_DELETED',
    message: 'Post deleted successfully',
  },

  POSTS_DELETED: {
    code: 'POSTS_DELETED',
    message: 'Posts deleted successfully',
  },

  COMMENT_NOT_FOUND: {
    code: 'COMMENT_NOT_FOUND',
    message: 'Comment not found',
  },

  POST_HAS_NO_COMMENTS: {
    code: 'POST_HAS_NO_COMMENTS',
    message: 'This post has no comments , be the first to comment?',
  },

  COMMENT_DELETED: {
    code: 'COMMENT_DELETED',
    message: 'Comment deleted successfully',
  },

  REJECT_COMMENT_EDIT: {
    code: 'REJECT_COMMENT_EDIT',
    message: 'You are not allowed to edit this comment , You are not the owner',
  },

  REJECT_COMMENT_DELETE: {
    code: 'REJECT_COMMENT_DELETE',
    message:
      'You are not allowed to delete this comment , You are not the owner',
  },

  ALREADY_LIKED: {
    code: 'ALREADY_LIKED',
    message: 'You already liked this post',
  },

  NOT_LIKED: {
    code: 'NOT_LIKED',
    message: 'You did not like this post',
  },

  CANNOT_ADD_YOURSELF: {
    code: 'CANNOT_ADD_YOURSELF',
    message: 'You cannot add yourself',
  },
  ALREADY_FRIENDS: {
    code: 'ALREADY_FRIENDS',
    message: 'You are already friends',
  },
  FRIEND_ADDED: {
    code: 'FRIEND_ADDED',
    message: 'Friend added successfully',
  },

  CANNOT_REMOVE_YOURSELF: {
    code: 'CANNOT_REMOVE_YOURSELF',
    message: 'You cannot remove yourself',
  },
  FRIEND_REMOVED: {
    code: 'FRIEND_REMOVED',
    message: 'Friend removed successfully',
  },
  NOT_FRIENDS: {
    code: 'NOT_FRIENDS',
    message: 'You are not friends',
  },
  FOLLOW_SUCCESS: {
    code: 'FOLLOW_SUCCESS',
    message: 'Followed successfully',
  },

  UNFOLLOW_SUCCESS: {
    code: 'UNFOLLOW_SUCCESS',
    message: 'Unfollowed successfully',
  },
  USER_ALREADY_FOLLOWED: {
    code: 'USER_ALREADY_FOLLOWED',
    message: 'You already followed this user',
  },
  USER_NOT_FOLLOWED: {
    code: 'USER_NOT_FOLLOWED',
    message: 'You did not follow this user',
  },
};
