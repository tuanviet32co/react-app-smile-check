import { useState } from 'react';
import { ImageDragger } from './components/image-dragger';
import { ResultComponent } from './components/result-modal';
import { PageLayout } from './components/page-layout';
import { ReactComponent as Logo } from './assets/32co-logo.svg';
import { Button, Spin } from 'antd';

function App() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
            <>
              <Spin tip="Loading..." spinning={isProcessing}>
                <ImageDragger
                  onFinished={setResult}
                  toggleProcessing={setIsProcessing}
                />
              </Spin>
              <div className="flex text-white justify-center items-center mt-6">
                <Logo width={36}/>
                <div className='ml-3 text-black mt-2'>Built with ❤️ at 32Co</div>
              </div>
            </>
            :
            <ResultComponent result={result} />
          }
        </div>

        {result &&
          <div className='mt-3'>
            <Button className='w-60 bg-[#1677ff]' onClick={handleReset} size='large' type='primary'>Start Over</Button>
          </div>
        }

      </div>
    </PageLayout>
  );
}

export default App;
