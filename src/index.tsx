import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela de APP',
          type: 'deposit',
          category: 'dev',
          amount: 7000,
          createdAt: new Date('2022-01-14 09:00:00'),
        },

        {
          id: 2,
          title: 'Alimentação',
          type: 'withdraw',
          category: 'comida',
          amount: 1200,
          createdAt: new Date('2022-01-14 10:30:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () =>{
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

