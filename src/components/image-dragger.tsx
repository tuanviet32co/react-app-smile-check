import { Button, notification, Upload } from 'antd';

import { ReactComponent as UploadSVG } from '../assets/Upload.svg';

// import { DraggerProps } from 'antd/lib/upload';
// import { CameraOutlined } from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import { WebcamModal } from './webcam/webcam-modal';
import { TFile } from './webcam/upload-webcam-capture';
// import { v4 as uuidv4 } from 'uuid';
import { CameraRequestModal } from '../utils/CameraRequestModal';
import { beforeImageUpload } from '../utils/ui';
import cameraGif from '../assets/camera.gif'; // make sure the path is correct
// import axios
// import { useGetSignedUrlMutation } from './services/api';
// import { s3Upload } from 'services/s3-api/endpoints';
import axios from 'axios';
import { useState } from 'react';

const { Dragger } = Upload;

interface IProps {
  onFinished: (v: [string, string]) => void;
}

export const ImageDragger = (props: IProps) => {
  const [base64, setBase64] = useState<string>('');

  const {
    onFinished,
  } = props;

  // const { isLg, isMd } = useWindowSize();

  const uploadImageRequest = async ({ file, onError }: any) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      axios.post('http://localhost:3001/upload', formData, {
        headers: {
          // Axios automatically sets the Content-Type to multipart/form-data, so this is optional
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader?.result as string || '');
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);
      axios.post('http://localhost:3001/upload', formData, {
        headers: {
          // Axios automatically sets the Content-Type to multipart/form-data, so this is optional
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        onFinished([base64, response.data]);
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });

      notification.success({
        message: `${file.name} file uploaded successfully.`,
        placement: 'topRight',
      });
    }
  };

  const checkCameraPermission = async (): Promise<boolean> => {
    try {
      const response = await navigator.mediaDevices.getUserMedia({ video: true });
      response?.getTracks().forEach((track) => {
        track.stop();
      });
      return true;
    } catch (error) {
      NiceModal.show(CameraRequestModal);
      return false;
    }
  };

  const handleTakePhotoClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const cameraPermission = await checkCameraPermission();

    if (cameraPermission) {
      NiceModal.show(WebcamModal, {
        customRequest: customRequestWebcam,
        isImgCrop: true,
      });
    }
  };

  return (
    <div className="w-full max-w-xs gap-x-2">
      <Dragger
        multiple
        customRequest={uploadImageRequest}
        beforeUpload={beforeImageUpload}
        maxCount={1}
      >
        <div className="flex w-full items-center justify-center">
          <div className="mr-3 mt-1"><UploadSVG /></div>
          <div className="upload-text">
            <p className="text-left">
              Click or drag file to this area to upload
            </p>
            <div className="self-stretch">
              <Button onClick={handleTakePhotoClick} className="h-full rounded">
                <img src={cameraGif} style={{ fontSize: '20px' }} alt='' />
                <div className="-mt-1 text-xs">Take a photo</div>
              </Button>
            </div>
          </div>
        </div>
      </Dragger>
    </div>
  );
};
