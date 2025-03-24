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
  padding: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #495057;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function TermsPage() {
  return (
    <MobileLayout>
      <Container>
        <PageHeader title="서비스 이용약관" backUrl="/more" />

        <Content>
          <Section>
            <SectionTitle>1. 서비스 이용약관의 목적</SectionTitle>
            <Text>본 약관은 카페메이커(이하 &quot;회사&quot;)가 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</Text>
          </Section>

          <Section>
            <SectionTitle>2. 서비스의 이용</SectionTitle>
            <Text>회사는 이용자에게 카페 인테리어 견적 서비스, 상담 서비스 등을 제공합니다. 이용자는 본 약관에 동의하고 회사가 정한 절차에 따라 서비스 이용을 신청하여야 합니다.</Text>
          </Section>

          <Section>
            <SectionTitle>3. 이용자의 의무</SectionTitle>
            <Text>이용자는 다음 행위를 해서는 안 됩니다:</Text>
            <Text>- 서비스의 정상적인 운영을 방해하는 행위</Text>
            <Text>- 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통하는 행위</Text>
            <Text>- 다른 이용자의 개인정보를 수집, 저장, 공개하는 행위</Text>
          </Section>
        </Content>
      </Container>
    </MobileLayout>
  );
}
