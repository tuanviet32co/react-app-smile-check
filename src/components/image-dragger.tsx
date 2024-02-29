import { Button, Upload } from 'antd';

import uploadPng from '../assets/upload.png';
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
      const before = await convertToBase64(file);
      const data = await getSimulationData(file);

      onFinished({ ...data, before });
      toggleProcessing(false);
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    if (file) {
      toggleProcessing(true);
      const before = await convertToBase64(file);
      const data = await getSimulationData(file);

      onFinished({ ...data, before });
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
    <div className="w-full gap-x-2 bg-white rounded-lg">
      <Dragger
        multiple
        customRequest={uploadImageRequest}
        beforeUpload={beforeImageUpload}
        maxCount={1}
        showUploadList={false}
      >
        <div className="flex w-full items-center justify-center">
          <div className="mr-3 mt-1"><img src={uploadPng} alt='' /></div>
          <div className="upload-text">
              Click or drag file to this area to upload{' '}
              <Button type='link' onClick={handleTakePhotoClick} className="font-semibold text-lg text-violet-700 rounded">
                <span className='underline'>Take a photo</span>
              </Button>
          </div>
        </div>
      </Dragger>
    </div>
  );
};
