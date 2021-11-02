<template>
  <div class="flex flex-col space-y-4">
    <subscription-card
      v-for="subscription in subscriptions"
      :key="subscription.id"
      :id="subscription.id"
      :title="subscription.title"
      :startDate="subscription.startDate"
      :ratePerMonth="subscription.ratePerMonth"
    ></subscription-card>
    <subscription-popup-form></subscription-popup-form>
  </div>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import subscriptionCard from "../components/subscription-card.vue";
import { store } from "../store/index";

export default defineComponent({
  setup() {
    // bind the subscriptions
    store.dispatch("bindSubscriptions");

    // computed property to get the subscriptions from the state
    const subscriptions = computed(() => {
      return store.state.subscriptions;
    });
    return { subscriptions };
  },
});
</script>
