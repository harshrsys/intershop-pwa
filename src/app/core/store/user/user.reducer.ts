import { Customer } from '../../models/customer/customer.model';
import { HttpError } from '../../models/http-error/http-error.model';
import { User } from '../../models/user/user.model';

import { UserAction, UserActionTypes } from './user.actions';

export interface UserState {
  customer: Customer;
  user: User;
  authorized: boolean;
  _authToken: string;
  loading: boolean;
  successMessage: string;
  error: HttpError;
}

export const initialState: UserState = {
  customer: undefined,
  user: undefined,
  authorized: false,
  _authToken: undefined,
  loading: false,
  successMessage: undefined, // ToDo: check this implementation if toasts are available
  error: undefined,
};

export function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.UserSuccessMessageReset: {
      return {
        ...state,
        successMessage: undefined,
      };
    }

    case UserActionTypes.UserErrorReset: {
      return {
        ...state,
        error: undefined,
      };
    }

    case UserActionTypes.LoginUser:
    case UserActionTypes.LogoutUser: {
      return initialState;
    }

    case UserActionTypes.SetAPIToken: {
      return {
        ...state,
        _authToken: action.payload.apiToken,
      };
    }

    case UserActionTypes.LoadCompanyUser:
    case UserActionTypes.CreateUser:
    case UserActionTypes.UpdateUser:
    case UserActionTypes.UpdateUserPassword:
    case UserActionTypes.UpdateCustomer: {
      return {
        ...state,
        loading: true,
        successMessage: undefined,
      };
    }

    case UserActionTypes.LoginUserFail:
    case UserActionTypes.LoadCompanyUserFail:
    case UserActionTypes.CreateUserFail: {
      const error = action.payload.error;

      return {
        ...initialState,
        loading: false,
        error,
      };
    }

    case UserActionTypes.UpdateUserFail:
    case UserActionTypes.UpdateUserPasswordFail:
    case UserActionTypes.UpdateCustomerFail: {
      const error = action.payload.error;

      return {
        ...state,
        loading: false,
        error,
      };
    }

    case UserActionTypes.LoginUserSuccess: {
      const customer = action.payload.customer;
      const user = action.payload.user;

      return {
        ...state,
        authorized: true,
        customer,
        user,
        loading: false,
        error: undefined,
      };
    }

    case UserActionTypes.LoadCompanyUserSuccess: {
      const user = action.payload.user;

      return {
        ...state,
        user,
        loading: false,
        error: undefined,
      };
    }

    case UserActionTypes.UpdateUserSuccess: {
      const user = action.payload.user;
      const successMessage = action.payload.successMessage;

      return {
        ...state,
        user,
        loading: false,
        error: undefined,
        successMessage,
      };
    }

    case UserActionTypes.UpdateUserPasswordSuccess: {
      const successMessage = action.payload.successMessage;

      return {
        ...state,
        loading: false,
        error: undefined,
        successMessage,
      };
    }

    case UserActionTypes.UpdateCustomerSuccess: {
      const customer = action.payload.customer;
      const successMessage = action.payload.successMessage;

      return {
        ...state,
        customer,
        loading: false,
        error: undefined,
        successMessage,
      };
    }
  }

  return state;
}
