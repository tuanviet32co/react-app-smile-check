import React, { FC } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage, useReactCompareSliderRef } from 'react-compare-slider';

type TProps = {
  before: string;
  after: string;
};

export const BeforeAfterImages: FC<TProps> = ({ before, after }) => {
  const reactCompareSliderRef = useReactCompareSliderRef();
  React.useEffect(() => {
    const fireTransition = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          reactCompareSliderRef.current?.setPosition(90);
          resolve(true);
        }, 750),
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          reactCompareSliderRef.current?.setPosition(10);
          resolve(true);
        }, 750),
      );
      await new Promise((resolve) =>
        setTimeout(() => {
          reactCompareSliderRef.current?.setPosition(50);
          resolve(true);
        }, 750),
      );
    };
    fireTransition();
  }, []);
  return (
    <div className="w-full md:w-1/2 !h-[240px] rounded-lg border-2 border-red-400 ">
      <ReactCompareSlider
        transition="0.25s cubic-bezier(.17,.67,.83,.67)"
        ref={reactCompareSliderRef}
        itemOne={<ReactCompareSliderImage src={before} alt="Before" />}
        itemTwo={<ReactCompareSliderImage src={after} alt="After" />}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
