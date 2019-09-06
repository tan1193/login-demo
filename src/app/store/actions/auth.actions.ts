import { createAction, props } from '@ngrx/store';


export const LogIn = createAction(
    '[Auth] LOGIN',
    props<{ user: any }>()
);

export const LogInSuccess = createAction(
    '[Auth] LOGIN_SUCCESS',
    props<{ email: string, user: any }>()
);

export const LogInFailure = createAction(
    '[Auth] LOGIN_FAILURE',
    props<{ user: any }>()
);

export const SignUp = createAction(
    '[Auth] SIGN_UP',
    props<{ user: any }>()
);

export const SignUpSuccess = createAction(
    '[Auth] SIGN_UP_SUCESS',
    props<{ user: any }>()
);

export const SignUpFailure = createAction(
    '[Auth] SIGN_UP_FAILURE',
    props<{ user: any }>()
);

export const LogOut = createAction(
    '[Auth] LOG_OUT');
