export default defineNuxtRouteMiddleware((to) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (!token && to.path !== '/login') {
        return navigateTo('/login')
    }

    if (token && to.path === '/login') {
        return navigateTo('/')
    }
})