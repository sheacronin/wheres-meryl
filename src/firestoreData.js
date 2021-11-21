import {
    doc,
    query,
    orderBy,
    limit,
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

async function checkIfHighScore(timeInSeconds) {
    const scoresRef = collection(db, 'images/1/high-scores');
    const q = query(scoresRef, orderBy('time'), limit(10));
    const querySnapshot = await getDocs(q);
    console.log('checking high scores...');

    const scoreTimes = [];
    console.log(q);

    querySnapshot.forEach((doc) => {
        const score = doc.data();
        console.log(score);
        scoreTimes.push(score.time);
    });

    console.log(scoreTimes);

    for (let i = 0; i < scoreTimes.length; i++) {
        console.log(scoreTimes[i], timeInSeconds);
        if (timeInSeconds < scoreTimes[i]) {
            console.log('high score');
            return true;
        }
    }

    return false;
}

async function setHighScore(name, time) {
    await addDoc(collection(db, 'images/1/high-scores'), {
        name,
        time,
    });
}

async function getLeaderboard() {
    const scoresRef = collection(db, 'images/1/high-scores');
    const q = query(scoresRef, orderBy('time'), limit(10));
    const querySnapshot = await getDocs(q);
    const highScores = [];
    querySnapshot.forEach((doc) => {
        highScores.push(doc.data());
    });

    return highScores;
}

export { getTargetPositionBox, setHighScore, getLeaderboard, checkIfHighScore };
