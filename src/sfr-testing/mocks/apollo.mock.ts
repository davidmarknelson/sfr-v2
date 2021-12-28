export class MockApollo {
  client = {
    stop: jest.fn(() => {
      return;
    }),
    clearStore: jest.fn().mockResolvedValue(null),
  };
}
