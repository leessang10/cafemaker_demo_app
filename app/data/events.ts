import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: '여름 시즌 특별 이벤트',
    description: '여름 시즌을 맞아 특별한 메뉴와 함께 즐거운 시간을 보내세요!',
    imageUrl: 'https://loremflickr.com/g/320/240/cafe',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    isActive: true,
  },
  {
    id: '2',
    title: '신메뉴 출시 기념 이벤트',
    description: '새로운 시그니처 메뉴 출시를 기념하는 특별한 이벤트입니다.',
    imageUrl: 'https://loremflickr.com/g/320/240/cafe',
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    isActive: true,
  },
  {
    id: '3',
    title: '가을 시즌 프로모션',
    description: '가을의 특별한 맛과 향을 느낄 수 있는 시즌 메뉴가 출시됩니다.',
    imageUrl: 'https://loremflickr.com/g/320/240/cafe',
    startDate: '2024-09-01',
    endDate: '2024-11-30',
    isActive: false,
  },
];
