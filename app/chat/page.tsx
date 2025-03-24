'use client';

import MobileLayout from '../components/MobileLayout';
import styled from 'styled-components';
import { useState, useRef, TouchEvent } from 'react';

const ChatListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ChatItemContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: white;
`;

const ChatItemContent = styled.div<{ offset: number }>`
  display: flex;
  transform: translateX(${(props) => props.offset}px);
  transition: transform 0.2s ease;
  width: 100%;
  background: white;
  min-width: 0;
  box-sizing: border-box;
`;

const ExitButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 80px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  user-select: none;
  background-color: #ef4444;
`;

const StyledChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  background: white;
  width: 100%;
  min-width: 0;
  cursor: pointer;
`;

const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
  max-width: calc(100% - 1rem);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ChatName = styled.span`
  font-weight: 500;
  color: #111827;
`;

const ChatTime = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const ChatPreview = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const ChatMessage = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
  margin-right: 0.5rem;
`;

const UnreadBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + 120px);
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 50;

  &:active {
    transform: scale(0.95);
  }
`;

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

export default function ChatListPage() {
  const [swipeOffset, setSwipeOffset] = useState<{ [key: string]: number }>({});
  const touchStart = useRef<{ [key: string]: number }>({});

  const handleTouchStart = (e: TouchEvent, roomId: string) => {
    touchStart.current[roomId] = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent, roomId: string) => {
    if (!touchStart.current[roomId]) return;

    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - touchStart.current[roomId];

    // 왼쪽으로만 스와이프 되도록 제한
    const newOffset = Math.min(0, Math.max(-80, diff));

    setSwipeOffset((prev) => ({
      ...prev,
      [roomId]: newOffset,
    }));
  };

  const handleTouchEnd = (roomId: string) => {
    const offset = swipeOffset[roomId] || 0;

    // 스와이프가 절반 이상 되었을 때 완전히 열리도록
    if (offset < -40) {
      setSwipeOffset((prev) => ({
        ...prev,
        [roomId]: -80,
      }));
    } else {
      setSwipeOffset((prev) => ({
        ...prev,
        [roomId]: 0,
      }));
    }

    touchStart.current[roomId] = 0;
  };

  const handleExit = (roomId: string) => {
    // TODO: 채팅방 나가기 로직 구현
    console.log(`Exit chat room ${roomId}`);
  };

  const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: '홍길동 컨설턴트',
      lastMessage: '네, 말씀해 주신 내용을 바탕으로 개략적인 견적과 일정을 안내해 드리겠습니다.',
      timestamp: new Date('2024-03-20T10:33:00'),
      unreadCount: 1,
    },
    {
      id: '2',
      name: '김철수 컨설턴트',
      lastMessage: '안녕하세요! 카페 창업 상담 요청 주셔서 감사합니다.',
      timestamp: new Date('2024-03-19T15:20:00'),
      unreadCount: 0,
    },
  ];

  const formatTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? '오후' : '오전';
      const formattedHours = hours % 12 || 12;
      return `${ampm} ${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    } else {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
  };

  return (
    <MobileLayout showHomeBar={true}>
      <ChatListContainer>
        <Header>
          <HeaderTitle>상담 채팅</HeaderTitle>
        </Header>
        {chatRooms.map((room) => (
          <ChatItemContainer key={room.id}>
            <ExitButton onClick={() => handleExit(room.id)}>나가기</ExitButton>
            <ChatItemContent
              offset={swipeOffset[room.id] || 0}
              onTouchStart={(e) => handleTouchStart(e, room.id)}
              onTouchMove={(e) => handleTouchMove(e, room.id)}
              onTouchEnd={() => handleTouchEnd(room.id)}
            >
              <StyledChatItem onClick={() => (window.location.href = `/chat/${room.id}`)}>
                <ChatContent>
                  <ChatHeader>
                    <ChatName>{room.name}</ChatName>
                    <ChatTime>{formatTime(room.timestamp)}</ChatTime>
                  </ChatHeader>
                  <ChatPreview>
                    <ChatMessage>{room.lastMessage}</ChatMessage>
                    {room.unreadCount > 0 && <UnreadBadge>{room.unreadCount}</UnreadBadge>}
                  </ChatPreview>
                </ChatContent>
              </StyledChatItem>
            </ChatItemContent>
          </ChatItemContainer>
        ))}
      </ChatListContainer>
      <FloatingButton onClick={() => (window.location.href = '/chat/new')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </FloatingButton>
    </MobileLayout>
  );
}
