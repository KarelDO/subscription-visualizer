// source and inspiration: https://firebase.google.com/docs/auth/web/firebaseui
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth"
var firebaseui = require('firebaseui');

// initialize firebase ui 
const auth = getAuth()
var ui = new firebaseui.auth.AuthUI(auth)


// specify firebase ui configuration
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            // Saving the user data is done automatically via vuex listening to firebase
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/tos',
    // Privacy policy url.
    privacyPolicyUrl: '/pp'
};

// inject the render function
export default (context, inject) => {
    inject('firebaseAuthUiRender', () => { ui.start('#firebaseui-auth-container', uiConfig) })
}