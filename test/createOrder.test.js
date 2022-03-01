const baseUrl = 'https://ecommerce-mir.herokuapp.com/api';
const request = require('supertest')(baseUrl);
const { connect, disconnect } = require('../server/database');

const User = require('../server/api/User/user.model');

describe('Create a order', () => {
  let token = '';

  beforeAll(async () => {
    connect(
      'mongodb+srv://admin:Juandiego02@cluster0.8ct9q.mongodb.net/ecommerceDatabase-test?retryWrites=true&w=majority',
    );
  });
  afterAll(async () => {
    await User.deleteMany({});
    disconnect();
  });

  test('Login User', (done) => {
    request
      .post('/')
      .send({
        query:
          'mutation LoginUser($input: LoginInput!){loginUser(input:$input){token user{firstName lastName email isAdmin}}}',
        variables: {
          input: { email: 'ps.jdcv.006474@gmail.com', password: 'Juandiego#02' },
        },
      })

      .end((err, res) => {
        token = res.body.data.loginUser.token;
        expect(token).toBeDefined();
        expect(token).not.toEqual('');
        expect(res.body.data.loginUser.user).toEqual({
          firstName: 'Carlos Manuel',
          lastName: 'Carranza Vega',
          email: 'ps.jdcv.006474@gmail.com',
          isAdmin: false,
        });
        done();
      });
  });

  test('Create ', (done) => {
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
  });
});
