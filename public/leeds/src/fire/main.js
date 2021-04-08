import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDQUPGq9VvJZsEEFIzCB4Sk0jiJU5WToJU",
	authDomain: "ussd-demo-4c37d.firebaseapp.com",
	projectId: "ussd-demo-4c37d",
	storageBucket: "ussd-demo-4c37d.appspot.com",
	messagingSenderId: "416523893853",
	appId: "1:416523893853:web:644ca47d3bd126c46c61b4"
};

firebase.initializeApp(firebaseConfig);

export const leedsFirestore = firebase.firestore();