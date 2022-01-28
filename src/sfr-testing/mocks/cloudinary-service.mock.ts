import { initialCloudinaryState } from '@sfr/shared/utils/constants';
import { of } from 'rxjs';

export class MockCloudinaryService {
  uploadImage$ = jest.fn().mockReturnValue(of(initialCloudinaryState));
  deleteImageByToken$ = jest.fn().mockReturnValue(of({ result: 'ok' }));
}
