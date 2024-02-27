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

interface IProps {
  onFinished: (v: [string, string]) => void;
}

export const ImageDragger = (props: IProps) => {
  // const { isLg, isMd } = useWindowSize();
  const {
    onFinished,
  } = props;

  const uploadImageRequest = async ({ file, onError }: any) => {
    try {
      const data = await Promise.all([
        convertToBase64(file),
        getAfterImage(file),
      ]);

      onFinished(data);
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    if (file) {
      const data = await Promise.all([
        convertToBase64(file),
        getAfterImage(file),
      ]);

      onFinished(data);
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
        <div className="flex w-full items-center justify-center">
          <div className="mr-3 mt-1"><UploadSVG /></div>
          <div className="upload-text">
            <p className="text-left text-white">
              Click or drag file to this area to upload
            </p>
          </div>
        </div>
        <div className="self-stretch">
          <Button onClick={handleTakePhotoClick} className="h-full rounded">
            <img src={cameraGif} height="20px" width="20px" alt='' />
            <div className="-mt-1 text-base text-white">Take a photo</div>
          </Button>
        </div>
      </Dragger>
    </div>
  );
};
