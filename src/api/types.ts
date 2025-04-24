export interface GetSampleResponse {
  message: string;
}

export interface PostSampleRequest {
  message: string;
}

export interface PostSampleResponse {
  message: string;
  data: PostSampleRequest;
}
