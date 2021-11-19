<template>
  <div>
    <!-- targets for firebase ui  -->
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading ...</div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  useContext,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    // render the auth ui on mounted
    onMounted(() => {
      const { store } = useContext();
      store.$firebaseAuthUiRender();
    });
  },
});
</script>
