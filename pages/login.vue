<template>
  <div class="flex flex-col items-center h-screen bg-cms_2">
    <img
      class="mx-auto h-64 w-auto m-32 rounded-md"
      src="../assets/kata_labaszat_logo.png"
    />
    <form
      class="bg-cms_4 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label
          class="block text-cms_light text-sm font-bold mb-2"
          for="username"
        >
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-cms_light text-sm font-bold mb-2"
          for="password"
        >
          Jelszó
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
        />
        <!--        <p class="text-red-500 text-xs italic">Please choose a password.</p>-->
      </div>
      <div v-if="!loading" class="flex items-center justify-between">
        <button
          class="bg-cms_2 hover:bg-cms_1 text-white hover:text-cms_light font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Belépés
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-cms_black hover:text-purple-700"
          href="#"
        >
          Elfelejtett jelszó?
        </a>
      </div>
      <div v-else class="flex flex-col items-center justify-between">
        <LoadingSpinner />
      </div>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingSpinner from '../components/LoadingSpinner'

@Component({
  layout: '',
  components: { LoadingSpinner },
})
export default class LoginPage extends Vue {
  email = ''
  password = ''

  loading = false


  login() {
    this.loading = true
    this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$router.push('/dashboard')
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style scoped></style>
