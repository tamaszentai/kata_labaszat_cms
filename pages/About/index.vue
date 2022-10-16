<template xmlns="http://www.w3.org/1999/html">
  <div class="p-6">
    <form class="w-auto">
      <div class="bg-gray-50 rounded-lg border border-cms_black">
        <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea id="comment" rows="25" class="px-0 w-full text-sm text-gray-900 bg-cms_1 border-2 border" placeholder="" required=""></textarea>
        </div>
        <div class="flex justify-between items-center py-2 px-3">
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cms_4 rounded-lg hover:bg-cms_1">
            Mentés
          </button>
          <img v-if="imageUrl" :src="imageUrl" alt="Profile picture" class="h-80"/>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <label for="file-upload" class="bg-cms_4 inline-flex justify-center p-2  rounded cursor-pointer hover:bg-cms_1">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Upload image</span>
            </label>
            <input id="file-upload" type="file" class="hidden" @change="onFileChange">
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class About extends Vue {

  imageUrl: null | any = null

  onFileChange(e: any) {
    const file = e.target.files[0];
    this.imageUrl = URL.createObjectURL(file);
  }
}
</script>
<style scoped>

</style>
