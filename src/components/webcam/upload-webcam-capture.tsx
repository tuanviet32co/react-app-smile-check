/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/button-has-type */
import { Button, Spin } from 'antd';
import { useRef, useCallback, forwardRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidv4 } from 'uuid';

export type TFile = File & { uid: string };

const dataURLtoFile = (dataurl: string, filename: string): TFile => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file: any = new File([u8arr], filename, { type: mime });
  file.uid = uuidv4();
  return file as TFile;
};

type TUploadProps = {
  closeWebcamModal: () => void;
  customRequest: (file: TFile) => void;
};

export const UploadWebcamCapture = forwardRef<unknown, TUploadProps>(
  ({ closeWebcamModal, customRequest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imgCapture, setImgCapture] = useState<any>('');
    const webcamRef = useRef<any>(null);

    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgCapture(imageSrc);
    }, [webcamRef, setImgCapture]);

    const reTake = () => {
      setImgCapture('');
    };

    const save = () => {
      const file = dataURLtoFile(imgCapture, 'photo.jpeg');
      customRequest(file);
      closeWebcamModal && closeWebcamModal();
    };

    const handleUserMedia = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    };

    useEffect(() => {
      const lll = () => {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((response) => {
            response?.getTracks().forEach((track) => {
              track.stop();
            });
          })
          .catch((error) => console.log(error));
      };

      lll();
      setIsLoading(true);
    }, []);

    return (
      <div>
        {imgCapture ? (
          <img src={imgCapture} alt="" />
        ) : (
          <>
            {isLoading && (
              <div className="flex h-[400px] items-center justify-center">
                <Spin tip="Loading the camera..." />
              </div>
            )}
            <Webcam
              style={{ display: isLoading ? 'none' : 'block' }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              onUserMedia={handleUserMedia}
              className="rounded-lg"
            />
          </>
        )}
        <div className="mt-4 flex justify-center">
          {imgCapture ? (
            <div className="flex gap-3">
              <Button size="large" onClick={reTake}>
                Take another one
              </Button>
              <Button size="large" onClick={save}>
                Use this photo
              </Button>
            </div>
          ) : (
            <Button size="large" onClick={capture} disabled={isLoading}>
              Capture photo
            </Button>
          )}
        </div>
      </div>
    );
  },
);
