import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    EMAIL_VERIFICATION_REQUIRED,
    EMAIL_VERIFICATION_FAIL,
    EMAIL_VERIFICATION_SUCCESS,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
    emailVerificationRequired: false,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
                loading: false,
                error: null,
            };
        case EMAIL_VERIFICATION_REQUIRED:
            return {
                ...state,
                emailVerificationRequired: true,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                error: payload,
            };
        case EMAIL_VERIFICATION_SUCCESS:
            return {
                ...state,
                emailVerificationSuccess: true,
                isAuthenticated: true,
                accessToken: payload.access,
                refreshToken: payload.refresh,
                error: null,
            };
        case EMAIL_VERIFICATION_FAIL:
            return {
                ...state,
                emailVerificationSuccess: false,
                error: payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                // Optionally handle any state changes on logout failure
            };
        default:
            return state;
    }
}