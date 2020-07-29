const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
  constructor() {
    this._config = {
      apiKey: 'AIzaSyDaD6BdjgPy9q_yb29TM89_sJhXrY3eb7w',
      authDomain: 'whatsapp-clone250486.firebaseapp.com',
      databaseURL: 'https://whatsapp-clone250486.firebaseio.com',
      projectId: 'whatsapp-clone250486',
      storageBucket: 'gs://whatsapp-clone250486.appspot.com',
      messagingSenderId: '242519905614',
      appId: '1:242519905614:web:02ce7d0e8e9c7d0b037a1f',
    };
    this.init();
  }

  init() {
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);
      firebase.firestore().settings({});
      window._initializedFirebase = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }

  initAuth() {
    return new Promise((s, f) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;

          s({
            user,
            token,
          });
        })
        .catch((err) => {
          f(err);
        });
    });
  }
}
