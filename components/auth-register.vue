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
      // NOTE: I injected the render function in the context using a plugin
      // NOTE: Not sure if this is the best way to retrieve this function
      const { store } = useContext();
      store.$firebaseAuthUiRender();
    });
  },
});
</script>
