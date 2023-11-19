export interface SidebarState {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  limit: number;
}

export interface FetchError {
  message: string;
}
