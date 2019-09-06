import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import {
    LogIn, LogInSuccess, LogInFailure, SignUp,
    SignUpSuccess, SignUpFailure, LogOut
} from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    Login$ = createEffect(() =>
        this.actions$.pipe(ofType(LogIn),
            map(action => action.user),
            switchMap(payload =>
                this.authService.logIn(payload.email, payload.password).pipe(
                    map(user => LogInSuccess({ email: payload.email, user })),
                    catchError(err => of(LogInFailure({ user: err })))
                )
            )
        )
    );

    // Login$ = createEffect(() =>
    //     this.actions.pipe(ofType(LogIn))
    //         .map(action => action.user)
    //         .switchMap(payload => {
    //             return this.authService.logIn(payload.email, payload.password)
    //                 .map(user => {
    //                     console.log(user);
    //                     return LogInSuccess({ email: payload.email, user });
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     return Observable.of(LogInFailure({ user: err }));
    //                 });
    //         })
    // );

    LogInSuccess$ = createEffect(() =>
        this.actions$.pipe(ofType(LogInSuccess),
            tap(user => {
                localStorage.setItem('token', user.user.token);
                this.router.navigateByUrl('/');
            })
        ),
        { dispatch: false }
    );

    LogInFailue$ = createEffect(() =>
        this.actions$.pipe(ofType(LogInFailure)),
        { dispatch: false }
    );

    // SignUp = createEffect(() =>
    //     this.actions.pipe(ofType(SignUp))
    //         .map(action => action.user)
    //         .switchMap(payload => {
    //             return this.authService.signUp(payload.email, payload.password)
    //                 .map(user => {
    //                     console.log(user);
    //                     return SignUpSuccess({ user });
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     return Observable.of(SignUpFailure({ user: err }));
    //                 });
    //         })
    // );

    SignUpSuccess = createEffect(() =>
        this.actions$.pipe(ofType(SignUpSuccess),
            tap(user => localStorage.setItem('token', user.user.token))
        ),
        { dispatch: false }
    );

    SignUpFailure = createEffect(() =>
        this.actions$.pipe(ofType(SignUpFailure))
        , { dispatch: false }
    );

    // LogOut = createEffect(() =>
    //     this.actions$.pipe(ofType(LogOut),
    //         tap(_ => localStorage.removeItem('token'))
    //     ),
    //     { dispatch: false }
    // );

}


