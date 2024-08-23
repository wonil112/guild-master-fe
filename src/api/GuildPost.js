const API_URL = "http://localhost:8080";

export const GuildPost = async (guildName, ) => {
    const data = { };

    try {
        const response = await fetch(`${API_URL}/members/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (response.ok) {
            const token = response.headers.get('authorization');
            localStorage.setItem('token', token);
            const memberId = response.headers.get('memberId');
            localStorage.setItem('memberId', memberId);

        } else {
            console.error('Login failed:', responseText);
            throw new Error(responseText || '로그인에 실패했습니다.');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};