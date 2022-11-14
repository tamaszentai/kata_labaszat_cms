<template>
  <div>
    <ServiceModal
      :isModalOpen="isModalOpen"
      :serviceProp="serviceProp"
      @closeModal="closeModal"
      @deleteService="deleteService(serviceProp)"
    />
    <div class="p-6">
      <ul>
        <draggable class="list-group" :list="services" :move="checkMove">
          <li
            class="list-group-item"
            v-for="service in services"
            :key="service.id"
          >
            <Service
              :service="service"
              @modifyData="modifyData"
              @openModal="openModal(service)"
            ></Service>
          </li>
        </draggable>

        <li
          v-if="isAddNew"
          class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move"
        >
          {{ latestOrder }}
          <textarea class="block p-4 w-96 resize-none" v-model="title" required />
          <textarea class="block p-4 w-96 resize-none" v-model="description" required />
          <button
            class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
            @click="saveNewData"
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
            @click="undoNewData"
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
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
        </li>
      </ul>
      <button
        class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
        @click="addNew"
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
        Új hozzáadása
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase/compat'
import DocumentData = firebase.firestore.DocumentData
const { v4: uuidv4 } = require('uuid')
import draggable from 'vuedraggable'
import Service from '~/components/Service.vue'
import ServiceModal from '~/components/ServiceModal.vue'

@Component({
  // middleware: 'authenticated',
  layout: 'admin',
  components: {
    Service,
    ServiceModal,
    draggable,
  },
})
export default class Services extends Vue {
  title = ''
  description = ''
  isAddNew = false
  isModalOpen = false
  serviceProp: DocumentData | null = null

  newService = {
    title: this.title,
    description: this.description,
    order: this.latestOrder,
    id: uuidv4(),
  }

  dbRef = this.$fire.firestore.collection('services')

  services: DocumentData[] = []

  async fetch() {
    const doc = await this.dbRef.get()
    this.services = doc.docs.map((service) => service.data())
  }

  get latestOrder() {
    if (this.services) {
      return this.services.length
    }
  }

  openModal(service: DocumentData) {
    this.serviceProp = service
    this.isModalOpen = true
    this.$store.dispatch('showBackdrop')
  }

  closeModal() {
    this.isModalOpen = false
    this.$store.dispatch('hideBackdrop')
  }

  deleteService(service: DocumentData) {
    this.dbRef
      .doc(`${service.id}`)
      .delete()
      .then(() => {
        this.services = this.services.filter((e) => e.id !== service.id)
        this.$toast.show('Szolgáltatás törölve!', {className: ['toasting'], duration: 1500, position: "top-center"})
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  modifyData(service: DocumentData) {
    this.dbRef
      .doc(`${service.id}`)
      .update(service)
      .then(() => {
        this.$toast.show('Szolgáltatás módosítva!', {className: ['toasting'], duration: 1500, position: "top-center"})
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  addNew() {
    this.isAddNew = true
  }

  saveNewData() {
    const service = {
      title: this.title,
      description: this.description,
      order: this.latestOrder,
      id: uuidv4(),
    }
    this.dbRef
      .doc(`${service.id}`)
      .set(service)
      .then(() => {
        this.$toast.show('Új szolgáltatás hozzáadva!', {className: ['toasting'], duration: 1500, position: "top-center"})
        this.services.push(service)
        console.log('Document successfully written!')
        this.title = ''
        this.description = ''
        this.isAddNew = false
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  undoNewData() {
    this.title = ''
    this.description = ''
    this.isAddNew = false
  }

  checkMove(event: any){
    // event.draggedContext.element.order = this.services.indexOf(event.draggedContext.element)
    event.draggedContext.element.order = event.draggedContext.futureIndex
    for(let service of this.services) {
      console.log(service.title, service.order)
    }
  }
}
</script>

<style>
.toasting {
  color: #1d1d1d !important;
  font-weight: bold !important;
  background-color: #AC7088 !important;
}
</style>
