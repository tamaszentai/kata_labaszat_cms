<template>
  <div class="flex min-h-0 w-52 h-screen flex-col bg-cms_4">
    <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
      <div class="flex flex-shrink-0 ml-6 items-center px-4">
        <img
          class="h-32 mb-5 w-auto"
          src="../assets/kata_labaszat_logo_black.png"
          alt="Kata labaszat logo"
        />
      </div>
      <nav class="mt-5 flex-1 space-y-1 bg-cms_4 px-2" aria-label="Sidebar">
        <NuxtLink
          to="/dashboard"
          class="bg-cms_2 hover:bg-cms_3 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <span class="flex-1">Információs pult</span>
        </NuxtLink>

        <NuxtLink
          to="about"
          class="text-cms_black hover:hover:bg-cms_3 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span class="flex-1">Magamról</span>
        </NuxtLink>

        <NuxtLink
          to="/services"
          class="text-cms_black hover:hover:bg-cms_3 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          <span class="flex-1">Szolgáltatások</span>
        </NuxtLink>

        <NuxtLink
          to="/gallery"
          class="text-cms_black hover:hover:bg-cms_3 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span class="flex-1">Galéria</span>
        </NuxtLink>

        <NuxtLink
          to="/pricelist"
          class="text-cms_black hover:hover:bg-cms_3 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <span class="flex-1">Árlista</span>
        </NuxtLink>

        <NuxtLink
          to="/blog"
          class="text-cms_black hover:hover:bg-cms_3 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        >
          <svg
            class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span class="flex-1">Blog</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="flex bg-cms_4 p-4">
      <button
        class="bg-cms_1 text-cms_black hover:hover:bg-cms_2 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
        @click="logout"
      >
        <svg
          class="text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6"
          svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <span class="flex-1">Kilépés</span>
      </button>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  // middleware: 'authenticated',
  layout: '',
  components: {},
})
export default class Sidenav extends Vue {
  logout() {
    this.$fire.auth.signOut()
  }
}
</script>

<style scoped></style>
