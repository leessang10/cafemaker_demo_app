'use client';

import styled from 'styled-components';
import Link from 'next/link';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';
import { notices } from '../../data/notices';

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoticeItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const NoticeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #212529;
`;

const NoticeDate = styled.div`
  font-size: 0.8rem;
  color: #adb5bd;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1rem;
`;

export default function NoticesPage() {
  const sortedNotices = [...notices].sort((a, b) => {
    // 상단 고정 공지사항을 먼저 정렬
    if (a.isPinned !== b.isPinned) {
      return b.isPinned ? 1 : -1;
    }
    // 그 다음 최신순 정렬
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const pinnedNotices = sortedNotices.filter((notice) => notice.isPinned);
  const regularNotices = sortedNotices.filter((notice) => !notice.isPinned);

  return (
    <MobileLayout>
      <Container>
        <PageHeader title="공지사항" backUrl="/more" />

        <Content>
          {sortedNotices.length > 0 ? (
            <NoticeList>
              {pinnedNotices.length > 0 && (
                <>
                  {pinnedNotices.map((notice) => (
                    <NoticeItem key={notice.id} href={`/more/notices/${notice.id}`}>
                      <NoticeTitle>{notice.title}</NoticeTitle>
                      <NoticeDate>{notice.createdAt}</NoticeDate>
                    </NoticeItem>
                  ))}
                </>
              )}

              {regularNotices.length > 0 && (
                <>
                  {regularNotices.map((notice) => (
                    <NoticeItem key={notice.id} href={`/more/notices/${notice.id}`}>
                      <NoticeTitle>{notice.title}</NoticeTitle>
                      <NoticeDate>{notice.createdAt}</NoticeDate>
                    </NoticeItem>
                  ))}
                </>
              )}
            </NoticeList>
          ) : (
            <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>
          )}
        </Content>
      </Container>
    </MobileLayout>
  );
}
