import { ref } from "vue"

const isSidebarOpen = ref(true)
const isCollapsed = ref(false)

export const useSidebar = () => {
    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value
    }

    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value
    }

    return {
        isSidebarOpen,
        isCollapsed,
        toggleSidebar,
        toggleCollapse,
    }
}