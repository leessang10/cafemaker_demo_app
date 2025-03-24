'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import MobileLayout from '../../../components/MobileLayout';
import PageHeader from '../../../components/PageHeader';
import { notices } from '../../../data/notices';

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const NoticeHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const NoticeTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NoticeDate = styled.div`
  font-size: 0.9rem;
  color: #adb5bd;
`;

const NoticeContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
  white-space: pre-line;
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1rem;
`;

export default function NoticeDetailPage() {
  const params = useParams();
  const notice = notices.find((n) => n.id === params.id);

  if (!notice) {
    return (
      <MobileLayout>
        <Container>
          <PageHeader title="공지사항" backUrl="/more/notices" />
          <Content>
            <NotFoundMessage>공지사항을 찾을 수 없습니다.</NotFoundMessage>
          </Content>
        </Container>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Container>
        <PageHeader title="공지사항" backUrl="/more/notices" />
        <Content>
          <NoticeHeader>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeDate>{notice.createdAt}</NoticeDate>
          </NoticeHeader>
          <NoticeContent>{notice.content}</NoticeContent>
        </Content>
      </Container>
    </MobileLayout>
  );
}
