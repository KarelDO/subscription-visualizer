<template>
  <div>
    <subscription-popup
      :id="id"
      :title="capitalizedTitle"
      :startDate="startDateString"
      :ratePerMonth="ratePerMonth"
      v-model="showModal"
    />
    <div class="card-info tracking-widest p-6">
      <!-- Card info -->
      <div class="flex justify-between mb-8">
        <div class="text-white tracking-widest">
          <h1 class="text-2xl uppercase">{{ capitalizedTitle }}</h1>
          <!-- <h2>started {{ startDateString }} ({{ monthsPassed }} months ago</h2> -->
          <h2 class="uppercase">started {{ startDateString }}</h2>
        </div>
        <div class="text-gray-400">
          <button
            @click="showModal = true"
            class="mdi mdi-pencil text-2xl"
          ></button>
          <button
            @click="deleteSubscription"
            class="mdi mdi-close text-2xl"
          ></button>
        </div>
      </div>
      <!-- Card price  -->
      <div class="flex justify-between text-green-400 uppercase">
        <p>
          <span class="text-2xl">€{{ ratePerMonth }}</span> / month
        </p>
        <p>
          total <span class="text-2xl">€{{ total }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Timestamp } from "@firebase/firestore";
import { ref, computed, defineComponent } from "@vue/composition-api";
import { store } from "../store/index";

export default defineComponent({
  props: {
    id: String,
    title: String,
    startDate: Timestamp,
    ratePerMonth: Number,
  },
  setup(props) {
    // toggles visibility of modal
    const showModal = ref(false);

    // NOTE: makes more sense to calculate all these properties in the getter of the store.
    // This way, this component is agnostic of the store implementation.

    // get startDate prop in the right format
    const startDateString = computed(() => {
      // firestore timestamp to date
      const startDate = new Date(props.startDate.seconds * 1000);
      // date to dd/mm/yyyy
      var dd = String(startDate.getDate()).padStart(2, "0");
      var mm = String(startDate.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = startDate.getFullYear();

      return yyyy + "-" + mm + "-" + dd;
    });

    // amount of months passed
    const monthsPassed = computed(() => {
      // get amount of months passed
      const now = new Date();
      const startDate = new Date(props.startDate.seconds * 1000);

      return (
        now.getMonth() -
        startDate.getMonth() +
        12 * (now.getFullYear() - startDate.getFullYear())
      );
    });

    // get the total cost
    const total = computed(() => {
      return (props.ratePerMonth * monthsPassed.value).toFixed(2);
    });

    // title in right format
    const capitalizedTitle = computed(() => {
      return props.title.charAt(0).toUpperCase() + props.title.slice(1);
    });

    // remove subscription
    function deleteSubscription() {
      store.dispatch("deleteSubscription", props.id);
    }

    // update subscription
    function updateSubscription() {
      const newSubscription = {
        title: props.title,
        startDate: props.startDate,
        ratePerMonth: props.ratePerMonth + 1,
      };
      store.dispatch("updateSubscription", {
        id: props.id,
        newSubscription: newSubscription,
      });
    }

    return {
      showModal,
      startDateString,
      monthsPassed,
      total,
      capitalizedTitle,
      deleteSubscription,
      updateSubscription,
    };
  },
});
</script>

<style>
.card-info {
  position: relative;
  background: linear-gradient(
    99.7deg,
    rgba(239, 239, 239, 0.36) 0%,
    rgba(239, 239, 239, 0.06) 98.36%
  );
  backdrop-filter: blur(14px);
}
.card-info::before {
  /* source: https://dev.to/afif/border-with-gradient-and-radius-387f */
  z-index: -1;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  background: linear-gradient(
      99.7deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    )
    border-box; /*3*/
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
</style>