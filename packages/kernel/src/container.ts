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
    this.members[alias] = member;

    return this;
  }

  /**
   * @param string alias
   */
  has(alias: string): boolean {
    return this.members.indexOf(alias) >= -1;
  }

  /**
   * @param any member
   */
  make(member: any) {
    const key: string = (typeof member === 'object') ? member.constructor.name : member;

    if (this.members.indexOf(key) >= -1) {
      return this.build(this.members[member]);
    }

    if (typeof member === 'object') {
      return this.members[key] = member;
    }

    return this.locate(key, member);
  }

  /**
   *
   * @param member
   */
  protected build(member) {
    if (typeof member === 'function') {
      return member(this);
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

      let object = n;
      if (typeof n === 'function') {
        object = n(this);
      }

      return object instanceof member;
    });

    return this.members[key] = this.resolve(key);
  }

  /**
   *
   * @param object
   */
  protected resolve(object) {
    return new object;
  }
}
