import { type GetPaginatedResponse } from '../../utility/types/response';

export type GetSubmissionsRequestParams = {
  id?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  recipeId?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  page?: number;
  pageSize?: number;
};

export type GetSubmissionsResponse = GetPaginatedResponse<Submission>;

export type Submission = {
  id: string;
  imageUrl: string;
  status: string;
  userId: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  user: User;
  recipe: Recipe;
  votes: any[];
};

export type User = {
  id: string;
  nickName: string | null;
  name: string;
};

export type Recipe = {
  id: string;
  name: string;
  imageUrl: string;
};
