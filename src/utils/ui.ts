import { notification } from 'antd';

export const beforeImageUpload = (file: any): boolean => {
  const supportedFileType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!supportedFileType) {
    notification.error({
      message: 'Sorry, we can only accept JPG, PNG or JPEG files',
      placement: 'topRight',
    });
    return false;
  }

  return true;
};

export const convertToBase64 = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};