// SignUpInput 모달 제작.
// 회원가입을 하기 위해선. 
// 비밀 번호인지 이메일인지 이름인지, 휴대폰 번호를 알려주는 제목.
// Input 창과 비밀번호 입력, 이메일 입력 이라는 Placeholder
// 그 밑에 비밀번호나 이메일, 을 입력할 때마다 떠야 하는 오류 내용이 있음. 
// 비밀번호는 몇자 까지 가능합니다. 공백을 넣을 수 없습니다. 
// 오류 내용을 입력 받는 공간이 있어야 함. 

// 아 회원가입은 중복확인 버튼이 필요하군. email 에서! 그러면 이름을 바꿔야 겠군. 

import React from 'react';
const DuplicateInput = ({title, type, value, placeholder, onChange , error, onCheckDuplicate}) => { 


    return (
        <div>
            <h1> {title} </h1>
            <div>
                <input
                    type={type}
                    placeholder= {placeholder}
                    value ={value}
                    onChange={onChange}
                />
                {error && <p>{error}</p>}
                <button onClick = {onCheckDuplicate}> 중복 확인 </button>
            </div>
        </div>
    )
};
export default DuplicateInput;