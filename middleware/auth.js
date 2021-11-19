// source: https://techformist.com/routing-auth-nuxt/
import { store } from "../store/index"

export default function (context) {
    if (process.client && !store.getters['loggedIn']) return context.redirect("/authenticate");
}