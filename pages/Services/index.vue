<template>
  <div class="p-6">
    <div class="content-center">
      <table class="w-full text-sm text-left text-cms_black">
        <thead class="text-xs text-cms_black uppercase">
          <tr>
            <th></th>
            <th scope="col" class="py-3 px-6 bg-cms_4">Megnevezés</th>
            <th scope="col" class="py-3 px-6 bg-cms_4">Leírás</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td></td>
            <td class="py-4 px-6 font-medium text-cms_black whitespace-nowrap">
              <textarea
                class="w-96 border-2 bg-cms_1"
                v-model="service.title"
              />
            </td>
            <td class="py-4 px-6">
              <textarea
                class="w-96 border-2 bg-cms_1"
                v-model="service.description"
              />
            </td>
            <td>
              <button
                class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
                @click="modifyData(service)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

                Módosítás
              </button>
            </td>
            <td>
              <button
                class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
                @click="removeService(service)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                Törlés
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
                @click="saveData"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Hozzáadás
              </button>
            </td>
            <td class="py-4 px-6 font-medium text-cms_black whitespace-nowrap">
              <textarea class="w-52 border-2 bg-cms_1" v-model="title" />
            </td>
            <td class="py-4 px-6">
              <textarea class="w-52 border-2 bg-cms_1" v-model="description" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/compat'
import DocumentData = firebase.firestore.DocumentData
const { v4: uuidv4 } = require('uuid')

@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Services extends Vue {
  title = ''
  description = ''

  dbRef = this.$fire.firestore.collection('services')

  services: DocumentData[] = []

  async fetch() {
    const doc = await this.dbRef.get()
    this.services = doc.docs.map((service) => service.data())
  }

  removeService(service: DocumentData) {
    this.dbRef.doc(`${service.id}`).delete()
      .then(() => {
        this.services = this.services.filter((e) => e.id !== service.id)
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  modifyData(service: DocumentData) {
    this.dbRef.doc(`${service.id}`).update(service)
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  saveData() {
    const service = {
      title: this.title,
      description: this.description,
      id: uuidv4(),
    }
    this.dbRef
      .doc(`${service.id}`)
      .set(service)
      .then(() => {
        this.services.push(service)
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }
}
</script>
<style scoped></style>
