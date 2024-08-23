import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

`;

export const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 400px;
  height: 200px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  div {
    position: absolute;
    top: 5%;
    left: 90%;
    cursor: pointer;
    transform: translateX(-50%);
  }
 

`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  //isOpen state는 모달 창의 열고 닫힘 여부를 확인할 수 있습니다.
  //필요에 따라서 state를 더 만들 수도 있습니다.

  const openModalHandler = () => {
    // TODO : isOpen의 상태를 변경하는 메소드를 구현합니다.
    {isOpen === true ? setIsOpen(false) :setIsOpen(true)}
    
  };

  return (
    <>
      <ModalContainer>
      
      {/* TODO : 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.*/}
      {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현해야 합니다. */}
      <ModalBtn onClick={openModalHandler}>
      {isOpen ? 'Opened!': 'Open Modal'}
      </ModalBtn>
      {/* TODO : 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현해야 합니다. */}
      {isOpen ? 
        <ModalBackdrop onClick={openModalHandler}>
        <ModalView onClick={(event)=> event.stopPropagation()}>
        {/*ModalBackdrop이 눌렸을때 ModalView까지 눌리지 않도록 눌림방지*/}
        <div onClick={openModalHandler}>❌</div>
        modal 창이 열렸음
        </ModalView>
        </ModalBackdrop>
      : null
      }
      </ModalContainer>
    </>
  );
};