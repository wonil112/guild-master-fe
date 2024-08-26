import React, { useState, useEffect} from 'react';
import { useStore } from '../auth';
import axios from 'axios';
import '../Global.css';
import GlobalHeader from './GlobalHeader';
import LoginInput from '../component/RegistInput';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const LoginButtonStyle = styled.button`
    width: 50%;
    height: 40px;
    margin-top: 20px;
    border-radius: 20px;
    background-color: #000000;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: #FFFFFF;
  margin: 0 80px;  // 좌우 마진 추가
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useStore();

    const handleLogin = () => {
        dispatch({ type: 'LOGIN', payload: { username: 'email' } });
        navigate('/home');
    }

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    // 이메일 형식 검증
    // const [emailValid, setEmailValid] = useState(false);
    // 이메일 에러가 떴을 때 내용을 내려줌. 
    const [emailError, setEmailError] = useState('');
    // 비밀번호 검증
    // const [pwValid, setPwValid] = useState(false);
    // 로그인 버튼의 비활성화 여부를 저장. 로그인 버튼은 입력이 완료되기 전까지 활성화 되면 안되므로 true. 
    const [pwError, setPwError] = useState('');
    //로그인 버튼 클릭 활성화 시키는 상태. 
    const [notAllow, setNotAllow] = useState(true);
    
    //임시 데이터임. 나중에는 api 요청을 받아서 할 것임. 
    const User = {
        email: 'abc@naver.com',
        pw: 'System2000!!'
    }

    // Email 검증. 
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        setPwError('');
    }

    const validateEmail = () => {
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!regex.test(email)) {
            setEmailError('이메일 형식은 example@example.com 입니다.');
            return false;
        }
        setEmailError('');
        return true;
    }

    const validatePw = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!regex.test(pw)) {
            setPwError('비밀번호는 8자 이상 20자 이하이며, 영어 대소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.');
            return false;
        }
        setPwError('');
        return true;
    }

    // 로그인 버튼 클릭.! email 과 비밀번호 검증이 다 끝냈을 때. 버튼 활성화. 
    const onClickConfirmButton = async () => {
        // 나중에 여기다가 api /login Post 요청을 보내야 함. 
        // 바꿔야 되네.......나중에...........
        if(validateEmail() && validatePw()) {
            try {
                const response = await axios.post('/members/login', {
                    username: email,
                    password: pw
                });
                const memberId = response.headers.get('memberId');
                localStorage.setItem('memberId', memberId);
                const token = response.headers.get('Authorization');
                localStorage.setItem('token', token);
                dispatch({ type: 'LOGIN', 
                    payload: { username: email,
                        memberId: memberId,
                        token: token
                     }
                    });
                alert('로그인에 성공했습니다.');
                navigate('/home'); // 홈 페이지로 이동
            } catch (error) {
                console.error('로그인 실패', error);
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        }
    }
    // 컴포넌트가 렌더링 될 때 특정 사이드 이팩트를 수행할 수 있게 해줌. 
    useEffect ( () => {
        // 컴포넌트가 랜더링 될 때 실행되는 함수 
        if (email && pw) {
            // 이메일과 비밀번호 인증이 성공하면! 
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
        // 배열. useEffect 가 의존하는 값이 들어감. 값이 변경 될 때마다 작성한 함수가 작동되게 함.
        // 두 유효성 검증을 통과 했을 때에만 버튼을 활성화 시킴. 
    },  [email, pw]);

    return (
        <div>
            <GlobalHeader />
            <div className="main">
                <div>
                    <LoginInput 
                        title = 'Email'
                        type = 'email'
                        placeholder = '이메일을 입력해주세요'
                        value = {email}
                        onChange = {handleEmail}
                        onBlur = {validateEmail}
                        error = {emailError}
                    />
                    <LoginInput 
                        title = 'Password'
                        type = 'password'
                        placeholder = '비밀번호를 입력해주세요'
                        value = {pw}
                        onChange = {handlePw}
                        onBlur = {validatePw}
                        error = {pwError}
                    />
                    <LoginButtonStyle onClick = {onClickConfirmButton} disabled = {notAllow}>
                        login
                    </LoginButtonStyle>
                </div>
                    <LinkContainer>
                        <LinkStyle to = "/home"> Forgot Password?</LinkStyle>
                        <LinkStyle to = "/signup"> Sign Up </LinkStyle>
                    </LinkContainer>
            </div>
        </div>
    );
};

export default LoginPage;