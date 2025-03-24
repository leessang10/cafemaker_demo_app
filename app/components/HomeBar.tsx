'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const BarContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding-bottom: 1.5rem;
  z-index: 2;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  color: ${(props) => (props.$active ? 'var(--primary-color)' : '#4B5563')};
`;

const NavText = styled.span`
  font-size: 0.75rem;
  text-decoration: none;
`;

export default function HomeBar() {
  const pathname = usePathname();

  return (
    <BarContainer>
      <GridContainer>
        <NavItem href="/analysis" $active={pathname === '/analysis'}>
          <Image src="/icons/analysis.svg" alt="상권분석" width={24} height={24} />
          <NavText>상권분석</NavText>
        </NavItem>
        <NavItem href="/estimate" $active={pathname === '/estimate'}>
          <Image src="/icons/estimate.svg" alt="창업견적" width={24} height={24} />
          <NavText>창업견적</NavText>
        </NavItem>
        <NavItem href="/chat" $active={pathname === '/chat'}>
          <Image src="/icons/chat.svg" alt="창업문의" width={24} height={24} />
          <NavText>창업문의</NavText>
        </NavItem>
        <NavItem href="/more" $active={pathname === '/more'}>
          <Image src="/icons/more.svg" alt="더보기" width={24} height={24} />
          <NavText>더보기</NavText>
        </NavItem>
      </GridContainer>
    </BarContainer>
  );
}
