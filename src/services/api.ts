import axios from 'axios';

export const getAfterImage = async (beforeFile: any): Promise<string> => {
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