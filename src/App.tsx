import { useState } from 'react';
import { ImageDragger } from './components/image-dragger';
import { ResultComponent } from './components/result-modal';
import { useWindowSize } from './utils/useWindowSize';
import { ReactComponent as Logo } from './assets/32co-logo.svg';
import { Button } from 'antd';
import { PageLayout } from './components/animate/page-layout';

export const RESULT = {
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

  const handleReset = () => {
    setIsProcessing(false);
    setResult(undefined);
  }

  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center min-h-screen pt-4 md:pt-8 pb-10'>
        <div
          className='bg-white bg-opacity-80 p-3 md:p-6 rounded-lg md:rounded-3xl min-h-[350px] max-w-[95%]'
          style={{
            width: result ? '1000px' : '500px',
            transition: 'width 0.5s ease, height 0.5s ease',
            boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
          }}
        >
          <div className='text-xl text-slate-700 text-center font-semibold mb-4 mt-3'>
            {!result ? 'Find suitable Smile Simulation with your Intra oral' : 'Smile Simulation for you'}
          </div>
          {!result ?
            <ImageDragger
              onFinished={setResult}
              toggleProcessing={setIsProcessing}
            />
            :
            <ResultComponent result={result} />
          }
        </div>

        {result &&
          <div className='mt-3'>
            <Button className='w-40 bg-[#1677ff]' onClick={handleReset} size='large' type='primary'>Start Over</Button>
          </div>
        }
        {/* <div className="flex flex-col text-white justify-center items-center space-y-2">
          <div className="text-base font-semibold">Powered by</div>
          <Logo />
        </div> */}
      </div>
    </PageLayout>
  );
}

export default App;
