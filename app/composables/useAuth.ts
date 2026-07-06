import type { User } from "~/types/user"

export const useAuth = () => {
    const api = useApi()

    const user = useState<User | null>("auth-user", () => null)
    const loading = useState("auth-loading", () => false)
    const accessToken = useState<string | null>("access-token", () => null)

    const setToken = (res: any) => {
        accessToken.value = res.access_token

        if (import.meta.client) {
            localStorage.setItem("access_token", res.access_token)
            localStorage.setItem("refresh_token", res.refresh_token)
        }
    }

    const login = async (form: { nip: string; password: string }) => {
        loading.value = true

        try {
            const res = await api<any>("/auth/login", {
                method: "POST",
                body: form,
            })

            setToken(res)

            // Jika login sudah mengembalikan user
            if (res.user) {
                user.value = res.user
            } else {
                await fetchUser()
            }

            await navigateTo("/dashboard")
        } finally {
            loading.value = false
        }
    }

    const fetchUser = async () => {
        if (!import.meta.client) return

        const token = localStorage.getItem("access_token")

        if (!token) {
            user.value = null
            return
        }

        try {
            user.value = await api<User>("/auth/me")
        } catch (error) {
            console.error(error)

            user.value = null

            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
        }
    }

    const logout = async () => {
        user.value = null
        accessToken.value = null

        if (import.meta.client) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
        }

        await navigateTo("/login")
    }

    return {
        user,
        loading,
        login,
        logout,
        fetchUser,
    }
}