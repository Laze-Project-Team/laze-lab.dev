export const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
): unknown => fetch(input, init).then((res) => res.json());
