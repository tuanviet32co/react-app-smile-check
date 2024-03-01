import { SmilePreviewComponent } from './smile-preview/smile-preview';
import { FC } from 'react';
import { TResult2 } from './image-dragger';
import { useWindowSize } from '../utils/useWindowSize';
import { Tag } from 'antd';

const getLengthOfTreatment = (stages: number) => {
  if (stages <= 8) return `${stages} Weeks`;
  const months = Math.floor(stages / 4);
  return `${months} - ${months + 1} Months`;
}

type TProps = {
  result: TResult2;
};

export const ResultComponent: FC<TProps> = ({ result }) => {
  const { isMd } = useWindowSize();
  const { treatmentDesign, toothAnimationUrl, beforeImage } = result;

  return (
    <div>
      <div className="mt-8 grid w-full grid-flow-row content-center gap-4 md:gap-8 md:grid-flow-col md:grid-cols-12 md:grid-rows-6 ">
        <div className="col-span-6 row-span-5 flex h-full flex-col items-center gap-2 rounded-xl p-6 md:pb-3 shadow-custom2 md:mt-4 bg-slate-50">
          <div className="text-center text-sm text-darkGrey xl:text-xl">
            Estimated Price <span className="whitespace-nowrap font-bold">( +/- £100 )</span>
          </div>
          <div className="mt-2 text-4xl font-bold text-greenColor">£{Number(treatmentDesign.estimatedPrice).toLocaleString()}</div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
            {[
              `${treatmentDesign.arches} arch`,
              `${treatmentDesign.totalRefinements} Refinements`,
            ].map((value) => (
              <Tag
                key={value}
                className="!rounded-xl border-none bg-lightBlue3 font-semibold capitalize text-darkBlueColor"
              >
                <div className='px-2 py-1'>{value}</div>
              </Tag>
            ))}
          </div>
        </div>

        <div className="col-span-6 row-span-5 flex h-full flex-col items-center gap-2 rounded-xl p-6 md:pb-3 shadow-custom2 md:mt-4 bg-slate-50">
          <div className="text-center text-sm text-darkGrey xl:text-xl">Length of Treatment</div>
          <div className="mt-2 text-center text-2xl font-bold text-darkBlueColor">{getLengthOfTreatment(treatmentDesign.totalSteps)}</div>
          <Tag className="m-0 mt-4 !rounded-xl border-none bg-lightBlue3 font-semibold text-darkBlueColor">
            <div className='px-2 py-1'>{treatmentDesign.totalSteps} Aligner Stages</div>
          </Tag>
        </div>
      </div>

      <div className='font-semibold mt-4 mb-2'>Simulation:</div>
      <SmilePreviewComponent url={toothAnimationUrl} />
      {isMd ? (
        <div className=' mt-7 flex space-x-12'>
          <div>
            <div className='mb-2 font-semibold'>Your uploaded photo</div>
            <img src={beforeImage} alt="" className='h-[300px]' />
          </div>
          <div>
            <div className='mb-2 font-semibold'>Matched photo ({treatmentDesign.accuracy}% accuracy)</div>
            <img src={treatmentDesign?.image} className='h-[300px]' alt="" />
          </div>
        </div>
      ) : (
        <div className='mt-7'>
          <div className='w-full'>
            <div className='mb-2 font-semibold'>Your uploaded photo</div>
            <img src={beforeImage} alt="" className='w-full' />
          </div>
          <div className='w-full mt-3'>
            <div className='mb-2 font-semibold'>Matched photo <span className='text-greenColor'>({treatmentDesign.accuracy}% accuracy)</span></div>
            <img src={treatmentDesign?.image} className='w-full' alt="" />
          </div>
        </div>
      )}
    </div>
  );
};