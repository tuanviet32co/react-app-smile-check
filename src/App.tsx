import { useEffect, useState } from 'react';
// import { BeforeAfterImages } from './components/before-after-images';
import { ImageDragger } from './components/image-dragger';
import bg1Jpg from './assets/bg1.jpg';
import bg2Jpg from './assets/bg2.jpg';
import NiceModal from '@ebay/nice-modal-react';
import { ResultModal } from './components/result-modal';
import { useWindowSize } from './utils/useWindowSize';
import { ReactComponent as Logo } from './assets/32co-logo.svg';

const RESULT = {
  toothAnimationUrl: `https://webview.32-stories.com/?mlink=https://onyx-uploads.s3.eu-west-2.amazonaws.com/Client983/SUBM-WWNXGKF/81F16ABD470C45A5879866538E9A9157.iiwgl&fg=004&bg=ddd&p=BUERRB`,
  info: ''
}

function App() {
  const { isMd } = useWindowSize()
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  const handleFinished = (v: any) => {
    NiceModal.show(ResultModal, { result: RESULT });
  }

  return (
    <div
      style={{ backgroundImage: `url(${isMd ? bg1Jpg : bg2Jpg})`, backgroundPosition: 'top' }}
      className='min-h-screen relative w-full bg-cover bg-blend-luminosity bg-red md:h-[100vh] col-span-12 md:col-span-7'
    >
      <div className="absolute top-0 w-full h-full backdrop-brightness-[.50] p-8 text-white">
        <div className='grid grid-cols-12'>
          <div className='col-span-12 md:col-span-6 text-2xl'>
            Find suitable Smile Simulation with your Intra oral
          </div>
          <div className='col-span-12 md:col-span-6'>
            <ImageDragger
              onFinished={handleFinished}
              toggleProcessing={setIsProcessing}
            />
          </div>
        </div>
        <div className="flex flex-col text-white justify-center items-center space-y-2 absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="text-base font-semibold">Powered by</div>
          <Logo />
        </div>
      </div>
    </div>
  );
}

export default App;
