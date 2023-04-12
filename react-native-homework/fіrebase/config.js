import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGY9qqLek6BFirEvYjGIDCRmS39lJasLw",
  authDomain: "reack-native-goit.firebaseapp.com",
  projectId: "reack-native-goit",
  storageBucket: "reack-native-goit.appspot.com",
  messagingSenderId: "956178937039",
  appId: "1:956178937039:web:bd40c4853883adfb8973ba",
  measurementId: "G-7SP8YVW25L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


