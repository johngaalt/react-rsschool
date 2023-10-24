export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchBarState {
  searchTerm: string;
}
