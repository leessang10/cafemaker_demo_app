export interface Event {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ENDED' | 'DELETED';
  createdAt: string;
  updatedAt: string;
}

export interface EventListResponse {
  list: Event[];
  count: number;
}
