import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4a3b7f;
  }
`;
// 사용자가 입력할 때마다, search 상태가 변경됨. 
// onSearch 콜백함수를 호출. 상위에서 제공. 
const SearchInput = ({ onSearch }) => {
  const [searchGuild, setSearchGuild] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchGuild(value);
    onSearch(value);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="길드 검색"
        value={searchGuild}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};

export default SearchInput;