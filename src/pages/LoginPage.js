import React, { useState, useEffect } from 'react';
import '../Global.css';
import GlobalHeader from '../header/GlobalHeader';
import LoginInput from '../component/LoginPage/LoginInput';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    // 이메일 형식 검증
    const [emailValid, setEmailValid] = useState(false);
    // 이메일 에러가 떴을 때 내용을 내려줌. 
    const [emailError, setEmailError] = useState('');
    // 비밀번호 검증
    const [pwValid, setPwValid] = useState(false);
    // 로그인 버튼의 비활성화 여부를 저장. 로그인 버튼은 입력이 완료되기 전까지 활성화 되면 안되므로 true. 
    const [pwError, setPwError] = useState('');
    //로그인 버튼 클릭 활성화 시키는 상태. 
    const [notAllow, setNotAllow] = useState(true);
    
    //임시 데이터임. 나중에는 api 요청을 받아서 할 것임. 
    const User = {
        email: 'abc@naver.com',
        pw: 'System2000!!'
    }

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
    // 로그인 버튼 클릭.! email 과 비밀번호 검증이 다 끝냈을 때. 버튼 활성화. 
    const onClickConfirmButton = () => {
        // 나중에 여기다가 api /login Post 요청을 보내야 함. 
        // 바꿔야 되네.......나중에...........
        if (email === User.email && pw === User.pw) {
            alert('로그인에 성공했습니다.')
        } else {
            alert('등록되지 않은 회원이거나 입력한 값이 일치하지 않습니다.');
        }
    }
    // 컴포넌트가 렌더링 될 때 특정 사이드 이팩트를 수행할 수 있게 해줌. 
    useEffect ( () => {
        // 컴포넌트가 랜더링 될 때 실행되는 함수 
        if (emailValid && pwValid) {
            // 이메일과 비밀번호 인증이 성공하면! 
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
        // 배열. useEffect 가 의존하는 값이 들어감. 값이 변경 될 때마다 작성한 함수가 작동되게 함.
        // 두 유효성 검증을 통과 했을 때에만 버튼을 활성화 시킴. 
    },  [emailValid, pwValid]);


    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <h1>로그인</h1>
                <div>
                    <LoginInput 
                        title = 'Email'
                        type ={email}
                        placeholder = '이메일을 입력해주세요'
                        onChange = {handleEmail}
                        error = {emailError}
                    />
                    <LoginInput 
                        title = 'Password'
                        type ={pw}
                        placeholder = '비밀번호를 입력해주세요'
                        onChange = {handlePw}
                        error = {pwError}
                    />
                    <button onClick = {onClickConfirmButton} disabled = {notAllow}>
                        login
                    </button>
                </div>
                <div>
                     <Link to = "/signup"> signUp </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;