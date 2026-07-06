export default defineNuxtPlugin(async () => {
    const { fetchUser } = useAuth()

    try {
        await fetchUser()
    } catch (error) {
        console.error("Failed to fetch user:", error)
    }
})