import { useState } from 'react';
import { ImageDragger } from './components/image-dragger';
import { ResultComponent } from './components/result-modal';
// import { useWindowSize } from './utils/useWindowSize';
// import { ReactComponent as Logo } from './assets/32co-logo.svg';
import { Button, Spin } from 'antd';
import { PageLayout } from './components/animate/page-layout';

function App() {
  // const { isMd } = useWindowSize();
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  const [result, setResult] = useState<any>();

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
            <Spin tip="Loading..." spinning={isProcessing}>
              <ImageDragger
                onFinished={setResult}
                toggleProcessing={setIsProcessing}
              />
            </Spin>
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
