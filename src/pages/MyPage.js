import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from './HomeHeader';
import Modal from '../component/Modal';
import { memberget } from '../api/memberget';
import { memberpatch } from '../api/memberpatch';
import { memberdelete } from '../api/memberdelete';
import logo from '../logo/fulllogo_white.png'
import './MyPage.css'

const MyPage = () => {
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    // 이름 에러가 나는지. 확인. error 가 나며는 그거에 대항하는 로직 수행. 
    const [nameError, setNameError] = useState('');
    // 이름 검증.
    const validateName = (name) => {
        const nameRegex = /^[가-힣]{1,15}$/;
        return nameRegex.test(name);
    };
    // 이름을 다 수정한 후 수정 버튼을 눌렀을 때 수행되는 로직. 
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setEditName(newName);
        if (!validateName(newName)) {
            setNameError('이름은 공백 없이 한글로만 구성되며, 최대 15자까지 입력할 수 있습니다.');
        } else {
            setNameError('');
        }
    };


    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await memberget();
                if (response && response.data) {
                    setMember(response.data);
                    setEditName(response.data.name);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError(err.message);
                if (err.message === 'No token found' || err.message === 'No member ID found') {
                    // 토큰이나 memberId가 없으면 로그인 페이지로 리다이렉트
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchMemberInfo();
    }, [navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // 수정 로직.을 함. name 과 password 가능. 수정 가능.
    // 수정 버튼을 누르면 이름은 Input 창이 뜨고, 
    // 비밀번호는 비밀번호 변경 버튼이 뜸. 또 그 버튼을 눌러야 수정이 가능함. 
    const handleEdit = () => {
        // 수정한 내용 상태를 받음. 
        setIsEditing(true);
    };
    const handleSave = async () => {
        try {
            const updatedData = { name: editName };
            if (isChangingPassword && newPassword) {
                updatedData.password = newPassword;
            }
            const updatedMember = await memberpatch(updatedData);
            setMember(updatedMember);
            setIsEditing(false);
            setIsChangingPassword(false);
            setNewPassword('');
            // 성공 메시지 표시
            alert('회원 정보가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('Failed to update member info:', error);
            // 에러 메시지 표시
            alert('회원 정보 업데이트에 실패했습니다: ' + error.message);
        }
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

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await memberdelete();
            setShowDeleteModal(false);
            // 로컬 스토리지에서 토큰과 회원 ID 제거
            localStorage.removeItem('token');
            localStorage.removeItem('memberId');
            // 성공 메시지 표시
            alert('회원 탈퇴가 완료되었습니다.');
            // 홈페이지로 리다이렉트
            navigate('/');
        } catch (error) {
            console.error('Failed to delete member:', error);
            // 에러 메시지 표시
            alert('회원 탈퇴에 실패했습니다: ' + error.message);
        }
    };

    // 아니오 버튼을 눌렀을 때 돌아가는 onClick 메서드에서 실행. 탈퇴하시겠습니까?>> 아니오. 
    const cancelDelete = () => {
        setShowDeleteModal(false);
    };
    const deleteModalContent = (
        <>
            <p>정말 길드 마스터를 탈퇴하시겠습니까?</p>
            <img src={logo} className="modal-logo" alt="Guild Master Logo" />
        </>
    );

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
                                    <>
                                    <input 
                                        value={editName} 
                                        onChange={handleNameChange}
                                    />
                                    {nameError && <p className="error-message">{nameError}</p>}
                                    </>
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
                                        <button onClick={handleSave} disabled={!!nameError} >저장</button>
                                        <button onClick={handleCancel}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit}>수정</button>
                                        <button onClick={handleDelete}>탈퇴</button>
                                    </>
                                )}
                            </div>
                            </div>
                        </div>
                    </div>
                )}
                    <Modal
                        isOpen={showDeleteModal}
                        onClose={cancelDelete}
                        title="길드 마스터 탈퇴"
                        buttonText="예"
                        onButtonClick={confirmDelete}
                    >
                        {deleteModalContent}
                    </Modal>
            </div>
        </div>
    )
};
export default MyPage;