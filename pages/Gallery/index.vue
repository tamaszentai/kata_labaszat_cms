<template>
  <div class="container">
    <form @submit.prevent="uploadImage">
    <input type="text" v-model="description"/>
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Profile picture"
      class="h-80"
    />
    <div class="flex pl-0 space-x-1 sm:pl-2">
      <label
        for="file-upload"
        class="bg-cms_4 inline-flex justify-center p-2 rounded cursor-pointer hover:bg-cms_1"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Upload image</span>
      </label>
      <input
        id="file-upload"
        type="file"
        class="hidden"
        @change="onFileChange"
      />
    </div>
      <button type="submit">Hozzaadas</button>
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
export default class Gallery extends Vue {
  imageUrl = ''
  description = ''
  file: File | null = null

  dbRef = this.$fire.firestore.collection('gallery')

  onFileChange(e: any) {
    if (e.target.files.length !== 0) {
      this.file = e.target.files[0]
      console.log(this.file?.name)
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file)
      }
    }
  }

  async uploadImage() {
    if (this.file && this.description) {
      const snapshot = await this.$fire.storage.ref('gallery/' + this.file.name).put(this.file)
      const downloadUrl = await snapshot.ref.getDownloadURL()
      console.log(downloadUrl)
      this.dbRef.add({
        description: this.description,
        imageUrl: downloadUrl,
      }).then(() => {
        this.$toast.show('Mentve', {className: ['toasting'], duration: 1500, position: "top-center"})
      })
    }
  }
}
</script>
<style scoped>

</style>
