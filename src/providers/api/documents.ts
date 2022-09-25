import { CreateDocumentPayload } from 'types/documents';

import apiRequest from './apiRequest';

export const getDocuments = () => apiRequest('/documents');

export const createDocumentFormData = (payload: CreateDocumentPayload) =>
  apiRequest('/documents', {
    method: 'POST',
    body: new URLSearchParams(payload),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
