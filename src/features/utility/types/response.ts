export type PaginationResponse = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type GetResponse<T> = {
  data: T[];
  pagination: PaginationResponse;
};
