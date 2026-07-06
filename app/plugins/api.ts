export default defineNuxtPlugin(() => {

    const api = $fetch.create({
        baseURL: "http://localhost:8000/api",

        onRequest({ options }) {
            const token = localStorage.getItem("access_token")

            if (token) {
                const headers = new Headers(options.headers as HeadersInit)
                headers.set("Authorization", `Bearer ${token}`)
                options.headers = headers
            }
        },

        async onResponseError({ response }) {
            if (response.status === 401) {
                const { refreshToken } = useAuth()

                try {
                    await refreshToken()
                } catch (e) {
                    navigateTo("/login")
                }
            }
        },
    })

    return {
        provide: {
            api,
        },
    }
})