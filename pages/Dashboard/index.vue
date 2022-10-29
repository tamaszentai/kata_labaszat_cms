<template>
  <div class="p-6">
    <div class="content-center">
      <table class="w-full text-sm text-left text-cms_black">
        <thead class="text-xs text-cms_black uppercase bg-cms_4 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6">
            Kategória
          </th>
          <th scope="col" class="py-3 px-6">
            Mennyiség
          </th>
          <th scope="col" class="py-3 px-6">
            Utoljára szerkesztve/hozzáadva
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Magamról
          </th>
          <td class="py-4 px-6">
            1
          </td>
          <td class="py-4 px-6">
            {{new Date()}}
          </td>
        </tr>
        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Szolgáltatások
          </th>
          <td class="py-4 px-6">
            15
          </td>
          <td class="py-4 px-6">
            {{new Date()}}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Feltöltött képek
          </th>
          <td class="py-4 px-6">
            50
          </td>
          <td class="py-4 px-6">
            {{new Date()}}
          </td>
        </tr>
        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           Árlista
          </th>
          <td class="py-4 px-6">
          1
          </td>
          <td class="py-4 px-6">
            {{new Date()}}
          </td>
        </tr>
        <tr>
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Blogbejegyzések
          </th>
          <td class="py-4 px-6">
            8
          </td>
          <td class="py-4 px-6">
            {{new Date()}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;


@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {},
})
export default class Dashboard extends Vue {

}
</script>
<style scoped>

</style>
