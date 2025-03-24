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

export default function PrivacyPolicyPage() {
  return (
    <MobileLayout>
      <Container>
        <PageHeader title="개인정보처리방침" backUrl="/more" />

        <Content>
          <Section>
            <SectionTitle>1. 개인정보의 수집 및 이용 목적</SectionTitle>
            <Text>카페메이커는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.</Text>
            <Text>- 필수항목: 이름, 이메일 주소, 전화번호 - 선택항목: 프로필 이미지, 주소</Text>
          </Section>

          <Section>
            <SectionTitle>2. 개인정보의 보유 및 이용기간</SectionTitle>
            <Text>회원 탈퇴 시까지 개인정보를 보유하며, 탈퇴 시 즉시 파기됩니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 동안 보관됩니다.</Text>
          </Section>

          <Section>
            <SectionTitle>3. 개인정보의 파기</SectionTitle>
            <Text>회원 탈퇴 시 개인정보는 즉시 파기되며, 전자적 파일 형태로 저장된 개인정보는 복구 및 재생이 불가능한 방법으로 영구 삭제됩니다.</Text>
          </Section>
        </Content>
      </Container>
    </MobileLayout>
  );
}
