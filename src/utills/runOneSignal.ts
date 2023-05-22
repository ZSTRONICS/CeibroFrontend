import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.showSlidedownPrompt();
  await OneSignal.showNativePrompt();
  await OneSignal.registerForPushNotifications();
  // await OneSignal.init({ appId: '7ac7a441-9500-4f47-b370-c523db13de03',
  // safari_web_id: 'web.onesignal.auto.4d68c5e3-f56f-4052-bfb7-4c135295bfe6',

  // 53bac888-fbfe-483b-8746-73bdf9dc3663 //Local
  // 6b882cdf-7f71-46a0-a458-cda681fe770c //Dev
  //safari_web_id: 'web.onesignal.auto.4cc30974-98f9-47ba-8e02-4635d2d477f2' // dev
//   await OneSignal.init({ appId: '53bac888-fbfe-483b-8746-73bdf9dc3663',
//   allowLocalhostAsSecureOrigin: true,
//   requiresUserPrivacyConsent: false,
//   autoResubscribe: true
// });

}




export const  InitOneSignal = async (userId: string) => {

  await OneSignal.setExternalUserId(userId)

  OneSignal.on('notificationDisplay', (event) => {
    // console.log('OneSignal notificationDisplay :', event);
  });

  OneSignal.on('popoverShown', (event) => {
    // console.log('OneSignal popoverShown :', event);
  });
}

export const unSubOneSignal = async () => {
  await OneSignal.removeExternalUserId();
}



//   function handleNotificationDisplay(event:any) {
//     console.log('OneSignal notification displayed:', event);
  
//     // Update the UI to display the notification title and body
//     const notificationTitle = event.data.notification.title;
//     const notificationBody = event.data.notification.body;
  
//     const notificationElement = document.createElement('div');
//     notificationElement.innerHTML = `
//       <h3>${notificationTitle}</h3>
//       <p>${notificationBody}</p>
//     `;
//     document.body.appendChild(notificationElement);
//   }