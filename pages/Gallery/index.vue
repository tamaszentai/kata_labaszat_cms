<template>
  <div class="container">
    Galeria
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Gallery extends Vue {
}
</script>
<style scoped>

</style>
