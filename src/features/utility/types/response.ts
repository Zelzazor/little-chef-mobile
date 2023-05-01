export type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type GetPaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};
