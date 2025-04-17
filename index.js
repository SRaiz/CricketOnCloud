const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const {
  SF_CLIENT_ID,
  SF_USERNAME,
  SF_LOGIN_URL,
  SF_AUDIENCE,
  SF_PRIVATE_KEY
} = process.env;

async function getAccessToken() {
  const jwtPayload = {
    iss: SF_CLIENT_ID,
    sub: SF_USERNAME,
    aud: SF_AUDIENCE,
    exp: Math.floor(Date.now() / 1000) + 3 * 60
  };

  const token = jwt.sign(jwtPayload, SF_PRIVATE_KEY, { algorithm: 'RS256' });

  const res = await axios.post(`${SF_LOGIN_URL}/services/oauth2/token`, null, {
    params: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    }
  });

  return res.data.access_token;
}

app.post('/github-webhook', async (req, res) => {
  const eventType = req.headers['x-github-event'];
  console.log('Received GitHub Event:', eventType);

  try {
    const token = await getAccessToken();
    await axios.post(
      `${SF_LOGIN_URL}/services/apexrest/github/webhook`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-GitHub-Event': eventType
        }
      }
    );
    res.status(200).send('Forwarded to Salesforce');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    res.status(500).send('Failed to forward');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
