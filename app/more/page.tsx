'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import MobileLayout from '../components/MobileLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const ProfileSection = styled.div`
  padding: 1.5rem;
  background-color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f8f9fa;
  overflow: hidden;
  border: 2px solid #e9ecef;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #212529;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
`;

const EditProfileButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  background-color: white;
  color: #495057;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
  width: fit-content;

  &:hover {
    background-color: #f8f9fa;
    border-color: #dee2e6;
  }
`;

const MenuList = styled.div`
  background-color: white;
  border-radius: 8px;
  margin: 0 1rem;
  overflow: hidden;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  text-decoration: none;
  color: #212529;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const MenuIcon = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuText = styled.span`
  flex: 1;
  color: #212529;
  font-size: 0.95rem;
`;

const ArrowIcon = styled.span`
  color: #adb5bd;
  font-size: 1.2rem;
`;

export default function MorePage() {
  return (
    <MobileLayout>
      <Container>
        <ProfileSection>
          <ProfileImage>
            <Image src="/icons/default-profile.svg" alt="프로필" width={70} height={70} priority />
          </ProfileImage>
          <ProfileInfo>
            <UserName>사용자 님</UserName>
            <UserEmail>user@example.com</UserEmail>
            <EditProfileButton href="/more/profile">프로필 수정</EditProfileButton>
          </ProfileInfo>
        </ProfileSection>

        <MenuList>
          <MenuItem href="/more/estimates">
            <MenuIcon>
              <Image src="/icons/estimate.svg" alt="견적서" width={24} height={24} />
            </MenuIcon>
            <MenuText>내 예상 견적서 목록</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/notices">
            <MenuIcon>
              <Image src="/icons/notice.svg" alt="공지사항" width={24} height={24} />
            </MenuIcon>
            <MenuText>공지사항</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/events">
            <MenuIcon>
              <Image src="/icons/event.svg" alt="이벤트" width={24} height={24} />
            </MenuIcon>
            <MenuText>이벤트</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/notifications">
            <MenuIcon>
              <Image src="/icons/notification.svg" alt="알림" width={24} height={24} />
            </MenuIcon>
            <MenuText>알림 설정</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/privacy-policy">
            <MenuIcon>
              <Image src="/icons/privacy.svg" alt="개인정보" width={24} height={24} />
            </MenuIcon>
            <MenuText>개인정보처리방침</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/terms">
            <MenuIcon>
              <Image src="/icons/terms.svg" alt="약관" width={24} height={24} />
            </MenuIcon>
            <MenuText>서비스 이용약관</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/more/about">
            <MenuIcon>
              <Image src="/icons/company.svg" alt="회사" width={24} height={24} />
            </MenuIcon>
            <MenuText>회사 소개</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>

          <MenuItem href="/logout" style={{ color: '#dc3545' }}>
            <MenuIcon>
              <Image src="/icons/logout.svg" alt="로그아웃" width={24} height={24} />
            </MenuIcon>
            <MenuText style={{ color: '#dc3545' }}>로그아웃</MenuText>
            <ArrowIcon>›</ArrowIcon>
          </MenuItem>
        </MenuList>
      </Container>
    </MobileLayout>
  );
}
