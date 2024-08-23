import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SignUp } from '../api/SignUp';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import Header from './HomeHeader';

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  useEffect(() => {
    setEmailError('');
  }, [email]);
  
  useEffect(() => {
    setPasswordError('');
  }, [password]);
  
  useEffect(() => {
    setNameError('');
  }, [name]);
  
  useEffect(() => {
    setPhoneError('');
  }, [phone]);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) && !/[\u3131-\u3163\uac00-\ud7a3]/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    return passwordPattern.test(password);
  };

  const validateName = (name) => {
    return name.length >= 1 && name.length <= 15;
  };

  const validatePhone = (phone) => {
    const phonePattern = /^010-\d{4}-\d{4}$/;
    return phonePattern.test(phone);
  };
  

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const phoneNumber = value
      .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
      .slice(0, 13); // 최대 13자리 (010-1234-5678)
    setPhone(phoneNumber);
  };

  const handleSignUp = async (e) => {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const nameValid = validateName(name);
    const phoneValid = validatePhone(phone);
    e.preventDefault();

    if (emailValid && passwordValid && nameValid && phoneValid) {
      await SignUp(email, name, password, phone)
      .then(() => {
        alert('회원가입에 성공했습니다.');
        navigate('/login');
      })
      .catch(error => {
        alert(error.message);
      });
    } else {
      if (!emailValid) setEmailError('올바른 이메일 형식으로 입력해주세요.');
      if (!passwordValid) setPasswordError('비밀번호는 8자 이상이며, 영어와 특수문자를 포함해야 합니다.');
      if (!nameValid) setNameError('이름은 1자 이상 15자 이하여야 합니다.');
      if (!phoneValid) setPhoneError('올바른 전화번호 형식으로 입력해주세요.');
    }
  };


  const isSignUpDisabled = !(validateEmail(email) && validatePassword(password) && validateName(name) && validatePhone(phone));
  console.log('isSignUpDisabled:', isSignUpDisabled);
  console.log('Email valid:', email);
  console.log('Password valid:', validatePassword(password));
  console.log('Name valid:', validateName(name));
  console.log('Phone valid:', validatePhone(phone));
  
  
  return (
    <div>
      <Header />
      <div className='main'>
        <div className="signup-container">
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
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={15}
            />
            {nameError && <div className="error">{nameError}</div>}
            <div className="condition">이름은 1자 이상 15자 이하여야 합니다.</div>
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="전화번호"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={13}
            />
            {phoneError && <div className="error">{phoneError}</div>}
            <div className="condition">전화번호 형식: 010-1234-5678
            </div>
          </div>
          <button
            className="signup-submit-button" 
            onClick={handleSignUp}
              // disabled={isSignUpDisabled}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;