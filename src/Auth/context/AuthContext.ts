import React, {createContext} from 'react';
import {User, UserCredential} from 'firebase/auth'
import {FirebaseApp} from 'firebase/app'

export type AuthContextProps = {
    signUp: (email: string, password: string) => Promise<UserCredential>,
    currentUser: User | null,
    signIn: (email: string, password: string) => Promise<UserCredential>,
    signInWithGoogle: () => Promise<never>
    onSignOut: () => Promise<void>,
    firebaseApp: FirebaseApp
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);