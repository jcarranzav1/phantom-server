const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../server/api/User/user.model');
const Order = require('../server/api/Orders/orders.model');
const { mongodb_uri: uri, port } = require('../server/config');
const createApolloServer = require('./serverTest');
const Product = require('../server/api/Product/product.model');
const {
  initProducts, userData, userUpdate, adminData,
} = require('./helper');

let server = null;
let token = '';

beforeAll(async () => {
  server = await createApolloServer(port);
  // await Product.insertMany(initProducts);
  await mongoose.connect(uri);
});

afterAll(async () => {
  await User.deleteMany({});
  await Order.deleteMany({});
  await Product.deleteMany({});
  await mongoose.connection.close();
  await server.close();
});

describe('Test User Account: Register, Login and Edit', () => {
  test('Create User', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query:
          'mutation CreateUser($input: CreateAccountInput!) {createUser(input: $input) {firstName lastName email isAdmin}}',
        variables: {
          input: userData,
        },
      });
    expect(response.body.data.createUser).toEqual({
      firstName: 'Juan Diego',
      lastName: 'Carranza Vega',
      email: 'jcarranzav98@gmail.com',
      isAdmin: false,
    });
  });

  test('Login User', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query:
          'mutation LoginUser($input: LoginInput!){loginUser(input:$input){token user{firstName lastName email isAdmin}}}',
        variables: {
          input: { email: 'jcarranzav98@gmail.com', password: 'Juandiego#02' },
        },
      });
    token = response.body.data.loginUser.token;
    expect(token).toBeDefined();
    expect(token).not.toEqual('');
    expect(response.body.data.loginUser.user).toEqual({
      firstName: 'Juan Diego',
      lastName: 'Carranza Vega',
      email: 'jcarranzav98@gmail.com',
      isAdmin: false,
    });
  });
  test('Update Profile', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query:
          'mutation UpdateProfile($input: UpdateAccountInput!) {updateProfile(input: $input) {firstName lastName cellphone}}',
        variables: {
          input: userUpdate,
        },
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.data.updateProfile).toEqual({
      firstName: 'Carlos Manuel',
      lastName: 'Carranza',
      cellphone: '948023487',
    });
  });
});

describe('Create a products with admin account', () => {
  test('Create Admin', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query:
          'mutation CreateUser($input: CreateAccountInput!) {createUser(input: $input) {firstName lastName email isAdmin}}',
        variables: {
          input: adminData,
        },
      });
    expect(response.body.data.createUser).toEqual({
      firstName: 'Juan Diego',
      lastName: 'Carranza Vega',
      email: 'ps.jdcv.006474@gmail.com',
      isAdmin: true,
    });
  });
  test('Login Admin', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query:
          'mutation LoginUser($input: LoginInput!){loginUser(input:$input){token user{firstName lastName email isAdmin}}}',
        variables: {
          input: { email: 'ps.jdcv.006474@gmail.com', password: 'Juandiego#02' },
        },
      });
    token = response.body.data.loginUser.token;
    expect(token).toBeDefined();
    expect(token).not.toEqual('');
    expect(response.body.data.loginUser.user).toEqual({
      firstName: 'Juan Diego',
      lastName: 'Carranza Vega',
      email: 'ps.jdcv.006474@gmail.com',
      isAdmin: true,
    });
  });

  test('Create Product', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query: 'mutation($input: ProductInput!){addProduct(input: $input) {model price category}}',
        variables: {
          input: initProducts[0],
        },
      })
      .set('Authorization', `Bearer ${token}`);

    const response2 = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query: 'mutation($input: ProductInput!){addProduct(input: $input) {model price category}}',
        variables: {
          input: initProducts[1],
        },
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.data.addProduct).toEqual({
      model: 'Cougar Conquer',
      price: 450,
      category: 'pc_case',
    });
    expect(response2.body.data.addProduct).toEqual({
      model: 'Asus ROG Strix G513IH-HN006',
      price: 1030,
      category: 'laptop',
    });
  });
});

describe('Simulate to buy products and create order', () => {
  const id = [];

  test('Get all products', async () => {
    const response = await request(`http://localhost:${port}/api`).post('/').send({
      query: 'query Products {products {id model price category}}',
    });
    id.push(response.body.data.products[0].id);
    id.push(response.body.data.products[1].id);
    expect(response.body.data.products.length).toBe(2);
    expect(response.body.data.products[0].model).toBe('Cougar Conquer');
    expect(response.body.data.products[1].category).toBe('laptop');
    expect(response.body.data.products[1].price).toBe(1030);
  });

  test('Create Order', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query: 'mutation CreateOrder($input: OrderInput){createOrder(input: $input){amount}}',
        variables: {
          input: {
            products: [
              {
                quantity: 2,
                product: id[0],
              },
              {
                quantity: 10,
                product: id[1],
              },
            ],
            amount: 2000,
            billingAddress: {
              city: 'Trujillo',
              country: 'Perú',
              line1: 'Javier Heraud # 541. Urbanización Palermo',
              postalCode: '13006',
            },
          },
        },
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.data.createOrder.amount).toBe(2000);
  });

  test('Review Order', async () => {
    const response = await request(`http://localhost:${port}/api`)
      .post('/')
      .send({
        query: `{myOrders(page: ${1}, limit: ${5}) {amount products{quantity product{model price category}} billingAddress{city country postalCode line1}}}`,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const orderLength = response.body.data.myOrders.length;
    const orders = response.body.data.myOrders;
    expect(orders[orderLength - 1].amount).toBe(2000);
    expect(orders[orderLength - 1].products.length).toBe(2);
    expect(orders[orderLength - 1].products[0].quantity).toBe(2);
    expect(orders[orderLength - 1].products[1].quantity).toBe(10);
    expect(orders[orderLength - 1].products[0].product).toEqual({
      model: 'Cougar Conquer',
      price: 450,
      category: 'pc_case',
    });
    expect(orders[orderLength - 1].products[1].product).toEqual({
      model: 'Asus ROG Strix G513IH-HN006',
      price: 1030,
      category: 'laptop',
    });
  });
});

/* test('Create ', (done) => {
    request
      .post('/')
      .send({
        query: 'mutation CreateOrder($input: OrderInput){createOrder(input: $input){amount}}',
        variables: {
          input: {
            products: [
              {
                quantity: 2,
                product: '6212e040c4cbf6bdc9fa0125',
              },
              {
                quantity: 10,
                product: '6212e1a1c4cbf6bdc9fa0137',
              },
            ],
            amount: 2000,
            billingAddress: {
              city: 'Trujillo',
              country: 'Perú',
              line1: 'Javier Heraud # 541. Urbanización Palermo',
              postalCode: '13006',
            },
          },
        },
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.createOrder.amount).toBe(2000);
        done();
      });
  });
  test('Review Order', (done) => {
    request
      .post('/')
      .send({
        query: `{myOrders(page: ${1}, limit: ${5}) {amount products{quantity product{model price category}} billingAddress{city country postalCode line1}}}`,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        const orderLength = res.body.data.myOrders.length;
        const orders = res.body.data.myOrders;
        expect(orders[orderLength - 1].amount).toBe(2000);
        expect(orders[orderLength - 1].products.length).toBe(2);
        expect(orders[orderLength - 1].products[0].quantity).toBe(2);
        expect(orders[orderLength - 1].products[1].quantity).toBe(10);
        expect(orders[orderLength - 1].products[0].product.model).toBe('Cougar Conquer');
        expect(orders[orderLength - 1].products[0].product.price).toBe(450);
        expect(orders[orderLength - 1].products[0].product.category).toBe('pc_case');
        done();
      });
  }); */
