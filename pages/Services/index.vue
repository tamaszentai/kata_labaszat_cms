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
        <draggable class="list-group" :list="services" @end="adjustIndices">
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
          <textarea
            class="block p-4 w-96 resize-none"
            v-model="title"
            required
          />
          <textarea
            class="block p-4 w-96 resize-none"
            v-model="description"
            required
          />
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
      <button
        class="bg-cms_4 text-cms_black hover:hover:bg-cms_1 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-50"
        @click="saveOrder"
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
          />
        </svg>

        Sorrend mentese
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
  drag = false

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
    this.services = doc.docs
      .map((service) => service.data())
      .sort((a: DocumentData, b: DocumentData) => a.order - b.order)
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
        this.$toast.show('Szolgáltatás törölve!', {
          className: ['toasting'],
          duration: 1500,
          position: 'top-center',
        })
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
        this.$toast.show('Szolgáltatás módosítva!', {
          className: ['toasting'],
          duration: 1500,
          position: 'top-center',
        })
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
        this.$toast.show('Új szolgáltatás hozzáadva!', {
          className: ['toasting'],
          duration: 1500,
          position: 'top-center',
        })
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

  adjustIndices() {
    for (let service of this.services) {
      service.order = this.services.indexOf(service)
    }
  }

  saveOrder() {
    for (let service of this.services) {
      this.dbRef
        .doc(`${service.id}`)
        .update(service)
        .then(() => {
          this.$toast.show('Szolgáltatás módosítva!', {
            className: ['toasting'],
            duration: 1500,
            position: 'top-center',
          })
          console.log('Document successfully updated!')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style>
.toasting {
  color: #1d1d1d !important;
  font-weight: bold !important;
  background-color: #ac7088 !important;
}

.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
