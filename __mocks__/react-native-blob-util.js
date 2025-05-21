export default {
    config: jest.fn(() => ({
      fetch: jest.fn(() =>
        Promise.resolve({
          path: () => 'mock-path',
        }),
      ),
    })),
    fs: {
      dirs: {
        DocumentDir: 'mock-dir',
      },
    },
  };
  