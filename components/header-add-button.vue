<template>
  <div class="flex align-end">
    <subscription-popup v-model="showModal" />
    <button @click="showModal = true" class="py-2 px-4 rounded-md">
      <span class="text-green-400 flex items-center tracking-widest uppercase"
        >Add</span
      >
    </button>
    <!-- <span
      @click="showModal = true"
      class="flex items-center mdi mdi-plus text-2xl text-white text-center"
    ></span> -->
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
