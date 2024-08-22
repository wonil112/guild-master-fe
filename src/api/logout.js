const API_URL = "http://localhost:8080";

export const logout = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        throw new Error('No token found');
    }
    localStorage.removeItem('token');
    
};

    // try {
    //     const response = await fetch(`${API_URL}/members/logout`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     });

    //     if (response.ok) {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('memberId');
    //         console.log('Logout successful');
    //     } else {
    //         const responseText = await response.text();
    //         console.error('Logout failed:', responseText);
    //         throw new Error(responseText || '로그아웃에 실패했습니다.');
    //     }
    // } catch (error) {
    //     console.error('Logout error:', error);
    //     throw error;
    // }