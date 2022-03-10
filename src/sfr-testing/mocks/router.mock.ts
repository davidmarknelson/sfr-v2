import { of } from 'rxjs';

export class MockRouter {
  navigate = jest.fn().mockResolvedValue(true);
  get events() {
    return jest.fn().mockReturnValue(of({}));
  }
}
