'use client';

import { useState } from 'react';
import styled from 'styled-components';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';
import Image from 'next/image';

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const ProfileSection = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f8f9fa;
  overflow: hidden;
  border: 2px solid #e9ecef;
  position: relative;
`;

const ChangeImageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  background-color: white;
  color: #495057;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #dee2e6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  color: #212529;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #adb5bd;
  }
`;

const SaveButton = styled.button`
  padding: 1rem;
  background-color: #228be6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #1c7ed6;
  }
`;

export default function ProfilePage() {
  const [name, setName] = useState('사용자 님');
  const [email, setEmail] = useState('user@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 프로필 업데이트 로직 구현
    console.log('프로필 업데이트:', { name, email });
  };

  return (
    <MobileLayout>
      <Container>
        <PageHeader title="프로필 수정" backUrl="/more" />

        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage>
              <Image src="/icons/default-profile.svg" alt="프로필" width={120} height={120} priority />
            </ProfileImage>
            <ChangeImageButton>프로필 사진 변경</ChangeImageButton>
          </ProfileImageContainer>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이름</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
            </FormGroup>

            <FormGroup>
              <Label>이메일</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" />
            </FormGroup>

            <SaveButton type="submit">저장하기</SaveButton>
          </Form>
        </ProfileSection>
      </Container>
    </MobileLayout>
  );
}
