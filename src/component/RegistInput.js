// loginInput 모달 제작.
// 로그인을 하기 위해선. 
// 비밀 번호인지 이메일인지를 알려주는 제목.
// Input 창과 비밀번호 입력, 이메일 입력 이라는 Placeholder
// 그 밑에 비밀번호나 이메일을 입력할 때마다 떠야 하는 오류 내용이 있음. 
// 비밀번호는 몇자 까지 가능합니다. 공백을 넣을 수 없습니다. 
// 오류 내용을 입력 받는 공간이 있어야 함. 
// 그 오류내용은 어디서 내려주는 거지? >> 상위 loginPage 에서 내려줘야 한다! 

import React from 'react';
const RegistInput = ({title, type, value, placeholder, onChange , error}) => { 


    return (
        <div>
            <h1> {title} </h1>
            <input
                type={type}
                placeholder= {placeholder}
                value ={value}
                onChange={onChange}
            />
            {error && <p>{error}</p>}
        </div>
    )
};
export default RegistInput;