import { useState } from 'react';
// import { BeforeAfterImages } from './components/before-after-images';
import { ImageDragger } from './components/image-dragger';
import bg1Jpg from './assets/bg1.jpg';
import bg2Jpg from './assets/bg2.jpg';
import { ResultComponent } from './components/result-modal';
import { useWindowSize } from './utils/useWindowSize';
import { ReactComponent as Logo } from './assets/32co-logo.svg';
import { SakuraCanvas } from './components/animate/sakura-canvas';
import { Button } from 'antd';

const RESULT = {
  toothAnimationUrl: `https://webview.32-stories.com/?mlink=https://onyx-uploads.s3.eu-west-2.amazonaws.com/Client983/SUBM-WWNXGKF/81F16ABD470C45A5879866538E9A9157.iiwgl&fg=004&bg=ddd&p=BUERRB`,
  treatmentDesign: {
    "upperStageNumber": 1,
    "lowerStageNumber": 1,
    "totalSteps": 1,
    "arches": "Single arch - upper",
    "havingIpr": true,
    "iprStages": [
      "Stage 0"
    ],
    "havingAttachment": true,
    "havingElastic": false,
    "attachmentStages": [
      "Stage 1"
    ],
    "elastics": [],
    "auxiliaryDetail": "Et accusantium volup",
    "comment": "A mollitia et qui do",
  },
  images: [
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/91fb4d88-c583-41c1-a56b-cf8cfb085f41-intraoral-help-2.8c05a871c04922a5b391.jpg',
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/09d29367-7e86-40dd-aa75-50fb3cad4fd8-intraoral-help-3.bda9f1d5bd706916df9c.jpg',
    'https://32co-files-upload-development.s3.eu-west-2.amazonaws.com/completed-treatment/a00ca901-e9dd-4695-a19d-ba119faaeaad-intraoral-help-1.0ce7e638edfc2b4c0c65.jpg-cropped.jpeg',
    'https://32co-files-upload-staging.s3.eu-west-2.amazonaws.com/intraOralImages/4a006a78-4668-4a07-a289-edbfd54586f6-intraoral-help-5.c1d7dd44e863fa2e7a97.jpg'
  ]
}

function App() {
  const { isMd } = useWindowSize()
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  const [result, setResult] = useState<any>(RESULT);

  // const handleFinished = (v: any) => {
  //   NiceModal.show(ResultModal, { result: RESULT });
  // }

  const handleReset = () => {
    setIsProcessing(false);
    setResult(undefined);
  }

  return (
    <div
      className='min-h-screen relative w-full h-[100vh]'
    >
      <div className='absolute z-[100]'>
        <div className='col-span-12 md:col-span-6 text-2xl'>
          Find suitable Smile Simulation with your Intra oral
        </div>
        <div className='col-span-12 md:col-span-6'>

          {!result ?
            <div className='bg-white bg-opacity-80 p-12 rounded-3xl'>
              <ImageDragger
                onFinished={setResult}
                toggleProcessing={setIsProcessing}
              />
            </div>
            :
            <div>
              <ResultComponent result={result} />
              <Button onClick={handleReset}>Start Over</Button>
            </div>
          }
        </div>
      </div>
      <div className="flex flex-col text-white justify-center items-center space-y-2 absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="text-base font-semibold">Powered by</div>
        <Logo />
      </div>
      <SakuraCanvas />
    </div>
  );
}

export default App;
