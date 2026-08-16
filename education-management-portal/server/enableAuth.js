const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

async function enableEmailPassword() {
  try {
    const keyPath = path.join(__dirname, 'serviceAccountKey.json');
    const auth = new GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    const projectId = 'buitdathon-app';
    const url = `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config?updateMask=signIn.email.enabled`;

    console.log('Sending request to Identity Toolkit API to enable Email/Password auth...');
    
    // We update the signIn.email.enabled flag to true
    const res = await axios.patch(url, {
      signIn: {
        email: {
          enabled: true,
          passwordRequired: true
        }
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Success! Email/Password Authentication is now enabled on the project.');
  } catch (error) {
    if (error.response) {
      console.error('API Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

enableEmailPassword();
