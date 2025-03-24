'use client';

import Image from 'next/image';
import styled from 'styled-components';

const HeaderContainer = styled.div``;

const HeaderImage = styled(Image)`
  width: 100%;
`;

export default function IphoneHeader() {
  return (
    <HeaderContainer>
      <HeaderImage src="/icons/IphoneHeader.svg" alt="iPhone Status Bar" width={393} height={54} />
    </HeaderContainer>
  );
}
