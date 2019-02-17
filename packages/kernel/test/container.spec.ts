import {  Container } from '../src';

describe('Container', () => {

  it('can add new items', () => {

    const container = new Container();
    container.add('dep', new Dependency('a')); 

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

  it('can locate dependencies', () => {
    const container = new Container();
    const dep = container.make(new Dependency('a'));

    const dep2 = container.make(DependantDependency); 
    expect(dep2.dep).toEqual(dep);
    console.log('dep2', dep2);
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

class DependantDependency {

  dep: Dependency;

  constructor(dep: Dependency) {
    this.dep = dep;
  }
}
