import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB9qilTM7uf46LT9x_VLB8iCIYolCmP5pI",
  authDomain: "react-ecom-store-db.firebaseapp.com",
  databaseURL: "https://react-ecom-store-db.firebaseio.com",
  projectId: "react-ecom-store-db",
  storageBucket: "react-ecom-store-db.appspot.com",
  messagingSenderId: "852356052169",
  appId: "1:852356052169:web:f2ee580166abb2df8f0918",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
