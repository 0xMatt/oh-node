module.exports = [
  {
    path: '/',
    action: (req, res) => {
      return 'Hello, World!';
    }
  },
  {
    path: '/foo',
    action: (req, res) => {
      return `You Foo...`;
    }
  },
  {
    path: '/controller',
    action: 'Controller@index'
  }
];

