import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HomeHeader';
import { memberData } from '../data/memberData';
import logo from '../logo/fulllogo_white.png'
import './MyPage.css'

const MyPage = () => {
    const [member, setMember] = useState(null);
    console.log(memberData);
    const navigate = useNavigate();

    useEffect(() => {
        // 실제 애플리케이션에서는 로그인한 사용자의 ID를 사용해야 합니다.
        // 여기서는 예시로 첫 번째 회원 데이터를 사용합니다.
        setMember(memberData[0]);
        setEditName(memberData[0].name);
    }, []);

    // 수정 로직.을 함. name 과 password 가능. 수정 가능.
    // 수정 버튼을 누르면 이름은 Input 창이 뜨고, 
    // 비밀번호는 비밀번호 변경 버튼이 뜸. 또 그 버튼을 눌러야 수정이 가능함. 

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const handleEdit = () => {
        // 수정한 내용 상태를 받음. 
        setIsEditing(true);
    };
    const handleSave = () => {
        // 여기에 실제 저장 로직 구현
        setMember({...member, name: editName});
        setIsEditing(false);
        setIsChangingPassword(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
        setEditName(member.name);
        setNewPassword('');
    };

    const handlePasswordChange = () => {
        setIsChangingPassword(true);
    };



    // 탈퇴 로직 수행. 
    // 탈퇴 의사를 묻는 상태 변수. 
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const handleWithdraw = () => {
        setShowWithdrawModal(true);
    };
    const confirmWithdraw = () => {
        // 실제 탈퇴 로직 구현
        console.log('User confirmed withdrawal');
        setShowWithdrawModal(false);
        // 탈퇴 후 처리 (예: 로그아웃 및 홈페이지로 리다이렉트)
    };
    // 아니오 버튼을 눌렀을 때 돌아가는 onClick 메서드에서 실행. 
    const cancelWithdraw = () => {
        setShowWithdrawModal(false);
    };


    


    return (
        <div>
            <Header/>
            <div className='main'>
                {member && (
                    <div>
                        <div className="member-info">
                            <div className="info-item">
                                <h3>이름</h3>
                                {isEditing ? (
                                    <input 
                                        value={editName} 
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                ) : (
                                    <p>{member.name}</p>
                                )}
                            </div>
                            <div className="info-item">
                                <h3>이메일</h3>
                                <p>{member.email}</p>
                            </div>
                            <div className="info-item">
                                <h3>가입일자</h3>
                                <p>{new Date(member.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="info-item">
                                <h3>비밀번호</h3>
                                {isChangingPassword ? (
                                    <input 
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="새 비밀번호"
                                    />
                                ) : (
                                    isEditing ? (
                                        <button onClick={handlePasswordChange}>비밀번호 변경</button>
                                    ) : (
                                        <p>{'*'.repeat(8)}</p>
                                    )
                                )}
                            </div>
                            <div className="button-container">
                            <div className="button-container">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSave}>저장</button>
                                        <button onClick={handleCancel}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit}>수정</button>
                                        <button onClick={handleWithdraw}>탈퇴</button>
                                    </>
                                )}
                            </div>
                            </div>
                        </div>
                    </div>
                )}
                {showWithdrawModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>정말 길드 마스터를 탈퇴하시겠습니까?</p>
                            <img src={logo} className="modal-logo" />
                            <div className="modal-buttons">
                                <button className="modal-button-yes" onClick={confirmWithdraw}>예</button>
                                <button className="modal-button-no" onClick={cancelWithdraw}>아니오</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};
export default MyPage;