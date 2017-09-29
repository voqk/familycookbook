import * as fb from 'firebase';

class FireBase {
    app : firebase.app.App;

    constructor() {
        const config = {
            apiKey: "AIzaSyAr4ud3szMrvHDuAXGTZXB7KUVC8HuqmAY",
            authDomain: "familycookbook-fc6f7",
            databaseURL: "https://familycookbook-fc6f7.firebaseio.com/",
            storageBucket: "gs://familycookbook-fc6f7.appspot.com"
        };

        this.app = fb.initializeApp(config);
    }
}

const firebase = new FireBase();
export default firebase;