import type { DocumentData } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export const timestampToDate = <T>(data: T): DocumentData | T => {
  if (data == null) {
    return data;
  } else if (data instanceof Timestamp) {
    return data.toDate();
  } else if (Array.isArray(data)) {
    return data.map(timestampToDate);
  } else if (data.constructor === Object) {
    const converted: DocumentData = {};
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        converted[key] = timestampToDate(data[key]);
      }
    }
    return converted;
  } else {
    return data;
  }
};
