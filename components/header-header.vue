<template>
  <div class="flex header-height justify-between py-4 px-6">
    <Header-Logo />
    <div class="flex space-x-4">
      <Header-Add-Button />
      <Header-Signout-Button />
    </div>
  </div>
</template>

<style scoped>
.header-height {
  height: 10vh;
}
</style>
