export const checkNotificationSupport = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return false;
    }
    console.log('Notifications are supported in this browser.');
    return true;
  };
  
  export const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log(`Notification permission status: ${permission}`);
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied'; 
    }
  };
  
  export const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      console.log('Showing notification:', title, body);
      new Notification(title, { body });
    } else {
      console.log('Notification permission is not granted.');
    }
  };
  
  export const initializeNotification = async () => {
    if (checkNotificationSupport()) {
      const permission = await requestNotificationPermission();
      if (permission !== 'granted') {
        console.log('Notification permission is denied.');
      } else {
        console.log('Notification permission is granted.');
      }
    }
  };
  