export interface ResponseDtoObject<T = any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}
