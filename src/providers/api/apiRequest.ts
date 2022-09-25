import { API_BASE_URL } from 'constants/apiUrls';
import { ErrorResponse } from 'types/errors';

export class ResponseError extends Error {
  statusCode: number | undefined = undefined;
  messages: string[] | undefined = undefined;

  constructor({ error, message, statusCode }: ErrorResponse) {
    super(typeof message === 'string' ? message : message.join(', '));

    this.statusCode = statusCode;
    if (typeof message !== 'string') this.messages = message;
  }
}

export default async (route: string, config?: RequestInit) => {
  const url = new URL(route, API_BASE_URL);
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    const responseError = new ResponseError(data);
    throw responseError;
  }

  return data;
};
