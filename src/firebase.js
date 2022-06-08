import admin from 'firebase-admin';

export function getDatabase() {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: `https://${process.env.FIREBASE_DATABASE_NAME}.firebaseio.com`
    });

    return admin.firestore();
}

export async function getDocument(database, path) {
    const documentSnapshot = await database.doc(path).get();

    return documentSnapshot.data();
}

export async function copyDocument(database, sourcePath, destinationPath) {
    const sourceDocumentRef = database.doc(sourcePath);
    const destinationDocumentRef = database.doc(destinationPath);
    const sourceDocumentSnapshot = await sourceDocumentRef.get();
    const sourceDocumentData = sourceDocumentSnapshot.data();
    await destinationDocumentRef.set(sourceDocumentData);
}

export async function deleteDocument(database, path) {
    await database.doc(path).delete();
}
