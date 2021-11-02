// source: https://techformist.com/routing-auth-nuxt/

export default function (context) {
    // console.log(store.getters['root/user']);
    // console.log(redirect)
    console.log(context.store.getters);
    if (process.client && !context.store.getters['user']) return context.redirect("/authenticate");
}