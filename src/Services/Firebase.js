import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBIQMV4W68q1Up5Nn9qXGPl2JIJbXFwGfA",
    authDomain: "awesome-chat-1a952.firebaseapp.com",
    databaseURL: "https://awesome-chat-1a952.firebaseio.com",
    projectId: "awesome-chat-1a952",
    storageBucket: "awesome-chat-1a952.appspot.com",
    messagingSenderId: "875180674277",
    appId: "1:875180674277:web:2a2571d9f02b047617d80c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;