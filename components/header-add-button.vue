<template>
  <div>
    <subscription-popup  v-model="showModal" />
    <span
      @click="showModal = true"
      class="mdi mdi-plus text-3xl text-green text-center"
    ></span>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import subscriptionPopupForm from "./subscription-popup-form.vue";

export default defineComponent({
  components: { subscriptionPopupForm },
  setup() {
    const showModal = ref(false);

    return { showModal };
  },
});
</script>
