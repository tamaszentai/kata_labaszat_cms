<template>
  <header class="bg-cms_3 px-2 h-16 flex justify-between">
    <h1 class="ml-6 pt-2 text-4xl font-medium">{{this.$store.getters.getPageTitle}}</h1>
  </header>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
@Component({})

export default class Header extends Vue{
}
</script>

<style scoped>

</style>
