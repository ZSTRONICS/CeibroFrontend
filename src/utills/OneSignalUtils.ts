import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.showSlidedownPrompt();
  await OneSignal.showNativePrompt();
  await OneSignal.registerForPushNotifications();
}




export const InitOneSignal = async (userId: string) => {

  // await OneSignal.setExternalUserId(userId)

  // OneSignal.on('notificationDisplay', (event) => {
  //   // console.log('OneSignal notificationDisplay :', event);
  // });

  // OneSignal.on('popoverShown', (event) => {
  //   // console.log('OneSignal popoverShown :', event);
  // });
}

export const unSubOneSignal = async () => {
  // await OneSignal.removeExternalUserId();
}