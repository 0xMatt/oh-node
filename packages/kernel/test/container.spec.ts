import {  Container } from '../src';

describe('Container', () => {

  it('can add new item', () => {

    const container = new Container();
    container.add('dep', () => {
      return 'derp';
    });

    expect(container.has('dep')).toBeTruthy();
    expect(container.has('derp')).toBeFalsy();
  });

  it('resolves the same objects each call', () => {

    const container = new Container();
    const dep: Dependency = new Dependency('a');

    container.add('dep', dep);
    dep.change('b');

    expect(container.make('dep').data).toBe('a');
    expect(dep.data).toBe('b');
  });

});


class Dependency {
  data: any;

  constructor(data) {
    this.data = data;
  }

  change(data) {
    this.data = data;
  }
}

