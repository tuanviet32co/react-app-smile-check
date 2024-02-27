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