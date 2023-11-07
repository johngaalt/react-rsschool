export interface SearchTermProviderProps {
  children: React.ReactNode;
}

export interface SearchTermContextType {
  searchTerm: string;
  saveSearchData: (term: string) => void;
}
