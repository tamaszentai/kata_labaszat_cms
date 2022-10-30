import { Middleware } from '@nuxt/types'

const authenticatedMiddleware: Middleware = ({ app, route, redirect }) => {
  if (route.path === '/') {
    if (!app.$fire.auth.currentUser) {
      redirect('login')
    } else {
      redirect('/dashboard')
    }
  }
  if (route.path !== '/login') {
    //we are on a protected route
    if (!app.$fire.auth.currentUser) {
      //take them to sign in page
      return redirect('/login')
    }
  } else if (route.path === '/login') {
    if (!app.$fire.auth.currentUser) {
      //leave them on the sign in page
    } else {
      return redirect('/')
    }
  }
}

export default authenticatedMiddleware
