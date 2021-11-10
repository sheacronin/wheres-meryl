import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAP5zGJ2doKfWBBvKhrmowVc0T9U0uiIrQ',
    authDomain: 'wheres-meryl.firebaseapp.com',
    projectId: 'wheres-meryl',
    storageBucket: 'wheres-meryl.appspot.com',
    messagingSenderId: '957234049929',
    appId: '1:957234049929:web:9c294ba4d6393065d1e758',
};

const app = initializeApp(firebaseConfig);

export default app;
