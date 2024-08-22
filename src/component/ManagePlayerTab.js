import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tab from './Tab';
import PlayerItem from './PlayerItem';
import { memberGuildData } from '../data/memberGuildData';
import './ManagePlayerTab.css'; 
import Modal from './Modal';

const ManagePlayerTab = () => {
  const [activeMembers, setActiveMembers] = useState([]);
  const [waitingMembers, setWaitingMembers] = useState([]);
  const [retiredMembers, setRetiredMembers] = useState([]);
  useEffect(() => {
    // API 호출을 통해 각 상태의 회원 데이터를 가져옵니다.
    fetchMembers('active').then(setActiveMembers);
    fetchMembers('waiting').then(setWaitingMembers);
    fetchMembers('retired').then(setRetiredMembers);
  }, []);


  // 활동중 회원 중에 탈퇴시키는 버튼 구현 시켰을 때 모달이 떴다가 수행.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [retireCandidate, setRetireCandidate] = useState(null);
  const handleRetire = (memberId, nickname) => {
    setRetireCandidate({ id: memberId, nickname });
    setIsModalOpen(true);
  };


  const handleRoleChange = (memberId, newRole) => {
    // 여기에서 역할 변경 로직을 구현합니다.
    // 예: API 호출을 통해 서버에 변경사항을 저장하고, 
    // 성공 시 로컬 상태를 업데이트합니다.
    console.log(`Guild ID: ${memberId}, New Role: ${newRole}`);
  };

  const confirmRetire = async () => {
    if (retireCandidate) {
      try {
        console.log(`Member ID: ${retireCandidate.id} - 탈퇴 처리 성공`);
        // API 엔드포인트 URL을 적절히 수정하세요
        const response = await axios.post(`/api/members/${retireCandidate.id}/retire`);
        
        if (response.status === 200) {
          // 성공적으로 탈퇴 처리된 경우, 로컬 상태를 업데이트합니다

          
        }
      } catch (error) {
        console.error('회원 탈퇴 처리 중 오류 발생:', error);
        // 오류 처리 로직을 여기에 추가하세요 (예: 사용자에게 오류 메시지 표시)
      }
    }
    setIsModalOpen(false);
    setRetireCandidate(null);
  };

  const renderMemberList = (members, status) => (
    <div className="member-list">
      {members.map(member => (
        <PlayerItem 
        key={member.memberId} 
        player={member} 
        onRoleChange={handleRoleChange}
        memberStatus={status} 
        onRetire={handleRetire}/>
      ))}
    </div>
  );

  const tabs = [
    {
      label: '활동중 회원',
      content: renderMemberList(activeMembers, 'active')
    },
    {
      label: '대기중 회원',
      content: renderMemberList(waitingMembers, 'waiting')
    },
    {
      label: '탈퇴한 회원',
      content: renderMemberList(retiredMembers, 'retired')
    }
  ];

  return (
    <>
      <Tab tabs={tabs} />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRetire}
        title="회원 탈퇴"
        children={`${retireCandidate?.nickname} 회원을 탈퇴시키겠습니까?`}
      />
    </>
  );
};


const fetchMembers = async (status) => {
    // 실제 API 호출을 시뮬레이션하기 위해 지연을 추가합니다.
    await new Promise(resolve => setTimeout(resolve, 500));

    const addEventData = (members) => members.map(member => ({
        ...member,
        totalEvents: 0,  // 임시로 0으로 설정
        recentEvents: 0  // 임시로 0으로 설정
      }));
  
    switch (status) {
        case 'active':
          return addEventData(memberGuildData.filter(member => 
            ['MEMBER_GUILD_ROLE_PLAYER', 'MEMBER_GUILD_ROLE_MASTER', 'MEMBER_GUILD_ROLE_MANAGER'].includes(member.memberGuildRole) && member.deletedAt === 'null'
          ));
        case 'waiting':
          return addEventData(memberGuildData.filter(member => 
            member.memberGuildRole === 'null' 
          ));
        case 'retired':
          return addEventData(memberGuildData.filter(member => member.deletedAt !== 'null'));
        default:
          throw new Error('Invalid status');
      }
    };
    
  
  export default ManagePlayerTab;