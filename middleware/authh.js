// source: https://techformist.com/routing-auth-nuxt/
import {store} from "../store/index"

export default function (context) {
    // NOTE: weird error with the context
    // NOTE: accessed store in context is empty
    // NOTE: imported store from "store/index..." 
    if (process.client && !store.getters['loggedIn']) return context.redirect("/authenticate");
}