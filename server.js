/*
server.js – Configures the Plaid client and uses Express to defines routes that call Plaid endpoints in the Sandbox environment. Utilizes the official Plaid node.js client library to make calls to the Plaid API.
*/

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const {Configuration, PlaidApi, PlaidEnvironments} = require('plaid');

const app = express();
const port = 8080;

app.use(
  // FOR DEMO PURPOSES ONLY
  // Use an actual secret key in production
  session({secret: 'bosco', saveUninitialized: true, resave: true}),
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

//Creates a Link token and return it
app.post('/api/create_link_token', async (req, res, next) => {
  let payload = {};
  console.log('from create link token')
  console.log(req.body);
  //Payload if running iOS
  if (req.body.address === 'localhost') {
    payload = {
      user: {client_user_id: req.sessionID},
      client_name: 'Plaid Tiny Quickstart - React Native',
      language: 'en',
      products: ['auth'],
      country_codes: ['US'],
      redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    };
  } else {
    //Payload if running Android
    payload = {
      user: {client_user_id: req.sessionID},
      client_name: 'Plaid Tiny Quickstart - React Native',
      language: 'en',
      products: ['auth', 'identity', 'transactions', 'assets', 'liabilities'],
      country_codes: ['US'],
      android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME,
    };
  }
  const tokenResponse = await client.linkTokenCreate(payload);
  console.log(tokenResponse.data);
  res.json(tokenResponse.data);
});

// Exchanges the public token from Plaid Link for an access token
app.post('/api/exchange_public_token', async (req, res, next) => {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.access_token = exchangeResponse.data.access_token;
  res.json(true);

  console.log('----------------------------------------After Public Key Echange - Access Token----------------------------------------')
  console.log("Token: "+ req.session.access_token);
});

app.get('/api/useExistingToken', async (req, res, next) => {
  if (req.session.access_token == null) {
    const exchangeResponse = await client.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    req.session.access_token = exchangeResponse.data.access_token;
    res.json(true);
  } 
  else {
    res.json({
      "access_token": req.session.access_token
  });
  }   
});

// Fetches balance data using the Node client library for Plaid
app.post('/api/balance', async (req, res, next) => {
  const access_token = req.session.access_token;
  console.log('----------------------------------------Balance Access Token----------------------------------------')
  console.log(access_token);
  const balanceResponse = await client.accountsBalanceGet({access_token});
  res.json({
    Balance: balanceResponse.data,
  });
});

// Fetches balance data using the Node client library for Plaid
app.post('/api/identity', async (req, res, next) => {
  const access_token = req.session.access_token;
  console.log('----------------------------------------Identity Access Token----------------------------------------')
  console.log(access_token);
  const identityResponse = await client.identityGet({access_token});
  res.json({
    Identity: identityResponse.data,
  });
});

// Fetches balance data using the Node client library for Plaid
app.post('/api/investments/holdings/get', async (req, res, next) => {
  console.log("investments")
  const access_token = req.session.access_token;
  const investmentResponse = await client.investmentsHoldingsGet({access_token});
  res.json({
    Investments: investmentResponse.data,
  });
});

// Fetches Plaid products available to us
app.post('/api/item/get', async (req, res, next) => {
  const access_token = req.session.access_token;

  try {
    const itemResponse = await client.itemGet({access_token});
    res.json({
      item: itemResponse.data,
    });
  } catch (err) {
    console.log(err)
  }
  
});

// Fetches Plaid products available to us
app.post('/api/transactions/get', async (req, res, next) => {
  const access_token = req.session.access_token;
  
  const request = {
    access_token: access_token,  
    start_date: req.body.start_date,  
    end_date: req.body.end_date  
  };
  console.log("first transactionGet")

  const response = await client.transactionsGet(request);
  let transactions = response.data.transactions;
  const total_transactions = response.data.total_transactions;

  console.log("transactionGet loop")
  while (transactions.length < total_transactions) {
    const paginatedRequest = {
      access_token: access_token,
      start_date: req.body.start_date,  
      end_date: req.body.end_date,  
      options: {
        offset: transactions.length
      },
    };
    const paginatedResponse = await client.transactionsGet(paginatedRequest);
    transactions = transactions.concat(
      paginatedResponse.data.transactions,
    );
  }
  console.log("second transactionGet")

  res.json({
    transactions
  });
});

// Call liabilities endpoint
app.post('/api/liabilities', async (req, res, next) => {
  const access_token = req.session.access_token;

  try {
    const liabilitiesResponse = await client.liabilitiesGet({access_token});

    res.json({
      liability: liabilitiesResponse.data,
    });
  } catch (err) {
    console.log(err)
  }   
})

app.post('/api/itemRemove', async (req, res, next) => {
  const access_token = req.session.access_token;

  try {
    const response = await client.itemRemove({access_token});

    res.json({
      itemResponse: response.data,
    });   

  } catch (err) {
      console.log(err)
  }
})

// Listen for server start
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}...`);
});
