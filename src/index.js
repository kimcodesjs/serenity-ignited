import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDKWIvmbNuDngSPMtXPavocpSFLcswEglc",
    authDomain: "serenity-ignited.firebaseapp.com",
    projectId: "serenity-ignited",
    storageBucket: "serenity-ignited.appspot.com",
    messagingSenderId: "178174477632",
    appId: "1:178174477632:web:c433d0e213435a6f06e6a5",
    measurementID: "G-KQ2T23DTYX"
})


ReactDOM.render(
            <App />, 
    document.getElementById('app')
)