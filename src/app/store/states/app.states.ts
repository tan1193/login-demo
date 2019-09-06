import * as auth from '../reducers/auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filter } from 'rxjs/operators';



export interface AppState {
    authState: auth.State;
}

export const reducers = {
    auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');



