<template>
  <div>
    <subscription-popup
      :id="id"
      :title="capitalizedTitle"
      :startDate="startDateString"
      :ratePerMonth="ratePerMonth"
      v-model="showModal"
    />
    <!-- Card info -->
    <div
      class="
        flex
        justify-between
        bg-card-info
        p-4
        pb-6
        rounded-lg rounded-b-none
      "
    >
      <div class="text-white tracking-widest">
        <h1 class="text-2xl">{{ capitalizedTitle }}</h1>
        <h2>started {{ startDateString }} ({{ monthsPassed }} months ago)</h2>
      </div>
      <div>
        <span
          @click="showModal = true"
          class="mdi mdi-pencil text-white text-2xl"
        ></span>
        <span
          @click="deleteSubscription"
          class="mdi mdi-close text-white text-2xl"
        ></span>
      </div>
    </div>
    <!-- Card price  -->
    <div
      class="
        flex
        justify-between
        bg-card-price
        p-4
        rounded-lg rounded-t-none
        tracking-widest
        text-green
      "
    >
      <p>
        <span class="text-2xl">€{{ ratePerMonth }}</span> / month
      </p>
      <p>
        total <span class="text-2xl">€{{ total }}</span>
      </p>
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
      const startDate = new Date(props.startDate.seconds*1000);
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
      const startDate = new Date(props.startDate.seconds*1000);

      return (
        now.getMonth() -
        startDate.getMonth() +
        12 * (now.getFullYear() - startDate.getFullYear())
      );
    });

    // get the total cost
    const total = computed(() => {
      return props.ratePerMonth * monthsPassed.value;
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
.bg-card-info {
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.51) 5.76%,
    rgba(240, 240, 240, 0.318) 98.85%
  );
}

.bg-card-price {
  background: linear-gradient(
    90deg,
    rgba(137, 253, 126, 0.29) 7.07%,
    rgba(0, 194, 255, 0.29) 95.89%
  );
}

.text-green {
  color: #89fd7e;
}
</style>