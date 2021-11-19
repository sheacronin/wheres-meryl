import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
    getFirestore,
} from '@firebase/firestore';

const db = getFirestore();

async function getTargetPositionBox(target) {
    const targetRef = doc(db, 'images/1/character-positions', target);
    const targetSnap = await getDoc(targetRef);

    const targetBox = targetSnap.data();
    return targetBox;
}

// async function checkIfHighScore(time) {

// }

async function setHighScore(name, time) {
    const scoreRef = await addDoc(collection(db, 'images/1/high-scores'), {
        name,
        time,
    });
}

async function getLeaderboard() {
    const querySnapshot = await getDocs(collection(db, 'images/1/high-scores'));
    const highScores = [];
    querySnapshot.forEach((doc) => {
        highScores.push(doc.data());
    });

    return highScores;
}

export { getTargetPositionBox, setHighScore, getLeaderboard };
