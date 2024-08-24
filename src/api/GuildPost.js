const API_URL = "http://localhost:8080";

export const GuildPost = async (gameId, guildName, guildMasterName, guildTotalPopulation, guildContent) => {
    const data = { gameId, guildName, guildMasterName, guildTotalPopulation, guildContent };
    const token = localStorage.getItem('token');
    console.log('Token:', token); // 토큰 로그
    console.log('Request URL:', `${API_URL}/guilds`); // 요청 URL 로그
    console.log('Request body:', JSON.stringify(data)); // 요청 본문 로그

    try {
        const response = await fetch(`${API_URL}/guilds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || '길드 생성에 실패했습니다.');
        }

        // 성공 메시지 반환
        return {
            success: true,
            message: '길드 생성에 성공했습니다!',// 서버에서 반환한 데이터
        };

    } catch (error) {
        console.error('Guild creation error:', error);
        throw error;
    }
}