<template>
  <div class="bg-white p-5 rounded-lg">
    <div class="text-gray-500 font-bold mb-4 text-center">
      <span v-if="id">Edit subscription</span>
      <span v-else>Add subscription</span>
    </div>

    <form @submit.prevent="onSubmit" class="flex flex-col space-y-2">
      <div>
        <label class="text-gray-500 font-bold mb-1"> Title </label>
        <input
          class="
            appearance-none
            bg-gray-200
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-green-400 focus:bg-white
          "
          type="text"
          v-model="titleRef"
          name="title"
        />
      </div>
      <div>
        <label class="text-gray-500 font-bold mb-1"> Rate (per month) </label>
        <input
          class="
            appearance-none
            bg-gray-200
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-green-400 focus:bg-white
          "
          type="text"
          v-model="ratePerMonthRef"
          name="ratePerMonth"
        />
      </div>
      <div>
        <label class="text-gray-500 font-bold mb-1"> Start date </label>
        <input
          class="
            appearance-none
            bg-gray-200
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-green-400 focus:bg-white
          "
          type="date"
          v-model="startDateRef"
          name="startDate"
        />
      </div>
      <div>
        <button
          class="
            mt-5
            w-full
            py-2
            px-4
            rounded
            appearance-none
            text-white
            bg-green-400
          "
          type="submit"
        >
          <span v-if="id">Edit</span>
          <span v-else>Add</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Timestamp } from "@firebase/firestore";
import { defineComponent, ref } from "@vue/composition-api";
import { store } from "../store/index";

export default defineComponent({
  // receive a v-model from the parent
  // receive inital values
  props: ["value", "id", "title", "ratePerMonth", "startDate"],
  setup(props, { emit }) {
    // use props to initialise refs
    const titleRef = ref(props.title);
    const ratePerMonthRef = ref(props.ratePerMonth);
    const startDateRef = ref(props.startDate);

    function onSubmit() {
      // prepare the data
      const uid = store.getters["user"].data.uid;
      const subscription = {
        title: titleRef.value,
        ratePerMonth: Number(ratePerMonthRef.value),
        startDate: Timestamp.fromDate(new Date(startDateRef.value)),
        uid: uid,
      };
      // update or add, depending on presence of id
      if (props.id) {
        updateSubscription(subscription, props.id);
      } else {
        addSubscription(subscription);
      }
      // alert the parent we are finished
      emitClosed();
    }

    function emitClosed() {
      emit("input", false);
    }

    function addSubscription(subscription) {
      store.dispatch("addSubscription", subscription);
    }

    function updateSubscription(subscription, id) {
      store.dispatch("updateSubscription", {
        subscription: subscription,
        id: id,
      });
    }
    return { titleRef, ratePerMonthRef, startDateRef, onSubmit };
  },
});
</script>

<style scoped>
.border-green {
  border-color: #89fd7e;
}
</style>