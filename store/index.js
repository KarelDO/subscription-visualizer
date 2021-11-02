import Vuex from 'vuex'
import { db } from '../db'
import {
  collection,
  doc,
  QuerySnapshot,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export const store = new Vuex.Store({
  mutations: {
    setSubscriptions(state, subscriptionList) {
      state.subscriptions = subscriptionList
    }
  },

  state: {
    subscriptions: [],
    // hold the subscription to the firestore, as to unsubscribe later
    // NOTE: is this good practice? Can we also hold the ref to the col?
    firebase_subscription: null
  },

  // NOTE: all manipulation of state in the actions should go over mutations?
  actions: {
    // bind the subscriptions
    bindSubscriptions(context) {
      if (!context.state.firebase_subscription) {
        const col = collection(db, "subscriptions");
        context.state.firebase_subscription = onSnapshot(col, (QuerySnapshot) => {
          // make sure to keep the document ids
          const subscriptionList = QuerySnapshot.docs.map((doc) => Object.assign(doc.data(), { id: doc.id }));
          context.commit('setSubscriptions', subscriptionList)
        });
      }
    },

    // unbind the subscriptions
    unbindSubscriptions(context) {
      if (context.state.firebase_subscription) {
        context.state.firebase_subscription()
        context.state.firebase_subscription = null
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
    }

  },
})
