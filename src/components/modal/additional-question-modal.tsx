import { Button, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useState } from 'react';
import { ReactComponent as AcheupperSvg } from '../../assets/archeupper.svg';
import { ReactComponent as AchelowerSvg } from '../../assets/archelower.svg';
import { ReactComponent as ArchebothSvg } from '../../assets/archeboth.svg';

const ARCH_OPTIONS = [
  'Dual Arch - upper / lower',
  'Single arch - upper',
  'Single arch - lower'
];

const getInitialTreatmentType = () => {
  const storageValue = localStorage.getItem('treatmentType');
  return ARCH_OPTIONS.includes(storageValue as string) ? storageValue : ARCH_OPTIONS[0];
}

export const AdditionalQuestionModal = NiceModal.create(() => {
  const modal = useModal();
  const [value, setValue] = useState(getInitialTreatmentType());

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  }

  const handleSubmit = () => {
    modal.resolve({ arches: value });
    modal.hide();
  }

  return (
    <Modal
      open={modal?.visible}
      closeIcon={<Button className="bg-white" shape="circle" icon={<CloseOutlined />} size="middle" />}
      centered
      footer={null}
      closable={false}
      className={"nice-ant-modal mt-4"}
    >
      <div className="max-h-[70vh]">
        <div className="my-2 text-lg font-semibold text-darkBlueColor mb-4">Please select treatment type</div>
        <div className='ml-10'>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={ARCH_OPTIONS[0]} className='text-darkBlueColor hover:text-blue-700 hover:[&_svg]:fill-blue-700'>
                <div className='ml-3'><ArchebothSvg height={100} /></div>
                <div className='font-semibold text-base'>{ARCH_OPTIONS[0]}</div>
              </Radio>
              <Radio value={ARCH_OPTIONS[1]} className='text-darkBlueColor hover:text-blue-700 hover:[&_svg]:fill-blue-700'>
                <div className='ml-3'><AcheupperSvg /></div>
                <div className='font-semibold text-base'>{ARCH_OPTIONS[1]}</div>
              </Radio>
              <Radio value={ARCH_OPTIONS[2]} className='text-darkBlueColor hover:text-blue-700 hover:[&_svg]:fill-blue-700'>
                <div className='ml-3'><AchelowerSvg /></div>
                <div className='font-semibold text-base'>{ARCH_OPTIONS[2]}</div>
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="flex justify-center pb-4 pt-5">
          <Button className="w-40" onClick={handleSubmit} size="large">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
});
