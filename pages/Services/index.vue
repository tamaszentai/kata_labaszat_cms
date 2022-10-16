<template>
  <div class="p-6">
    <div class="content-center">
      <table class="w-full text-sm text-left text-cms_black">
        <thead
          class="text-xs text-cms_black uppercase bg-cms_4 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Megnevezés</th>
            <th scope="col" class="py-3 px-6">Leírás</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(service, index) in services" :key="index">
          <td
            class="py-4 px-6 font-medium text-cms_black whitespace-nowrap"
          >
            <textarea class="w-96 border-2 bg-cms_1" :value="service.title"/>
          </td>
          <td class="py-4 px-6">
            <textarea class="w-96 border-2 bg-cms_1" :value="service.description" />
          </td>
        </tr>
        </tbody>
      </table>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Services extends Vue {
  services = [
    {
      title: 'Gél lakk',
      description: 'Nem tudom mit lehetne ide írni'
    },
    {
      title: 'Gombaleszedés',
      description: 'Ide se'
    },
  ]

  addNewService() {
    this.services.push(
      {
        title: '',
        description: ''
      },
    )
  }
}
</script>
<style scoped></style>
