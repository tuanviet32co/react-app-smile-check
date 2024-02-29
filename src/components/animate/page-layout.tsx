import waveTopPng from '../../assets/wave-top.png';
import waveMidPng from '../../assets/wave-mid.png';
import waveBotPng from '../../assets/wave-bot.png';
import { FC } from 'react';

export const PageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="waveWrapper waveAnimation">
      <div className='absolute top-0 bottom-0 left-0 right-0 overflow-scroll z-50'>
        {children}
      </div>
      <div className="waveWrapperInner bgTop">
        <div className="wave waveTop" style={{ backgroundImage: `url(${waveTopPng})` }}></div>
      </div>
      <div className="waveWrapperInner bgMiddle">
        <div className="wave waveMiddle" style={{ backgroundImage: `url(${waveMidPng})` }}></div>
      </div>
      <div className="waveWrapperInner bgBottom">
        <div className="wave waveBottom" style={{ backgroundImage: `url(${waveBotPng})` }}></div>
      </div>
    </div>
  );
};

