import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v18.0';
export const APP_ID = '1348054419144924';
const APP_SECRET = '32097b7053c1b11c06b2e12ca2eff962';


const getAppAccessToken = async () => {
 const response = await fetch(
  `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
 );
 const data : { access_token: string }= await response.json();

 if (!response.ok) {
  console.log("error getting acces token:", response.status, data)
  throw new Error("acces token failed");
 }

 return data.access_token;
}

const debugToken = async (appAccessToken: string, token: string) => {
 const response = await fetch(
  `${FACEBOOK_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appAccessToken}`
 );
 const data: { data: { scopes: string[] } }= await response.json();

 if (!response.ok) {
  throw new Error("debug token debug failed");
 }

 return data.data.scopes;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (typeof req.query.token === 'string') {
 const appAccessToken = await getAppAccessToken();

 const scopes = await debugToken(appAccessToken, req.query.token)

 console.log(scopes);

 res.json({ scopes });
} else {
 res.status(400).json({ error: 'Invalid token' });
}}