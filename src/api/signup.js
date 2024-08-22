const API_URL = "http://localhost:8080";

export const signUp = async (email, name, password, phone) => {
  const data = { name, email, password, phone };
  console.log('Original data:', data);
  console.log('JSON data:', JSON.stringify(data));

  try {
    const response = await fetch(`${API_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log('Response status:', response.status);

    const responseText = await response.text();
    console.log('Response text:', responseText);

    let parsedData;
    try {
      parsedData = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
      throw new Error('서버 응답을 처리하는 중 오류가 발생했습니다.');
    }

    if (response.status === 201) {
      console.log('회원가입 성공:', parsedData);
      return parsedData;
    } else {
      console.error('회원가입 실패:', parsedData);
      throw new Error(parsedData.message || '회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error('네트워크 오류 또는 서버 오류:', error);
    throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
  }
};