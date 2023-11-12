export interface Details {
  name: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  url: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
