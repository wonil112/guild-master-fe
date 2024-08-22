const API_URL = "http://localhost:8080";

export const memberpatch = async (updatedData) => { 
    try {
        const token = localStorage.getItem('token');
        const memberId = Number(localStorage.getItem('memberId'));


        if (!token) {
            throw new Error('No token found');
        }

        if (!memberId) {
            throw new Error('No member ID found');
        }

        const response = await fetch(`${API_URL}/members/${memberId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData) 
        });

        if (!response.ok) {
            throw new Error('Failed to fetch member info');
        } 

        return await response.json();
    } catch (error) {
        console.error('Error fetching member info:', error);
        throw error;
    }
};