import { doc, getDoc, getFirestore } from '@firebase/firestore';

const db = getFirestore();

async function getTargetPositionBox(target) {
    const targetRef = doc(db, 'images/1/character-positions', target);
    const targetSnap = await getDoc(targetRef);

    if (targetSnap.exists()) {
        console.log('Document data:', targetSnap.data());
    } else {
        console.log('No such document!');
    }

    const targetBox = targetSnap.data();
    return targetBox;
}

export { getTargetPositionBox };
