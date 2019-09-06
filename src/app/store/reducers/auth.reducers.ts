import * as actions from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | 'null';
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export const reducer = createReducer(initialState,
    on(actions.LogInSuccess, (state, { user, email }) => ({
        ...state,
        isAuthenticated: true,
        user: {
            token: user.token,
            email
        },
        errorMessage: null
    })),
    on(actions.LogInFailure, state => ({
        ...state,
        errorMessage: 'Incorrect email and/or password.'
    })),

    on(actions.SignUpSuccess, (state, { user }) => ({
        ...state,
        isAuthenticated: true,
        user: {
            token: user.token,
            email: user.email
        },
        errorMessage: null
    })),

    on(actions.SignUpFailure, state => ({
        ...state,
        errorMessage: 'That email is already in use.'
    })),

    on(actions.LogOut, state => (
        initialState
    ))
);


