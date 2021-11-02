<template>
  <p @click="signOut" class="text-green tracking-widest p-3">Log out</p>
</template>

<script>
import { defineComponent, onMounted } from "@vue/composition-api";
import { store } from "../store/index";

export default defineComponent({
  setup() {
    function signOut() {
      store.dispatch("signOut");
    }

    return { signOut };
  },
});
</script>
