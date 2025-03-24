import { Notice } from '../types/notice';

export const notices: Notice[] = [
  {
    id: '1',
    title: '카페메이커 서비스 오픈 안내',
    content: '안녕하세요. 카페메이커 서비스가 정식 오픈되었습니다.\n\n새로운 서비스와 함께 더 나은 경험을 제공하도록 하겠습니다.\n\n감사합니다.',
    createdAt: '2024-03-15',
    isImportant: true,
    isPinned: true,
  },
  {
    id: '2',
    title: '시스템 점검 안내',
    content: '2024년 3월 20일 새벽 2시부터 4시까지 시스템 점검이 있을 예정입니다.\n\n점검 시간 동안 서비스 이용이 제한될 수 있습니다.\n\n불편을 드려 죄송합니다.',
    createdAt: '2024-03-18',
    isImportant: true,
    isPinned: false,
  },
  {
    id: '3',
    title: '이용약관 개정 안내',
    content: '2024년 4월 1일부터 적용되는 이용약관이 개정되었습니다.\n\n주요 변경사항:\n- 개인정보 처리방침 업데이트\n- 서비스 이용 규칙 변경\n\n자세한 내용은 이용약관을 참고해 주시기 바랍니다.',
    createdAt: '2024-03-10',
    isImportant: false,
    isPinned: false,
  },
];
