<template>
  <div class="mt-6">
    <auth-register />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  layout: "unauthenticated",
  setup() {},
});
</script>
