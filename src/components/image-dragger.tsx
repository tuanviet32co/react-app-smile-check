import { Button, Upload } from 'antd';

import { ReactComponent as UploadSVG } from '../assets/Upload.svg';
import NiceModal from '@ebay/nice-modal-react';
import { WebcamModal } from './webcam/webcam-modal';
import { TFile } from './webcam/upload-webcam-capture';
import { CameraRequestModal } from '../utils/CameraRequestModal';
import { beforeImageUpload, convertToBase64 } from '../utils/ui';
import cameraGif from '../assets/camera.gif'; // make sure the path is correct
import { getAfterImage } from '../services/api';

const { Dragger } = Upload;

const getImageHeight = async (file: any): Promise<number> => {
  return new Promise((resolve, reject) => {
    // Create a new FileReader object
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = (event) => {
      // Create a new Image object
      const img = new Image();

      // Set the onload event handler for the Image object
      img.onload = () => {
        // Resolve the promise with the width and height of the image
        resolve(img.height);
      };

      // Set the onerror event handler for the Image object
      img.onerror = reject;

      // Set the image source to the result of the FileReader's read action
      img.src = event?.target?.result as any;
    };

    // Set the onerror event handler for the FileReader object
    reader.onerror = reject;

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
}

interface IProps {
  onFinished: (v: [string, string]) => void;
  toggleProcessing: (v: number) => void;
}

export const ImageDragger = (props: IProps) => {
  // const { isLg, isMd } = useWindowSize();
  const {
    onFinished,
    toggleProcessing,
  } = props;

  const uploadImageRequest = async ({ file, onError }: any) => {
    try {
      const height = await getImageHeight(file);
      toggleProcessing(height);
      const data = await Promise.all([
        convertToBase64(file),
        getAfterImage(file),
      ]);

      onFinished(data);
      toggleProcessing(0);
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    if (file) {
      const height = await getImageHeight(file);
      toggleProcessing(height);
      const data = await Promise.all([
        convertToBase64(file),
        getAfterImage(file),
      ]);

      onFinished(data);
      toggleProcessing(0);
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
        showUploadList={false}
      >
        <div className='absolute'>
          <Button className="flex w-full items-center justify-center bg-white space-x-2 px-2 h-[40px]">
            <div className="text-lg">
              Upload your file
            </div>
            <div><UploadSVG height={22} width={22} /></div>
          </Button>
          <li className='absolute text-lg text-white font-semibold left-[79%] top-[45px]'>OR</li>
          <Button
            onClick={handleTakePhotoClick}
            className="h-full rounded flex items-center bg-white text-black space-x-2 m-x-0 pl-2 pr-3 left-[74%] top-[40px]"
          >
            <div className="text-lg">Take a photo</div>
            <img src={cameraGif} height="30px" width="30px" alt='' />
          </Button>
        </div>
      </Dragger>
    </div>
  );
};
