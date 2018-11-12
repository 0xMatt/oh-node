import { Container, Web } from '../src/Kernel';
import app from '../../app/config/app';

describe('container', () => {



  it('can become constructed', () => {
    expect(new Container()).toBeInstanceOf(Container);
  });

  it('can add items to the container', () => {

  });
});