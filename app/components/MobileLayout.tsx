'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';
// import IphoneHeader from './IphoneHeader';
import HomeBar from './HomeBar';

interface MobileLayoutProps {
  children: ReactNode;
  showHomeBar?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: white;
`;

const Content = styled.div<{ $showHomeBar: boolean }>`
  flex: 1;
  overflow-y: auto;
`;

export default function MobileLayout({ children, showHomeBar = true }: MobileLayoutProps) {
  return (
    <Container>
      {/* <IphoneHeader /> */}

      {/* 컨텐츠 영역 */}
      <Content $showHomeBar={showHomeBar}>{children}</Content>

      {showHomeBar && <HomeBar />}
    </Container>
  );
}
