import firebase from './../Services/Firebase';


export default async function checkUserLogin(email,password) {
    return await firebase.auth().signInWithEmailAndPassword(email.toString(), password.toString());
    /*then( async (result) => {
        let user = result.user;
        if( user ) {
            await firebase.firestore().collection("users")
            .where("id", "==", user.uid).get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    const currentData = doc.data();
                    localStorage.setItem(LoginString.firebaseDocumentID, doc.id);
                    localStorage.setItem(LoginString.ID, currentData.id);
                    localStorage.setItem(LoginString.name, currentData.name);
                    localStorage.setItem(LoginString.email, currentData.email);
                    localStorage.setItem(LoginString.message,currentData.message)
                })
                this.props.history.push("/dashboard");
            })
        }
    })
    .catch((error) => {
        window.alert( error);
    }).then( async (result) => {
        let user = result.user;
        if( user ) {
            await firebase.firestore().collection("users")
            .where("id", "==", user.uid).get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    const currentData = doc.data();
                    localStorage.setItem(LoginString.firebaseDocumentID, doc.id);
                    localStorage.setItem(LoginString.ID, currentData.id);
                    localStorage.setItem(LoginString.name, currentData.name);
                    localStorage.setItem(LoginString.email, currentData.email);
                    localStorage.setItem(LoginString.message,currentData.message)
                })
                this.props.history.push("/dashboard");
            })
        }
    })
    .catch((error) => { */
}