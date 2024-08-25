import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import RegistInput from '../component/RegistInput';
import DuplicateInput from '../component/SignUpPage/DuplicateInput'
import styled from 'styled-components';


const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const SignUpForm = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px; // 입력창들 사이의 간격
`;

const SignUpButton = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    background-color: #000000;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // 이메일 형식 검증
    const [emailValid, setEmailValid] = useState(false);
    // 이메일 에러가 떴을 때 내용을 내려줌. 
    const [emailError, setEmailError] = useState('');
    // 비밀번호 검증
    const [pwValid, setPwValid] = useState(false);
    // 로그인 버튼의 비활성화 여부를 저장. 로그인 버튼은 입력이 완료되기 전까지 활성화 되면 안되므로 true. 
    const [pwError, setPwError] = useState('');
    // 이름 검증, 이름 에러 내용 띄우기. 
    const [nameValid, setNameValid] = useState(false);
    const [nameError, setNameError] = useState('');
    // 전화번호 검증. 전화번호 에러 내용 띄우기. 
    const [phoneValid, setPhoneValid] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    //회원가입 버튼 클릭 활성화 시키는 상태. 
    const [notAllow, setNotAllow] = useState(true);


    //useState: 새로고침을 하지 않아도, 동적으로 페이지가 변화하도록 도아주는 컴포넌트. 
    // Email 검증. 
    const handleEmail = (e) => {
        setEmail(e.target.value);
        // 이메일 검증 정규표현식
        const regex = 
           /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        // 입력한 값을 정규표현식으로 검증함. 만약 ture 라면 
        if (regex.test(email)) {
            //이메일 검증 이 true 임. 
            setEmailValid(true);
            setEmailError('');
        } else {
            // 아니라면 거짓! 
            setEmailValid(false);
            // 거짓을 때 오류 내용을 내려주고 싶은데? 어떻게 하지? 
            // set emailError 를 만들어서, 그 내용을 loginInput 에 내려줌.
            setEmailError('이메일 형식은 example@example.com 입니다.');
        }
    }
    //이메일 중복확인 실행. 나중에 필요하면 api 요청. 
    const handleDuplicateEmail = () => {
        alert('이메일 중복 확인 기능은 아직 구현되지 않았습니다.');
    };

    // 비밀번호 검증. 
    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (regex.test(pw)) {
            setPwValid(true);
            setPwError('')
        } else {
            setPwValid(false);
            setPwError('비밀번호는 8자 이상 20자 이하이며, 영어 대소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.')
        }
    }

    // 이름 검증 
    const handleName = (e) => {
        setName(e.target.value);
        const regex = /^[가-힣]{1,15}$/;
        if (regex.test(name)) {
            setNameValid(true);
            setNameError('')
        } else {
            setNameValid(false);
            setNameError("이름은 공백 없이 한글로만 구성되며, 최대 15자까지 입력할 수 있습니다.")
        }
    }

    // 전화번호 검증
    const handlePhone = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        const regex = /^010-\d{3,4}-\d{4}$/;
        if (regex.test(newPhone)) {
            setPhoneValid(true);
            setPhoneError('')
        } else {
            setPhoneValid(false);
            setPhoneError("휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        }
    }
    //전화번호 중복확인 실행. 나중에 필요하면 api 요청. 
    const handleDuplicatePhone = () => {
        alert('전화번호 중복 확인 기능은 아직 구현되지 않았습니다.');
    };

    // signUp 버튼 클릭. email과 비밀번호, 전화번호, 이름 검증이 다 끝냈을 때 버튼 활성화.
    const onClickConfirmButton = () => {
        // 나중에 여기다가 api /Members Post 요청을 보내야 함.
        // 실제 API 호출 및 응답 처리 로직으로 대체해야 함
        console.log('회원가입 버튼 클릭됨');  // 수정된 부분
        if (emailValid && pwValid && nameValid && phoneValid) {
            // API 호출 성공을 가정
            console.log('모든 필드가 유효함');  // 추가된 로그
            alert('회원가입에 성공했습니다.');
            navigate('/home'); // 홈 페이지로 이동
        } else {
            console.log('유효하지 않은 필드가 있음');  // 추가된 로그
            alert('모든 필드를 올바르게 입력해주세요.');
        }
    }
    


    useEffect ( () => {
        // 컴포넌트가 랜더링 될 때 실행되는 함수 
        if (emailValid && pwValid && setNameValid && setPhoneValid) {
            // 이메일과 비밀번호 인증이 성공하면! 
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
        // 배열. useEffect 가 의존하는 값이 들어감. 값이 변경 될 때마다 작성한 함수가 작동되게 함.
        // 두 유효성 검증을 통과 했을 때에만 버튼을 활성화 시킴. 
    },  [emailValid, pwValid, nameValid, phoneValid]);


// email, phone, 은 중복 확인 버튼이 있는 DuplicateInput 컴포넌트,
// 이름, 비밀번호는 그냥 RegistInput 컴포넌트. 

    return (
        <div>
            <GlobalHeader />
            <SignUpContainer>
                <h1>회원가입</h1>
                <SignUpForm>
                    <DuplicateInput 
                        title = 'Email'
                        type ={email}
                        placeholder = '이메일을 입력해주세요'
                        onChange = {handleEmail}
                        error = {emailError}
                        onCheckDuplicate = {handleDuplicateEmail}
                    />
                    <RegistInput 
                        title = 'Name'
                        type ={name}
                        placeholder = '이름을 입력해주세요'
                        onChange = {handleName}
                        error = {nameError}
                    />
                    <RegistInput 
                        title = 'Password'
                        type ={pw}
                        placeholder = '비밀번호를 입력해주세요'
                        onChange = {handlePw}
                        error = {pwError}
                    />
                    <DuplicateInput 
                        title = 'Phone'
                        type="tel"
                        value={phone}
                        placeholder = '전화번호를 입력해주세요'
                        onChange = {handlePhone}
                        error = {phoneError}
                        onCheckDuplicate = {handleDuplicatePhone}
                    />
                    <SignUpButton onClick = {onClickConfirmButton} disabled = {notAllow}>
                        signUp
                    </SignUpButton>
                </SignUpForm>
            </SignUpContainer>
        </div>
    );
};

export default SignUpPage;