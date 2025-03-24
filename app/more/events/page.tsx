'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import MobileLayout from '../../components/MobileLayout';
import PageHeader from '../../components/PageHeader';
import { events } from '../../data/events';

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

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EventImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const EventInfo = styled.div`
  padding: 1rem;
`;

const EventTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #212529;
`;

const EventDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
`;

const EventDate = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #adb5bd;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1rem;
`;

export default function EventsPage() {
  const activeEvents = events.filter((event) => event.isActive);

  return (
    <MobileLayout>
      <Container>
        <PageHeader title="이벤트" backUrl="/more" />

        <Content>
          {activeEvents.length > 0 ? (
            <EventList>
              {activeEvents.map((event) => (
                <EventCard key={event.id} href={`/more/events/${event.id}`}>
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
                </EventCard>
              ))}
            </EventList>
          ) : (
            <EmptyMessage>진행 중인 이벤트가 없습니다.</EmptyMessage>
          )}
        </Content>
      </Container>
    </MobileLayout>
  );
}
