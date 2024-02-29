import waveTopPng from '../../assets/wave-top.png';
import waveMidPng from '../../assets/wave-mid.png';
import waveBotPng from '../../assets/wave-bot.png';

export const SakuraCanvas = () => {
  return (
    <div className="waveWrapper waveAnimation">
      <div style={{ height: '300px', width: '300px', background: 'red' }}></div>
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

