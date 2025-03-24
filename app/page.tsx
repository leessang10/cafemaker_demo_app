'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: white;
`;

const StatusBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
`;

const HomeBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding-bottom: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
`;

const NavText = styled.span`
  font-size: 0.75rem;
`;

export default function HomePage() {
  return (
    <Container>
      <StatusBar>
        <Image src="/icons/IphoneHeader.svg" alt="iPhone Status Bar" width={393} height={54} style={{ width: '100%' }} />
      </StatusBar>

      <HomeBar>
        <GridContainer>
          <Link href="/analysis">
            <NavItem>
              <Image src="/icons/analysis.svg" alt="상권분석" width={24} height={24} />
              <NavText>상권분석</NavText>
            </NavItem>
          </Link>
          <Link href="/estimate">
            <NavItem>
              <Image src="/icons/estimate.svg" alt="창업견적" width={24} height={24} />
              <NavText>창업견적</NavText>
            </NavItem>
          </Link>
          <Link href="/chat">
            <NavItem>
              <Image src="/icons/chat.svg" alt="창업문의" width={24} height={24} />
              <NavText>창업문의</NavText>
            </NavItem>
          </Link>
          <Link href="/more">
            <NavItem>
              <Image src="/icons/more.svg" alt="더보기" width={24} height={24} />
              <NavText>더보기</NavText>
            </NavItem>
          </Link>
        </GridContainer>
      </HomeBar>
    </Container>
  );
}
