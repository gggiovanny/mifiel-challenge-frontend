import { API_BASE_URL } from 'constants/apiUrls';
import { CreateDocumentPayload, DownloadDocumentParams } from 'types/documents';

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

export const getDownloadDocumentLink = (
  id: DownloadDocumentParams['id'],
  fileType: DownloadDocumentParams['fileType']
) => new URL(`documents/${id}/${fileType}`, API_BASE_URL).toString();
