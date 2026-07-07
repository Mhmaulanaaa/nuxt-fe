import { useApi } from "~/composables/useApi";

export const usePoli = () => {
    const api = useApi();

    const endpoint = "/master/poli";

    /**
     * Get List
     */
    const getList = async (query = {}) => {
        return await api(endpoint, {
            method: "GET",
            query,
        });
    };

    /**
     * Get Detail
     */
    const getDetail = async (id: number | string) => {
        return await api(`${endpoint}/${id}`, {
            method: "GET",
        });
    };

    /**
     * Create
     */
    const create = async (payload: any) => {
        return await api(endpoint, {
            method: "POST",
            body: payload,
        });
    };

    /**
     * Update
     */
    const update = async (
        id: number | string,
        payload: any
    ) => {
        return await api(`${endpoint}/${id}`, {
            method: "PUT",
            body: payload,
        });
    };

    /**
     * Delete
     */
    const remove = async (id: number | string) => {
        return await api(`${endpoint}/${id}`, {
            method: "DELETE",
        });
    };

    /**
     * Search
     */
    const search = async (keyword: string) => {
        return await api(endpoint, {
            method: "GET",
            query: {
                keyword,
            },
        });
    };

    /**
     * Count
     */
    const count = async () => {
        return await api(`${endpoint}/count`, {
            method: "GET",
        });
    };

    return {
        getList,
        getDetail,
        create,
        update,
        remove,
        search,
        count,
    };
};