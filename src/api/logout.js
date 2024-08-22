const API_URL = "http://localhost:8080";

export const logout = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        throw new Error('No token found');
    }
    localStorage.removeItem('token');
    
};