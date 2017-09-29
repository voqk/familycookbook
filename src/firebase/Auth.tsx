import * as fb from 'firebase';
import firebase from './firebase';

import { User } from '../Models';

class Auth {
    private firebase: fb.app.App;
    constructor() {
        this.firebase = firebase.app;
    }

    createUser(email: string, password: string) {
        return this.firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}

export const auth = new Auth();