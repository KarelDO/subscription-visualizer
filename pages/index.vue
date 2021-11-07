<template>
  <div class="fill-height md:pb-10">
    <div
      class="
        h-full
        background-image
        py-14
        px-4
        md:px-28 md:rounded-2xl
        flex flex-col
        mx-auto
        my-auto
        space-y-6
      "
    >
      <!-- <background-svg></background-svg> -->
      <subscription-card
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :id="subscription.id"
        :title="subscription.title"
        :startDate="subscription.startDate"
        :ratePerMonth="subscription.ratePerMonth"
      ></subscription-card>
    </div>
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

<style scoped>
.fill-height {
  height: 90vh;
}
.background-image {
  display: block;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url("static/coffee-background.jpg");
  background-size: cover;
  background-position-y: 50%;
  background-repeat: no-repeat;
  overflow: scroll;
  overflow-x: hidden;
  /* box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.61); */
}
.background-image::-webkit-scrollbar {
  scrollbar-width: none;
  display: none;
}
</style>