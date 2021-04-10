// Needed for getting token from the request in middleware.ts
declare namespace Express {
  interface Request {
    token?: string;
  }
}
