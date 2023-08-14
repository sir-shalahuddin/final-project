export default async function fetchUserData(token) {
    try {
        const response = await fetch(import.meta.env.VITE_HOST + "/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            throw new Error("Failed to fetch user data");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}