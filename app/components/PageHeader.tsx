'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #212529;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

interface PageHeaderProps {
  title: string;
  backUrl: string;
}

export default function PageHeader({ title, backUrl }: PageHeaderProps) {
  return (
    <Header>
      <BackButton href={backUrl}>
        <Image src="/icons/back.svg" alt="뒤로가기" width={24} height={24} />
      </BackButton>
      <Title>{title}</Title>
    </Header>
  );
}
