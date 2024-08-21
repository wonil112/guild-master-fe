const API_URL = "http://localhost:8080";

export const login = async (email, password) => {
    const data = { username: email, password };

    try {
        const response = await fetch(`${API_URL}/members/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (response.ok) {
            const parsedData = responseText ? JSON.parse(responseText) : {};
            console.log('Login successful:', parsedData);
            return parsedData;
        } else {
            console.error('Login failed:', responseText);
            throw new Error(responseText || '로그인에 실패했습니다.');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};