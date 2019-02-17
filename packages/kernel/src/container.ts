export class Container {

  /**
   *
   */
  protected members: Array<any> = [];

  /**
   *
   * @param alias string
   * @param member any
   */
  add(alias: string, member: any): this {
    this.members[alias] = this.clone(member);

    return this;
  }

  /**
   * @param string alias
   */
  has(alias: string): boolean {
    return typeof this.members[alias] !== 'undefined';
  }

  /**
   * @param any member
   */
  make(member: string|object): any {

    const key: string = (typeof member === 'object') ? member.constructor.name : member;

    if (this.has(key)) {
      return this.build(this.members[key]);
    }

    if (typeof member === 'object') {
      this.members[key] = member;

      return member;
    }

    return this.locate(key, member);
  }

  /**
   *
   * @param member
   */
  protected build(member): any {
    if (typeof member === 'function') {
      return new member(this);
    }

    return member;
  }

  /**
   *
   * @param key
   * @param member
   */
  protected locate(key, member) {
    const aliases = this.members.filter(n => {

      let obj = n;
      if (typeof n === 'function') {
        obj = n(this);
      }

      return obj instanceof member;
    });

    this.members[key] = this.build(member);
    return this.members[key];
  }

  /**
   *
   * @param object
   */
  protected resolve(obj) {
    return new obj; 
  }

  private clone(obj) {
    return Object.assign(Object.create(obj), obj);
  }
}
