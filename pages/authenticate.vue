<template>
  <div class="flex flex-col items-center text-center h-full">
    <header-logo></header-logo>
    <h2 class="mt-5">Beautifully visualize your subscriptions.</h2>
    <p>
      Made for fun by
      <a
        class="bg-yellow-300 underline px-1"
        href="https://kareldoosterlinck.com/"
        >Karel D'Oosterlinck</a
      >
    </p>
    <!-- styling for firebase ui -->
    <script src="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"></script>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css"
    />

    <auth-register class="mt-6" />
    <unauthenticated-preview class="h-3/6 mb-4" />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import unauthenticated from "../layouts/unauthenticated.vue";

export default defineComponent({
  components: { unauthenticated },
  layout: "unauthenticated",
  setup() {},
});
</script>
