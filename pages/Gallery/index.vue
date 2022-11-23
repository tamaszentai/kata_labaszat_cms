<template>
  <div class="container">
    <form @submit.prevent="uploadImage">
      <input type="text" v-model="description" />
      <img v-if="imageUrl" :src="imageUrl" alt="Picture" class="h-80" />
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
    <div>
      <ul class="grid grid-cols-4 gap-4">
        <li v-for="(galleryItem, index) in gallery" :key="index">
            <GalleryItem :imageData="galleryItem"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/compat'
import DocumentData = firebase.firestore.DocumentData
import GalleryItem from '~/components/GalleryItem.vue'
const { v4: uuidv4 } = require('uuid')

@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: { GalleryItem },
})
export default class Gallery extends Vue {
  imageUrl = ''
  description = ''
  file: File | null = null
  gallery: DocumentData[] = []

  dbRef = this.$fire.firestore.collection('gallery')

  async fetch() {
    const doc = await this.dbRef.get()
    this.gallery = doc.docs
      .map((image) => image.data())
      .sort(
        (a: DocumentData, b: DocumentData) => b.dateUploaded - a.dateUploaded
      )
  }

  onFileChange(e: any) {
    if (e.target.files.length !== 0) {
      this.file = e.target.files[0]
      console.log(this.file?.name)
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file)
      }
    }
  }

  async uploadImage(): Promise<void> {
    if (this.file && this.description) {
      const snapshot = await this.$fire.storage
        .ref('gallery/' + this.file.name)
        .put(this.file)
      const downloadUrl = await snapshot.ref.getDownloadURL()
      const gsBucketUrl = snapshot.ref.toString()
      const galleryItem = {
        description: this.description,
        imageUrl: downloadUrl,
        location: gsBucketUrl,
        dateUploaded: Date.now(),
        id: uuidv4(),
      }
      this.dbRef
        .doc(`${galleryItem.id}`)
        .set(galleryItem)
        .then(() => {
          this.$toast.show('Mentve', {
            className: ['toasting'],
            duration: 1500,
            position: 'top-center',
          })
          this.description = ''
          this.file = null
          this.imageUrl = ''
        })
    }
  }

  async deleteImage(image: any): Promise<void> {
    await this.$fire.storage.refFromURL(image.location).delete()
    await this.dbRef.doc(`${image.id}`).delete()
  }
}
</script>
<style scoped></style>
