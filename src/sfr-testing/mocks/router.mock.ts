export class MockRouter {
  navigate = jest.fn().mockResolvedValue(true);
}
