import { Popover, Typography } from 'antd';
import { SmilePreviewComponent } from './smile-preview/smile-preview';
import { NiceCollapse } from './nice-collapse/nice-collapse';
import { ViewItem } from './view-item/view-item';
import { Chip } from './chip/chip';
import { FlagTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';

export const archesInTreatmentType = {
  archDual: 'Dual Arch - upper / lower',
  archUpper: 'Single arch - upper',
  archLower: 'Single arch - lower',
};

const ArchDiffFlag = () => (
  <div>
    <FlagTwoTone twoToneColor="#4133c5" />
    <Typography.Text className="ml-1 !text-sm font-normal text-midBlueColor">
      Arch stages differ - Double-check numbers
    </Typography.Text>
  </div>
);

const SingleArchPopover = () => (
  <Popover
    content="Please note: if your case is a single arch treatment case you will still receive 1 retainer for the opposing arch"
    title="Single Arch Cases"
    trigger="click"
    overlayClassName="w-80"
  >
    <InfoCircleOutlined className="vertical-align-middle ml-1" style={{ fontSize: 18 }} />
  </Popover>
);


type TProps = {
  result: any;
};

export const ResultComponent: FC<TProps> = ({ result }) => {
  const { treatmentDesign, toothAnimationUrl, beforeImage } = result;
  const isArchStageDiff =
    treatmentDesign?.arches === archesInTreatmentType.archDual &&
    treatmentDesign?.upperStageNumber !== treatmentDesign?.lowerStageNumber;

  return (
    <div>
      <div className='font-semibold mt-4 mb-2'>Simulation:</div>
      <SmilePreviewComponent url={toothAnimationUrl} />
      <div className='flex mt-7 space-x-4'>
        <div>
          <div className='mb-3'>Your uploaded photo</div>
          <img src={beforeImage} alt="" className='h-[200px]' />
        </div>
        <div>
          <div className='mb-3'>Matched photo</div>
          <img src={treatmentDesign?.images[0]} className='h-[200px] ' alt="" />
        </div>
      </div>
      <NiceCollapse title="Treatment Design" open className='mt-7'>
        <div className="border-0 border-t border-solid border-gray-100 py-4 px-2 ">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="Arches in treatment">{treatmentDesign?.arches}</ViewItem>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="Total steps">{treatmentDesign?.totalSteps}</ViewItem>
            </div>
            <div className="col-span-12">
              <ViewItem
                title={
                  <div className="flex items-center gap-1">
                    No. of Upper Aligners{' '}
                    {treatmentDesign?.arches === archesInTreatmentType.archLower && <SingleArchPopover />}
                    {isArchStageDiff && <ArchDiffFlag />}
                  </div>
                }
              >
                {treatmentDesign?.upperStageNumber}{' '}
              </ViewItem>
            </div>
            <div className="col-span-12">
              <ViewItem
                title={
                  <div className="flex items-center gap-1">
                    No. of Lower Aligners{' '}
                    {treatmentDesign?.arches === archesInTreatmentType.archUpper && <SingleArchPopover />}
                    {isArchStageDiff && <ArchDiffFlag />}
                  </div>
                }
              >
                {treatmentDesign?.lowerStageNumber}
              </ViewItem>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="IPR">{treatmentDesign?.havingIpr}</ViewItem>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="IPR stages">
                <div className="flex flex-wrap">
                  {treatmentDesign?.iprStages?.map((text: any) => (
                    <Chip key={text} text={text} />
                  ))}
                </div>
              </ViewItem>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="Attachments">{treatmentDesign?.havingAttachment}</ViewItem>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ViewItem title="Attachments stages">
                <div className="flex flex-wrap">
                  {treatmentDesign?.attachmentStages?.map((text: any) => (
                    <Chip key={text} text={text} />
                  ))}
                </div>
              </ViewItem>
            </div>
            <div className="col-span-6 mt-2">
              <ViewItem title="Auxiliaries">{treatmentDesign?.havingElastic}</ViewItem>
            </div>
            <div className="col-span-12">
              <ViewItem title="Auxiliaries type">{treatmentDesign?.elastics?.join(', ')}</ViewItem>
            </div>
            <div className="col-span-12 mt-2">
              <ViewItem title="Auxiliaries details">{treatmentDesign?.auxiliaryDetail}</ViewItem>
            </div>
            <div className="col-span-12 mt-2">
              <ViewItem title="Comments">{treatmentDesign?.comment}</ViewItem>
            </div>
          </div>
        </div>
      </NiceCollapse>
    </div>
  );
};
