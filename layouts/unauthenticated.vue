<template>
  <div class="pt-6 px-6 flex flex-col items-center">
    <header-logo></header-logo>
    <h2 class="mt-5">Beautifully visualize your subscriptions.</h2>
    <p>Made for fun by <a class="bg-yellow-300 underline px-1" href="https://kareldoosterlinck.com/">Karel D'Oosterlinck</a></p>
    <!-- styling for firebase ui -->
    <script src="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"></script>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css"
    />
    <Nuxt />
  </div>
</template>
