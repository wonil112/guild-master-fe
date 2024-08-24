const API_URL = "http://localhost:8080";

export const GuildsGet = async (page, size) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

    const response = await fetch(`${API_URL}/guilds?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('길드 목록을 가져오는데 실패했습니다.');
    }
    const data = await response.json();
    return data;

    } catch (error) {
        console.error('길드 목록 조회 오류:', error);
        throw error;
    }
};