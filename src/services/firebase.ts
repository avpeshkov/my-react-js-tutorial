import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { authMock, dbMock } from "services/mock";

// получаем найстройки firebase из env
const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "",
};

// инициализируем коннект с firebase
firebase.initializeApp(config);

//  получаем из firebase необходимые в по компоненты, или мокаем их для тестов
const firebaseApi = {
    auth: firebase.auth ? firebase.auth : authMock,
    db: firebase.database ? firebase.database() : dbMock,
};

export default firebaseApi;
