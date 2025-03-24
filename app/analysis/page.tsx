'use client';

import MobileLayout from '../components/MobileLayout';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: hidden;
`;

const AnalysisFrame = styled.iframe`
  width: 100vw;
  height: 100%;
  border: none;
  overflow: hidden;
`;

export default function AnalysisPage() {
  return (
    <MobileLayout showHomeBar={true}>
      <Container>
        <AnalysisFrame src="https://money-viewer.com/near-store/coffee-lab/address" allow="geolocation" />
      </Container>
    </MobileLayout>
  );
}
