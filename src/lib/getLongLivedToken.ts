import axios from 'axios';

export async function getLongLivedToken(shortLivedToken: any) {
  const appId = '1348054419144924';
  const appSecret = '32097b7053c1b11c06b2e12ca2eff962';
  
  try {
    const response = await axios.get(`https://graph.facebook.com/v11.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`);
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch long-lived token:", error);
  }
}
