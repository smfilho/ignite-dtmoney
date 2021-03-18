import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Website Job',
          type: 'deposit',
          category: 'Freelance',
          amount: 6000,
          createdAt: new Date('2021-01-30 11:00:00'),
        },
        {
          id: 2,
          title: 'Walmart',
          type: 'withdraw',
          category: 'Groceries',
          amount: 500,
          createdAt: new Date('2021-02-10 01:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
