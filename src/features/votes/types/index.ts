interface GetRandomSubmissionResponse {
  id: string;
  imageUrl: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
  recipe: {
    id: string;
    name: string;
    imageUrl: string;
  };
}
