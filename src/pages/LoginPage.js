import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Header from './HomeHeader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/home'); // 로그인 성공 후 홈 페이지로 이동
  };
  
  const validateEmail = (email) => {
    // 이메일 형식 확인
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) && !/[\u3131-\u3163\uac00-\ud7a3]/.test(email);
  };

  const validatePassword = (password) => {
    // 비밀번호 형식 확인
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    return passwordPattern.test(password);
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (emailValid && passwordValid) {
      setShowModal(true);
    } else {
      if (!emailValid) setEmailError('올바른 이메일 형식으로 입력해주세요.');
      if (!passwordValid) setPasswordError('비밀번호는 8자 이상이며, 영어와 특수문자를 포함해야 합니다.');
    }
  };
  const handleSignUp = () => {
    navigate('/signUp');
  };
  

  // 로그인 버튼 활성화 조건
  const isLoginDisabled = !(validateEmail(email) && validatePassword(password));

  return (
    <div>
        <Header/>
        <div className='main'>
        <div className="login-container">
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}
        <div className="condition">이메일 형식: example@domain.com, 한글 사용 금지</div>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}
        <div className="condition">비밀번호 형식: 8자 이상, 영어, 숫자, 특수문자 포함</div>
      </div>
      <button
        className="login-button"
        onClick={handleLogin}
        disabled={!validateEmail(email) || !validatePassword(password)}
      >
        login
      </button>
      <button
            className="signup-button"
            onClick={handleSignUp}
          >
            Sign Up
        </button>
      


      {showModal && (
        <div className="modal">
          <h2>로그인 성공!</h2>
          <button onClick={handleModalClose}>확인</button>
        </div>
      )}
    </div>

        </div>
    </div>
    
  );
};

export default LoginPage;
