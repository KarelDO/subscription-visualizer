<template>
  <vue-final-modal v-model="showModal">
    <div
      class="
        w-full
        md:w-2/3
        lg:w-1/2
        xl:w-1/3
        px-4
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <subscription-popup-form
        :id="id"
        :title="title"
        :ratePerMonth="ratePerMonth"
        :startDate="startDate"
        v-model="showModal"
      />
    </div>
  </vue-final-modal>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  // receive a v-model from a parent component
  props: ["value", "id", "title", "startDate", "ratePerMonth"],
  setup(props, { emit }) {
    // expose a computed v-model to the modal component
    // this allows the "add" button to also close the modal
    const showModal = computed({
      get() {
        return props.value;
      },
      set(newValue) {
        emit("input", newValue);
      },
    });

    return { showModal };
  },
});
</script>
