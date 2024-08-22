const API_URL = "http://localhost:8080";

export const memberdelete = async () => { 
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
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 204) {
            // 204 No Content는 성공이지만 반환할 데이터가 없음을 의미합니다.
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error delete member', error);
        throw error;
    }
};