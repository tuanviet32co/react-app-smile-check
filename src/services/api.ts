import axios from 'axios';
import { convertToBase64 } from '../utils/ui';
import { RESULT } from '../App';

const simulateApiCall = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}


export const getSimulationData = async (beforeFile: any, mock?: boolean): Promise<any> => {
  if (mock) {
    return await simulateApiCall(RESULT);
  }

  try {
    const formData = new FormData();
    formData.append('image', beforeFile);
    const res = await axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return `data:image/jpeg;base64,${res.data}`;
  } catch (error) {
    console.error(error);
    return '';
  }
}


export const getSimulationData2 = async (beforeFile: any): Promise<any> => {
  try {
    const beforeBase64 = await convertToBase64(beforeFile);
    const res = await axios.post('http://localhost:3001/upload', { image: beforeBase64 }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
