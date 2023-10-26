export interface Character {
  name: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
