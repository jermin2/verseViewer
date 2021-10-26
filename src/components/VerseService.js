import axios from 'axios';

export default class VerseService {

    getVerse(verseRef) {

        // Check if we have it in the local storage
        if(localStorage.getItem(verseRef) !== null){
            // We need to return a Promise object to match the axios object being returned
            const myPromise = new Promise((resolve, reject) => {
                resolve(JSON.parse(localStorage.getItem(verseRef)))
              });
            return myPromise

        } else {
            const url = `https://api.lsm.org/recver.php?String='${verseRef}'&Out=json`;
            return axios.get(url).then(response => {
                localStorage.setItem(verseRef, JSON.stringify(response.data)); 
                return response.data

            }).catch(e => console.log(e));
        }

    }
}