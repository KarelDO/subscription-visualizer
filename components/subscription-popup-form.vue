<template>
  <div class="card-info p-8 rounded-lg blur-lg">
    <div class="text-yellow-200 mb-4 text-center uppercase">
      <span v-if="id">Edit subscription</span>
      <span v-else>Add subscription</span>
    </div>

    <form @submit.prevent="onSubmit" class="flex flex-col space-y-3">
      <div>
        <label class="text-white uppercase mb-1"> Title </label>
        <input
          class="
            appearance-none
            bg-gray-400
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-yellow-900
          "
          type="text"
          v-model="titleRef"
          name="title"
        />
      </div>
      <div>
        <label class="text-white uppercase mb-1"> Rate (per month) </label>
        <input
          class="
            appearance-none
            bg-gray-400
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-yellow-900
          "
          type="text"
          v-model="ratePerMonthRef"
          name="ratePerMonth"
        />
      </div>
      <div>
        <label class="text-white uppercase mb-1"> Start date </label>
        <input
          class="
            appearance-none
            bg-gray-400
            border-2 border-gray-200
            rounded
            w-full
            py-2
            px-4
            text-gray-700
            focus:outline-none focus:border-yellow-900
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
            uppercase
            font-semibold
            focus:border-yellow-900
            text-yellow-900
            bg-yellow-200
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