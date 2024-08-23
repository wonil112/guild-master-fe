export const Logout = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        throw new Error('No token found');
    }
    localStorage.removeItem('token');
    
};