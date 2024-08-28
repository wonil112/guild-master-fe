import React from 'react';
import styled from 'styled-components';
import WaitPlayersItem from './WaitPlayersItem';
import { useParams } from 'react-router-dom';

const WaitListContainer = styled.div`
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

const WaitList = ({ list = [] }) => {
    const { guildId } = useParams();

    return (
        <WaitListContainer>
            <Table>
                <TableHeader>
                    <tr>
                        <TableHeaderCell>닉네임</TableHeaderCell>
                        <TableHeaderCell>신청일자</TableHeaderCell>
                        <TableHeaderCell>액션</TableHeaderCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <EmptyMessage> 대기 중인 길드원이 없습니다.</EmptyMessage>
                            </td>
                        </tr>
                    ) : (
                        list.map(({
                            memberId,
                            nickName,
                            createdAt
                        }) => (
                            <WaitPlayersItem
                                key={memberId}
                                memberId={memberId}
                                nickName={nickName}
                                createdAt={createdAt}
                                guildId={guildId}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </WaitListContainer>
    );
};

export default WaitList;