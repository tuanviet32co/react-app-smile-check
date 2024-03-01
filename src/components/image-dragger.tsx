import { Button, Upload, notification } from 'antd';
import uploadPng from '../assets/upload.png';
import NiceModal from '@ebay/nice-modal-react';
import { WebcamModal } from './webcam/webcam-modal';
import { CameraRequestModal } from './modal/camera-request-modal';
import { beforeImageUpload, convertToBase64 } from '../utils/ui';
import { TResult, getSimulationData } from '../services/api';
import { AdditionalQuestionModal } from './modal/additional-question-modal';

const isMoreData = false;

const { Dragger } = Upload;

export type TResult2 = TResult & {
  beforeImage: string;
};

interface IProps {
  onFinished: (v: TResult2) => void;
  toggleProcessing: (v: boolean) => void;
}

export const ImageDragger = (props: IProps) => {
  const {
    onFinished,
    toggleProcessing,
  } = props;

  const uploadImage = async (file: any) => {
    try {
      toggleProcessing(true);
      const beforeImage = await convertToBase64(file);

      const formData = new FormData();
      formData.append('file', file);

      if (isMoreData) {
        const additionalQuestion: any = await NiceModal.show(AdditionalQuestionModal);
        formData.append('arches', additionalQuestion.arches);
      }

      const resData = await getSimulationData(formData);

      if (!resData) {
        notification.error({ message: `Sorry, the service is not working, please try again!` });
        toggleProcessing(false);
        return;
      }

      onFinished({ ...resData, beforeImage });
      toggleProcessing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageRequest = async ({ file }: any) => uploadImage(file);

  const customRequestWebcam = uploadImage;

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
          <div className="upload-text text-base">
            <div className='font-semibold text-[17px] text-slate-700'>Click or drag <span className='text-violet-700'>Intra oral</span> to this area to upload</div>{' '} or
            <Button type='link' onClick={handleTakePhotoClick} className="font-semibold text-lg text-violet-700 rounded">
              <span className='underline'>Take a photo</span>
            </Button>
          </div>
        </div>
      </Dragger>
    </div>
  );
};
