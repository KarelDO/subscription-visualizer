<template>
  <p @click="signOut" class="text-green tracking-widest p-3">Log out</p>
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
import { defineComponent, onMounted } from "@vue/composition-api";
import { store } from "../store/index";

export default defineComponent({
  setup() {
    const context = useContext();
    function signOut() {
      store.dispatch("signOut", context);
    }

    return { signOut };
  },
});
</script>
