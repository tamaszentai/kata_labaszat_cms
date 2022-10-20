<template>
  <header class="bg-cms_3 px-2 h-16 flex justify-between">
    <h1 class="ml-6 pt-2 text-4xl font-medium">{{ pageTitle }}</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { pageTitleMap } from '~/utils/pageTitle'

@Component({})
export default class Header extends Vue {
  pageTitleMap = pageTitleMap

  get pageTitle() {
    return this.pageTitleMap.get(this.$route.path.split('/')[1])
  }
}
</script>

<style scoped></style>
