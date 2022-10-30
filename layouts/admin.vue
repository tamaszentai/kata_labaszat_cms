<template>
  <div>
    <Backdrop v-if="this.$store.getters.getBackDrop" class="absolute" />
    <div class="app-container bg-cms_2 flex">
      <Sidenav />
      <div class="w-screen h-screen overflow-x-hidden">
        <Header />
        <Nuxt />
      </div>
    </div>
  </div>
</template>
