<template>
  <div
    class="flex flex-col mx-auto space-y-4 md:w-2/3 lg:w-1/2 xl:w-1/3 relative"
  >
    <background-svg></background-svg>
    <subscription-card
      v-for="subscription in subscriptions"
      :key="subscription.id"
      :id="subscription.id"
      :title="subscription.title"
      :startDate="subscription.startDate"
      :ratePerMonth="subscription.ratePerMonth"
    ></subscription-card>
  </div>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import { store } from "../store/index";

export default defineComponent({
  middleware: "authh",
  setup() {
    // bind the subscriptions
    store.dispatch("bindSubscriptions");

    // computed property to get the subscriptions from the state
    // NOTE: we should do this via the getters (vuex-composition-helpers)
    const subscriptions = computed(() => {
      return store.state.subscriptions;
    });

    // computed property to get user data from store
    // NOTE: can we inject this data in the context, as to reuse it everywhere in the app?
    const user = computed(() => {
      return store.getters.user;
    });
    return { user, subscriptions };
  },
});
</script>
