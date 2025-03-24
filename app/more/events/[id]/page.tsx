'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import MobileLayout from '../../../components/MobileLayout';
import PageHeader from '../../../components/PageHeader';
import { events } from '../../../data/events';

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const EventImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const EventInfo = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #212529;
`;

const EventDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #495057;
`;

const EventDate = styled.div`
  font-size: 0.9rem;
  color: #adb5bd;
`;

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1rem;
`;

export default function EventDetailPage() {
  const params = useParams();
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <MobileLayout>
        <Container>
          <PageHeader title="이벤트 상세" backUrl="/more/events" />
          <Content>
            <NotFoundMessage>이벤트를 찾을 수 없습니다.</NotFoundMessage>
          </Content>
        </Container>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Container>
        <PageHeader title="이벤트 상세" backUrl="/more/events" />
        <Content>
          <EventImage>
            <Image src={event.imageUrl} alt={event.title} fill style={{ objectFit: 'cover' }} />
          </EventImage>
          <EventInfo>
            <EventTitle>{event.title}</EventTitle>
            <EventDescription>{event.description}</EventDescription>
            <EventDate>
              {event.startDate} ~ {event.endDate}
            </EventDate>
          </EventInfo>
        </Content>
      </Container>
    </MobileLayout>
  );
}
