export interface Character {
  name: string;
  birth_year: string;
  eye_color: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
