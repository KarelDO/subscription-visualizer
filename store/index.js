// source for authentication logic: https://blog.logrocket.com/vue-firebase-authentication/
// source for persistant storage: https://www.digitalocean.com/community/tutorials/vuejs-vuex-persist-state
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import db from '../db'
import {
  collection,
  doc,
  QuerySnapshot,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// persistant storage
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
})

export const store = new Vuex.Store({
  // persistant storage
  plugins: [vuexLocalStorage.plugin],
  state: {
    subscriptions: [],
    // hold the subscription to the firestore, as to unsubscribe later
    firebase_subscription: null,
    // authentication data
    user: {
      loggedIn: false,
      data: null,
    }
  },

  getters: {
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return state.user.loggedIn
    }
  },

  mutations: {
    SET_FIREBASE_SUBSCRIPTIONS(state, firebase_subscription) {
      state.firebase_subscription = firebase_subscription
    },
    SET_SUBSCRIPTIONS(state, subscriptionList) {
      state.subscriptions = subscriptionList
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  // NOTE: all manipulation of state in the actions should go over mutations?
  // NOTE: all accesses of state in the actions should go over getters?
  actions: {
    // bind the subscriptions
    bindSubscriptions(context) {
      if (!context.state.firebase_subscription) {
        const uid = context.state.user.data.uid
        const col = collection(db, "subscriptions");
        const q = query(col, where('uid', '==', uid), orderBy('ratePerMonth', 'desc'))
        const firebase_subscription = onSnapshot(q, (QuerySnapshot) => {
          // make sure to keep the document ids
          const subscriptionList = QuerySnapshot.docs.map((doc) => Object.assign(doc.data(), { id: doc.id }));
          context.commit('SET_SUBSCRIPTIONS', subscriptionList)
        });
        context.commit('SET_FIREBASE_SUBSCRIPTIONS', firebase_subscription)
      }
    },

    // unbind the subscriptions
    unbindSubscriptions(context) {
      if (context.state.firebase_subscription) {
        context.state.firebase_subscription()
        context.commit('SET_FIREBASE_SUBSCRIPTIONS', null)

      }
    },

    // add a subscription
    addSubscription(context, subscription) {
      if (context.state.firebase_subscription) {
        const col = collection(db, "subscriptions");
        addDoc(col, subscription)
      }
    },

    // delete a subscription
    deleteSubscription(context, subscriptionId) {
      if (context.state.firebase_subscription) {
        deleteDoc(doc(db, 'subscriptions', subscriptionId))
      }
    },

    // update a subscription
    updateSubscription(context, data) {
      if (context.state.firebase_subscription) {
        const docRef = doc(db, 'subscriptions', data.id)
        updateDoc(docRef, data.subscription)
      }
    },

    // action to run when new user data becomes available
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    },

    // sign out
    // no commit needed, fetchUser does this automatically on authStateChange
    signOut(store, context) {
      const auth = getAuth()
      auth.signOut()
      // NOTE: better way to do this? maybe not
      // NOTE: after signing out, system should detect this and automatically redirect to the standard page of unauthenticated users
      // NOTE: maybe add the middleware as listener to onauthstatechange?
      context.redirect('/authenticate');
    }

  },
})
