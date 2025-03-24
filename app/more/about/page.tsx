'use client';

import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';
import Image from 'next/image';

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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  // margin-bottom: 3rem;
`;

const Logo = styled.div`
  width: 220px;
  height: 20px;
  position: relative;
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #495057;
`;

export default function AboutPage() {
  return (
    <MobileLayout>
      <Container>
        <PageHeader title="회사 소개" backUrl="/more" />

        <Content>
          <LogoContainer>
            <Logo>
              <Image src="/images/new_logo.png" alt="카페메이커 로고" fill priority />
            </Logo>
          </LogoContainer>

          <Section>
            <SectionTitle>회사 소개</SectionTitle>
            <Text>
              카페메이커는 카페 인테리어 견적 서비스를 제공하는 플랫폼입니다. 우리는 카페 창업을 준비하는 분들에게 최적의 인테리어 솔루션을 제공하고, 전문가와 소비자를 연결하여 양질의 서비스를
              제공합니다.
            </Text>
          </Section>

          <Section>
            <SectionTitle>연락처</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <Image src="/icons/phone.svg" alt="전화" width={20} height={20} />
                <span>02-1234-5678</span>
              </ContactItem>
              <ContactItem>
                <Image src="/icons/email.svg" alt="이메일" width={20} height={20} />
                <span>contact@cafemaker.com</span>
              </ContactItem>
              <ContactItem>
                <Image src="/icons/location.svg" alt="주소" width={20} height={20} />
                <span>서울특별시 강남구 테헤란로 123</span>
              </ContactItem>
            </ContactInfo>
          </Section>
        </Content>
      </Container>
    </MobileLayout>
  );
}
