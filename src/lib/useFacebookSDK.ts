import { useEffect } from "react";

export const useFacebookSDK = () => {
 useEffect(() => {
   // Initialize the Facebook SDK
   window.fbAsyncInit = function() {
     FB.init({
       appId: '1348054419144924',
       xfbml: true,
       version: 'v18.0',
     });
     FB.AppEvents.logPageView();
   };
   
   // Create and Insert the SDK script element
   const scriptElement = document.createElement('script');
   scriptElement.id = 'facebook-jssdk';
   scriptElement.src = 'https://connect.facebook.net/en_US/sdk.js';
   const firstScriptElement = document.getElementsByTagName('script')[0];
   firstScriptElement.parentNode?.insertBefore(scriptElement, firstScriptElement);
 }, []);
};
