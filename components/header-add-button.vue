<template>
  <div class="flex align-middle">
    <subscription-popup v-model="showModal" />
    <button @click="showModal = true" class="rounded-md">
      <span
        class="
          text-yellow-900
          font-semibold
          flex
          items-center
          tracking-widest
          uppercase
        "
        >Add</span
      >
    </button>
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
