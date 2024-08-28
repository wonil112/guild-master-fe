// status 만 보고 플레이어들만 내려줌. 
import React from 'react';
import styled from 'styled-components';
import PlayersItem from './PlayersItem'

const PlayerListContainer = styled.div`
  width: 100%;
  max-height: 600px;
  border-radius: 8px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f0f0f0;
  position: sticky;
  top: 0;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

const TableBody = styled.tbody``;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px 0;
`;

const PlayerList = ({ list = [] }) => {

    return (
        <PlayerListContainer>
            <Table>
                <TableHeader>
                    <tr>
                        <TableHeaderCell>닉네임</TableHeaderCell>
                        <TableHeaderCell>가입일자</TableHeaderCell>
                        <TableHeaderCell>길드권한</TableHeaderCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <EmptyMessage>가입 길드원이 없습니다.</EmptyMessage>
                            </td>
                        </tr>
                    ) : (
                        list.map(({
                            memberId,
                            nickName,
                            memberGuildRoles,
                            createdAt
                        }) => (
                            <PlayersItem
                                key={memberId}
                                memberId={memberId}
                                nickName={nickName}
                                memberGuildRoles={memberGuildRoles}
                                createdAt={createdAt}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </PlayerListContainer>
    )
};
export default PlayerList;