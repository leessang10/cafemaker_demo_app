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
  padding: 1rem;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #212529;
  cursor: pointer;
`;

const ToggleSwitch = styled.input`
  position: relative;
  width: 50px;
  height: 24px;
  appearance: none;
  background-color: rgb(198, 198, 198);
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:checked {
    background-color: var(--primary-color);
  }

  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }

  &:checked:before {
    transform: translateX(26px);
  }
`;

export default function NotificationsPage() {
  return (
    <MobileLayout>
      <Container>
        <PageHeader title="알림 설정" backUrl="/more" />

        <Content>
          <NotificationItem>
            <NotificationLabel>
              <ToggleSwitch type="checkbox" defaultChecked />
              <span>이벤트 및 프로모션 알림</span>
            </NotificationLabel>
          </NotificationItem>

          <NotificationItem>
            <NotificationLabel>
              <ToggleSwitch type="checkbox" defaultChecked />
              <span>시스템 알림</span>
            </NotificationLabel>
          </NotificationItem>

          <NotificationItem>
            <NotificationLabel>
              <ToggleSwitch type="checkbox" defaultChecked />
              <span>마케팅 정보 수신</span>
            </NotificationLabel>
          </NotificationItem>
        </Content>
      </Container>
    </MobileLayout>
  );
}
