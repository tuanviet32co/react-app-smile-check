import { Button, notification, Upload } from 'antd';

import { ReactComponent as UploadSVG } from '../assets/Upload.svg';

import { DraggerProps } from 'antd/lib/upload';
import { CameraOutlined } from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import { WebcamModal } from './webcam/webcam-modal';
import { TFile } from './webcam/upload-webcam-capture';
import { v4 as uuidv4 } from 'uuid';
import { CameraRequestModal } from '../utils/CameraRequestModal';
import { beforeImageUpload } from '../utils/ui';
import cameraGif from '../assets/camera.gif'; // make sure the path is correct

// import { useGetSignedUrlMutation } from './services/api';
// import { s3Upload } from 'services/s3-api/endpoints';

const { Dragger } = Upload;

interface IProps extends Omit<DraggerProps, 'onChange'> {
  name: string;
  value?: any[];
  onChange?: (value: any[]) => void;
  publicUpload?: boolean;
  className?: string;
  isWebcamEnable?: boolean;
  isPatientSmileQuestionnaire?: boolean;
  onSave?: () => void;
}

export const ImageDragger = (props: IProps) => {
  const {
    name,
    onSave,
    ...rest
  } = props;

  const { value, onChange } = rest;

  // const { isLg, isMd } = useWindowSize();

  const handleSave = () => setTimeout(() => onSave?.(), 250);

  const handleFileChange = ({ fileList, file }: any) => {
    const { status, uid } = file;

    if (status === 'done') {
      const newList = fileList.map((f: any) => (f.uid === uid ? { ...f, url: f.response?.url } : f)) || [];
      onChange?.(newList);
      notification.success({
        message: `${file.name} file uploaded successfully.`,
        placement: 'topRight',
      });
      handleSave();
      return;
    }

    if (status === 'error') {
      const newList = (value || []).filter((f: any) => f.uid !== uid) || [];
      onChange?.(newList);
      notification.error({
        message: `Sorry ${file.name} didn't upload, please try again.`,
        placement: 'topRight',
      });
      return;
    }

    onChange?.(fileList);
  };

  const uploadImageRequest = async ({ file, filename, onProgress, onSuccess, onError }: any) => {
    const { name: keyName, type } = file;
    const supportedFileType = type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg';
    if (!supportedFileType) {
      return;
    }

    try {
      const filePayload = {
        fileName: keyName,
        mimeType: type,
        folderName: filename,
      };
      // const signedUrl = await getPublicSignedUrl(filePayload).unwrap();
      // await s3Upload(signedUrl.url, file, (percent: number) => onProgress({ percent }, file));
      const signedUrl: any = {};
      onSuccess({ url: signedUrl && signedUrl.url.split('?')[0] }, file);
    } catch (error) {
      onError(error);
    }
  };

  const customRequestWebcam = async (file: TFile): Promise<void> => {
    const { name: keyName, type } = file;

    if (file) {
      const filePayload = {
        ...file,
        name,
        filename: rest.id,
        url: null,
        uid: uuidv4(),
      };

      const uploadingData = [...(value || []), { ...filePayload, status: 'uploading' }];
      onChange?.(uploadingData);
      const fileData = {
        fileName: keyName,
        mimeType: type,
        folderName: rest.id!,
      };

      // const signedUrl = await getPublicSignedUrl(filePayload).unwrap();
      // await s3Upload(signedUrl.url, file, (percent: number) => onProgress({ percent }, file));
      const signedUrl: any = {};
      const url = signedUrl && signedUrl.url.split('?')[0];

      const fieldData = {
        ...filePayload,
        url,
        response: { url },
      };

      const newList = uploadingData?.map((f: any) => (f.uid === fieldData.uid ? fieldData : f)) || [];
      onChange?.(newList);
      notification.success({
        message: `${file.name} file uploaded successfully.`,
        placement: 'topRight',
      });
      handleSave();
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
    <>
      <div className="w-full max-w-xs gap-x-2">
        <Dragger
          name={name}
          multiple
          fileList={value || []}
          customRequest={uploadImageRequest}
          beforeUpload={beforeImageUpload}
          onChange={handleFileChange}
        >
          <div className="flex w-full items-center justify-center">
            <div className="mr-3 mt-1"><UploadSVG /></div>
            <div className="upload-text">
              <p className="text-left">
                Click or drag file to this area to upload
              </p>
              <div className="self-stretch">
                <Button onClick={handleTakePhotoClick} className="h-full rounded">
                  {/* <CameraOutlined style={{ fontSize: '20px' }} /> */}
                  <img src={cameraGif} style={{ fontSize: '20px' }} />
                  <div className="-mt-1 text-xs">Take a photo</div>
                </Button>
              </div>
            </div>
          </div>
        </Dragger>
      </div>
    </>
  );
};
