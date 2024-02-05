export type Response<TData> = {
  info: Info;
  results: TData;
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
};
