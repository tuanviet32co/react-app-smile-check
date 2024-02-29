import { Button, Upload } from 'antd';

import { ReactComponent as UploadSVG } from '../assets/Upload.svg';
import NiceModal from '@ebay/nice-modal-react';
import { WebcamModal } from './webcam/webcam-modal';
import { TFile } from './webcam/upload-webcam-capture';
import { CameraRequestModal } from '../utils/CameraRequestModal';
import { beforeImageUpload, convertToBase64 } from '../utils/ui';
import { getSimulationData } from '../services/api';
import { CameraOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface IProps {
  onFinished: (v: [string, string]) => void;
  toggleProcessing: (v: boolean) => void;
}

export const ImageDragger = (props: IProps) => {
  // const { isLg, isMd } = useWindowSize();
  const {
    onFinished,
    toggleProcessing,
  } = props;

  const uploadImageRequest = async ({ file, onError }: any) => {
    try {
      toggleProcessing(true);
      const data = await Promise.all([
        convertToBase64(file),
        getSimulationData(file),
      ]);

      onFinished(data);
      toggleProcessing(false);
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    if (file) {
      toggleProcessing(true);
      const data = await Promise.all([
        convertToBase64(file),
        getSimulationData(file),
      ]);

      onFinished(data);
      toggleProcessing(false);
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
        <div className="flex w-full items-center justify-center text-white">
          <div className="mr-3 mt-1"><UploadSVG /></div>
          <div className="upload-text">
            <p className="text-left">
              Click or drag file to this area to upload{' '}
            </p>
            <div className="self-stretch">
              <Button onClick={handleTakePhotoClick} className="h-full rounded">
                <CameraOutlined style={{ fontSize: '20px' }} />
                <div className="-mt-1 text-xs text-white">Take a photo</div>
              </Button>
            </div>
          </div>
        </div>
      </Dragger>
    </div>
  );
};
