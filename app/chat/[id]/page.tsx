'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';

const ChatContainer = styled.div`
  flex: 1;
  padding: 2rem 1rem;
  overflow-y: auto;
  height: calc(100vh - 3.75rem);
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  margin-bottom: 1rem;
  justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 65%;
  border-radius: 0.5rem;
  padding: 0.5rem
  font-size: 1rem;
  word-break: break-word;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
  }

  ${(props) =>
    props.$isUser
      ? `
    background-color: var(--secondary-color);
    color: white;
    border-top-right-radius: 0;
  `
      : `
    background-color: #F3F4F6;
    color: #1F2937;
    border-top-left-radius: 0;
  `}
`;

const EstimateCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const EstimateHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const EstimateTitle = styled.h3`
  font-weight: bold;
  color: #1f2937;
  font-size: 1.125rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EstimateMore = styled.span`
  font-size: 0.875rem;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const EstimateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
`;

const EstimateLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const EstimateValue = styled.span`
  font-size: 1rem;
  color: #374151;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const EstimateNote = styled.div`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  opacity: 0.75;
  margin-top: 0.25rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.05);
  padding: 1rem;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ShareButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  &:hover {
    background-color: var(--primary-dark);
  }
`;

const MessageInput = styled.input`
  flex: 1;
  border: 0.0625rem solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.875rem 1.25rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  padding: 0.875rem;
  border-radius: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  &:hover {
    background-color: var(--secondary-dark);
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface Message {
  id: string;
  sender: 'user' | 'consultant';
  content: string;
  timestamp: Date;
  type: 'text' | 'estimate';
}

interface EstimateData {
  budget: number;
  location: string;
  interiorStyle: string;
  equipment: string[];
  menuTypes: string[];
  additionalNotes: string;
}

export default function ChatRoomPage() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'user',
      content: JSON.stringify(
        {
          budget: 150000000,
          location: '서울시 강남구 역삼동',
          interiorStyle: '모던 인더스트리얼',
          equipment: ['에스프레소 머신 (La Marzocco)', '그라인더 2대', '제빙기', '냉장쇼케이스', '온수기'],
          menuTypes: ['에스프레소 베이스 음료', '수제 베이커리', '브런치', '수제 케이크'],
          additionalNotes: '20평 규모의 카페 창업을 계획중입니다. 테이크아웃과 매장 내 취식이 모두 가능한 공간을 원합니다.',
        },
        null,
        2,
      ),
      timestamp: new Date('2024-03-20T10:30:00Z'),
      type: 'estimate',
    },
    {
      id: '2',
      sender: 'consultant',
      content:
        '안녕하세요! 카페 창업 견적서 잘 확인했습니다. 역삼동은 직장인이 많은 지역이라 브런치와 베이커리를 포함하신 것이 좋은 선택이네요. 예산과 관련하여 몇 가지 조언을 드리고 싶은데, 인테리어 공사 기간은 어느 정도로 생각하고 계신가요?',
      timestamp: new Date('2024-03-20T10:31:00Z'),
      type: 'text',
    },
    {
      id: '3',
      sender: 'user',
      content: '인테리어는 한 달 정도로 생각하고 있습니다. 가능한 기간인가요?',
      timestamp: new Date('2024-03-20T10:32:00Z'),
      type: 'text',
    },
    {
      id: '4',
      sender: 'consultant',
      content:
        '네, 말씀해 주신 내용을 바탕으로 개략적인 견적과 일정을 안내해 드리겠습니다.\n\n1. 인테리어 (20평 기준)\n- 기본 공사: 4,500만원\n- 모던 인더스트리얼 가구 및 소품: 2,000만원\n- 공사 기간: 35일 예상\n\n2. 설비\n- La Marzocco 머신: 2,800만원\n- 그라인더 2대: 600만원\n- 제빙기: 250만원\n- 쇼케이스 및 온수기: 800만원\n\n3. 주방 설비\n- 브런치 및 베이커리 설비: 1,500만원\n\n4. 기타\n- 인허가 및 행정 비용: 500만원\n- 예비 비용: 1,000만원\n\n총 예상 비용은 약 1억 4천만원으로 예산 내에서 진행 가능합니다. 추가로 초기 재료비와 운영비를 고려하면 좋을 것 같습니다. 인테리어 자재나 설비 중 일부 조정을 통해 비용 절감도 가능합니다.',
      timestamp: new Date('2024-03-20T10:33:00Z'),
      type: 'text',
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [estimateData] = useState<EstimateData>({
    budget: 0,
    location: '',
    interiorStyle: '',
    equipment: [],
    menuTypes: [],
    additionalNotes: '',
  });

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = (content: string, type: 'text' | 'estimate' = 'text') => {
    const newMsg: Message = {
      id: Math.random().toString(36).substring(2, 15),
      sender: 'user',
      content,
      timestamp: new Date(),
      type,
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    }).format(date);
  };

  return (
    <MobileLayout showHomeBar={false}>
      <PageHeader title="견적 상담" backUrl="/chat" />
      <ChatContainer ref={chatContainerRef}>
        {messages.map((message) => (
          <MessageWrapper key={message.id} $isUser={message.sender === 'user'}>
            <MessageBubble $isUser={message.sender === 'user'}>
              {message.type === 'estimate' ? (
                <EstimateCard>
                  <EstimateHeader>
                    <EstimateTitle>카페 창업 견적서</EstimateTitle>
                    <EstimateMore>자세히 보기 ⟩</EstimateMore>
                  </EstimateHeader>
                  {(() => {
                    const data = JSON.parse(message.content);
                    return (
                      <>
                        <EstimateRow>
                          <EstimateLabel>예산</EstimateLabel>
                          <EstimateValue>{(data.budget || 0).toLocaleString()}원</EstimateValue>
                        </EstimateRow>
                        <EstimateRow>
                          <EstimateLabel>위치</EstimateLabel>
                          <EstimateValue>{data.location || '-'}</EstimateValue>
                        </EstimateRow>
                        <EstimateRow>
                          <EstimateLabel>인테리어</EstimateLabel>
                          <EstimateValue>{data.interiorStyle || '-'}</EstimateValue>
                        </EstimateRow>
                        <EstimateRow>
                          <EstimateLabel>메뉴</EstimateLabel>
                          <EstimateValue>{(data.menuTypes || []).length}개 카테고리</EstimateValue>
                        </EstimateRow>
                        <EstimateNote>{data.additionalNotes || '추가 요청사항 없음'}</EstimateNote>
                      </>
                    );
                  })()}
                </EstimateCard>
              ) : (
                <p>{message.content}</p>
              )}
              <Timestamp>{formatTime(new Date(message.timestamp))}</Timestamp>
            </MessageBubble>
          </MessageWrapper>
        ))}
      </ChatContainer>

      <InputContainer>
        <InputWrapper>
          <ShareButton
            onClick={() => {
              const estimateText = JSON.stringify(estimateData, null, 2);
              sendMessage(estimateText, 'estimate');
            }}
          >
            견적서 공유
            <Image src="/icons/share.svg" alt="공유하기" width={24} height={24} />
          </ShareButton>

          <InputRow>
            <MessageInput type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="메시지를 입력하세요..." />
            <SendButton
              onClick={() => {
                if (newMessage.trim()) {
                  sendMessage(newMessage);
                }
              }}
            >
              <Image src="/icons/send.svg" alt="전송" width={20} height={20} />
            </SendButton>
          </InputRow>
        </InputWrapper>
      </InputContainer>
    </MobileLayout>
  );
}
