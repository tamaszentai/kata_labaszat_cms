<template>
  <div class="container">
    Blog
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Blog extends Vue {
}
</script>
<style scoped>

</style>
