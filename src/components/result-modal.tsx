import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import { SmilePreviewComponent } from './smile-preview/smile-preview';

type TProps = {
  result: any;
};

export const ResultModal = NiceModal.create<TProps>(({ result }) => {
  const modal = useModal();

  const closeWebcamModal = () => {
    modal.hide();
  };

  return (
    <Modal open={modal.visible} width={650} onCancel={closeWebcamModal} maskClosable={false} footer={null} destroyOnClose>
      <div>
        <div className="mb-4 text-lg font-bold text-darkBlueColor">Your result</div>
        <div className=''>
          <div className='font-semibold mb-2'>Case details:</div>
          <div className='grid grid-cols-12 mb-3'>
            <div className='col-span-4'>Complexity</div>
            <div className='col-span-4'>Mild</div>
            <div className='col-span-4'>Expected Length of Treatment</div>
            <div className='col-span-4'>eavdsee</div>
            <div className='col-span-4'>Arches in treatment</div>
            <div className='col-span-4'>Dual Arch - upper / lower</div>
            <div className='col-span-4'>Total Stages</div>
            <div className='col-span-4'>1</div>
            <div className='col-span-4'>IPR</div>
            <div className='col-span-4'>No</div>
            <div className='col-span-4'>Attachments</div>
            <div className='col-span-4'>No</div>
            <div className='col-span-4'>Auxiliaries</div>
            <div className='col-span-4'>No</div>
          </div>
          <div className='font-semibold mb-2'>Simulation:</div>
          <SmilePreviewComponent url={result.toothAnimationUrl} />
        </div>
      </div>
    </Modal>
  );
});
