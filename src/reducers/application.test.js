import reducer from './application';

describe('Reducer', () => {
  it('throws an error with an unsupported type', () => {
    expect(() => {
      reducer('', { type: 'Non-existed', value: 1 });
    }).toThrow('Unsupported action type: Non-existed');
  });
});
