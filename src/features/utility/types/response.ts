export type PaginationMetadata = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type GetPaginatedResponse<T> = {
  data: T[];
  pagination: PaginationMetadata;
};
