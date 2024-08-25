// loginInput 모달 제작.
// 로그인을 하기 위해선. 
// 비밀 번호인지 이메일인지를 알려주는 제목.
// Input 창과 비밀번호 입력, 이메일 입력 이라는 Placeholder
// 그 밑에 비밀번호나 이메일을 입력할 때마다 떠야 하는 오류 내용이 있음. 
// 비밀번호는 몇자 까지 가능합니다. 공백을 넣을 수 없습니다. 
// 오류 내용을 입력 받는 공간이 있어야 함. 
// 그 오류내용은 어디서 내려주는 거지? >> 상위 loginPage 에서 내려줘야 한다! 

import React from 'react';
import styled from 'styled-components';

const InputContainerStyle = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 140px; // 최소 높이 설정
`;

const InputTitleStyle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
    margin-bottom: 10px;
`;

const InputStyle = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
    background-color: transparent;
    border: 2px solid #F3F3F3;
    padding: 0 15px;
    color: #FFFFFF;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: pink;
    }

    &::placeholder {
        color: #999;
    }
`;

const ErrorMessageStyle = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    width: 100%;
    word-wrap: break-word;
    min-height: 20px; // 최소 높이 설정
`;
  

const RegistInput = ({title, type, value, placeholder, onChange, onBlur, error}) => {
    return (
        <InputContainerStyle>
            <InputTitleStyle> {title} </InputTitleStyle>
            <InputStyle
                type={type}
                placeholder= {placeholder}
                value ={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <ErrorMessageStyle>{error}</ErrorMessageStyle>}
        </InputContainerStyle>
    )
};
export default RegistInput;