import { AsyncStorage } from 'react-native';
import { isEmpty, isEmail, isPhoneNumber } from '../commons/Utils';

export async function setLastUpdateNotificationTime() {
  currentTime = new Date();
  try {
    await AsyncStorage.setItem(
      'last_update_notification_time',
      currentTime.toISOString()
    );
  } catch (error) {
    return { status: 'error', message: 'Save error' };
  }
}

export async function getLastUpdateNotificationTime() {
  return AsyncStorage.getItem('last_update_notification_time').then(
    last_update_notification_time => {
      if (isEmpty(last_update_notification_time)) {
        return null;
      } else {
        return new Date(last_update_notification_time);
      }
    }
  );
}

export async function deleteLastUpdateNotificationTime() {
  return AsyncStorage.removeItem('last_update_notification_time');
}

export function getHoursDifference(base, latest) {
  return (latest - base) / (1000 * 3600);
}
