// SignUpInput 모달 제작.
// 회원가입을 하기 위해선. 
// 비밀 번호인지 이메일인지 이름인지, 휴대폰 번호를 알려주는 제목.
// Input 창과 비밀번호 입력, 이메일 입력 이라는 Placeholder
// 그 밑에 비밀번호나 이메일, 을 입력할 때마다 떠야 하는 오류 내용이 있음. 
// 비밀번호는 몇자 까지 가능합니다. 공백을 넣을 수 없습니다. 
// 오류 내용을 입력 받는 공간이 있어야 함. 

// 아 회원가입은 중복확인 버튼이 필요하군. email 에서! 그러면 이름을 바꿔야 겠군. 

import React from 'react';
import styled from 'styled-components';

const InputContainerStyle = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 130px; // 최소 높이 설정
    position: relative;
`;

const InputTitleStyle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
`;

const InputWrapper = styled.div`
    display: flex;
    width: 410px;
    align-items: center;
    margin-bottom: 40px;
    gap: 10px; // 입력창과 버튼 사이의 간격
`;

const InputStyle = styled.input`
    width: 300px;
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
    position: absolute;
    margin-top: 95px;
    width: 100%;
    word-wrap: break-word;
`;

const NavButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  width: 100px;
  height: 40px;
  flex-shrink: 0;
`;

const DuplicateInput = ({title, type, value, placeholder, onChange, error, onCheckDuplicate}) => { 


    return (
        <InputContainerStyle>
            <InputTitleStyle> {title} </InputTitleStyle>
            <InputWrapper>
                <InputStyle
                    type={type}
                    placeholder= {placeholder}
                    value ={value}
                    onChange={onChange}
                />
                <NavButton onClick = {onCheckDuplicate}> 중복 확인 </NavButton>
            </InputWrapper>    
            {error && <ErrorMessageStyle>{error}</ErrorMessageStyle>}
        </InputContainerStyle>
    )
};
export default DuplicateInput;