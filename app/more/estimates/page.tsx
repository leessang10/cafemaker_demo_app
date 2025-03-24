'use client';

import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';

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

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1rem;
`;

export default function EstimatesPage() {
  return (
    <MobileLayout>
      <Container>
        <PageHeader title="내 예상 견적서 목록" backUrl="/more" />

        <Content>
          <EmptyMessage>아직 작성된 예상 견적서가 없습니다.</EmptyMessage>
        </Content>
      </Container>
    </MobileLayout>
  );
}
