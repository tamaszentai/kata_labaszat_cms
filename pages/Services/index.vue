<template>
  <div class="p-6">
    <div class="content-center">
      <table class="w-full text-sm text-left text-cms_black">
        <thead
          class="text-xs text-cms_black uppercase"
        >
        <tr>
          <th></th>
          <th scope="col" class="py-3 px-6 bg-cms_4">Megnevezés</th>
          <th scope="col" class="py-3 px-6 bg-cms_4">Leírás</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(service, index) in services" :key="service.id">
          <td>
          </td>
          <td
            class="py-4 px-6 font-medium text-cms_black whitespace-nowrap"
          >
            <textarea class="w-96 border-2 bg-cms_1" :value="service.title" />
          </td>
          <td class="py-4 px-6">
            <textarea class="w-96 border-2 bg-cms_1" :value="service.description" />
          </td>
          <td>
            <button
              class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
              @click="removeService(service.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>

              Törlés
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button
                    class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
                    @click="addNewService"
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
          <td
            class="py-4 px-6 font-medium text-cms_black whitespace-nowrap"
          >
            <textarea class="w-96 border-2 bg-cms_1" v-model="title"/>
          </td>
          <td class="py-4 px-6">
            <textarea class="w-96 border-2 bg-cms_1" v-model="description" />
          </td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <button
        class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
        @click="saveData"
      >
        Mentés
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
const { v4: uuidv4 } = require('uuid');

@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Services extends Vue {

  title = ''
  description = ''

  dbRef = this.$fire.firestore.collection('services')

  services = [
  ]

  async fetch() {
    const doc = await this.dbRef.get()
    const data = doc.docs.map(doc => doc.data())
    console.log(data)
    this.services = [...data]
  }

  addNewService() {
    this.services.push(
      {
        title: this.title,
        description: this.description,
        id: uuidv4()
      },
    )
    this.title = ''
    this.description = ''
  }

  removeService(id:string) {
    const filteredServices = this.services.filter(e => e.id !== id)
    this.services = [...filteredServices]
  }

  async saveData() {
    for(const service of this.services) {
      const res = await this.dbRef.add(service)
      console.log(service, res.id)
    }
  }
}
</script>
<style scoped></style>
