import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { TFile, UploadWebcamCapture } from './upload-webcam-capture';
import { Modal } from 'antd';

type TProps = {
  customRequest: (file: TFile) => void;
};

export const WebcamModal = NiceModal.create<TProps>(({ customRequest }) => {
  const modal = useModal();

  const closeWebcamModal = () => {
    modal.hide();
  };

  return (
    <Modal open={modal.visible} width={650} onCancel={closeWebcamModal} maskClosable={false} footer={null} destroyOnClose>
      <div>
        <div className="mb-4 text-lg font-bold text-darkBlueColor">Take your photo</div>
        <UploadWebcamCapture customRequest={customRequest} closeWebcamModal={closeWebcamModal} />
      </div>
    </Modal>
  );
});
