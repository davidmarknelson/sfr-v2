import { CloudinaryUploadedImage } from '@sfr/data-access/cloudinary';

export interface CloudinaryProgressResult {
  fileName?: string;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  progress: number;
  result: CloudinaryUploadedImage | null;
}
