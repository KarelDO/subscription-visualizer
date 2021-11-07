<template>
  <button
    @click="signOut"
    class="text-yellow-900 font-semibold tracking-widest uppercase"
  >
    Log out
  </button>
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
