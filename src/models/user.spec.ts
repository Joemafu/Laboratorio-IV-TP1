import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("mail", "pass")).toBeTruthy();
  });
});
