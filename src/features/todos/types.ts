export type Item = {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'All' | 'Active' | 'Completed';