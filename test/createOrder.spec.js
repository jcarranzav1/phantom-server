const baseUrl = 'https://ecommerce-mir.herokuapp.com/api';

const request = require('supertest')(baseUrl);
const { connect, disconnect } = require('../server/database');
const { database } = require('../server/config');

const User = require('../server/api/User/user.model');

describe('Users', () => {
  const userData = {
    firstName: 'Juan Diego',
    lastName: 'Carranza Vega',
    email: 'jcarranzav1@hotmail.com',
    password: 'Juandiego#02',
    confirmPassword: 'Juandiego#02',
  };

  let token = '';

  beforeAll(async () => {
    connect({
      protocol: database.protocol,
      url: database.urlTest,
      username: database.username,
      password: database.password,
    });

    request
      .post('/')
      .send({
        query: 'mutation CreateUser($input: CreateAccountInput!){createUser(input:$input){id}}',
        variables: {
          input: userData,
        },
      })
      .end((err, res) => {
        console.log(res.body);
      });

    request
      .post('/')
      .send({
        query: 'mutation LoginUser($input: LoginInput!){loginUser(input:$input){token}}',
        variables: {
          input: { email: 'jcarranzav1@hotmail.com', password: 'Juandiego#02' },
        },
      })
      // eslint-disable-next-line consistent-return
      .end((err, res) => {
        token = res.body.data.loginUser;
        console.log(res.body);
        expect(token).toBeDefined();
        expect(token).not.toEqual('');
      });
  });

  afterAll(async () => {
    await User.deleteMany({});
    disconnect();
  });

  test('Create Order', async () => {
    console.log(token);
  });
});
