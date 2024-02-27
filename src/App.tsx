import { useState } from 'react';
import { BeforeAfterImages } from './components/before-after-images';
import { ImageDragger } from './components/image-dragger';
import { Skeleton } from 'antd';
import beforeJpg from './assets/before.jpg';
import afterJpg from './assets/after.jpg';
import homeJpg from './assets/home.jpg';

function App() {
  const [isProcessing, setIsProcessing] = useState<number>(0);
  const [images, setImages] = useState<[string, string] | undefined>();

  return (
    <div className='min-h-screen'>
      <div className=''>
        <div
          style={{ backgroundImage: `url(${homeJpg})`, backgroundPosition: 'center' }}
          className='pt-[115%] md:pt-[unset] relative w-full bg-cover bg-blend-luminosity bg-red h-[60vh]'
        >
          <div className="absolute top-0 w-full h-full backdrop-brightness-[.65] p-8 text-white">
            <div className='text-[25px] font-semibold'>Change your smile</div>
            <div className='text-[35px] font-semibold mb-6'><i className='text-[22px]'>with</i> <span>32Co AI</span></div>
            <ul>
              {['Full-face looking straight ahead',
                'Well-lit environment',
                'Big smile!'].map((item => (
                  <li className='flex space-x-2 text-base leading-8' key={item}>
                    <img src="https://assets-global.website-files.com/625533ffa3e085aa3328ea34/63cb7e1b440ed74125d789c9_check.svg" loading="lazy" alt="" />
                    <div>{item}</div></li>
                )))}
            </ul>
            <div className='bg-primary-400 text-light text-sm inline-block py-1 w-40 mt-6'>
              <ImageDragger
                onFinished={(v) => setImages(v)}
                toggleProcessing={setIsProcessing}
              />
            </div>
          </div>
        </div>
        <div className='mt-1 px-4 py-6'>
          {isProcessing ?
            <>
              <div className=' text-center mb-2'><i>Processing, please wait a while...</i></div>
              <Skeleton.Image active style={{ width: 'calc(100vw - 32px)', height: `${isProcessing}px` }} />
            </>
            : (images ?
              <>
                <div className=' text-center mb-2'><b>Your after photo, thanks</b></div>
                <BeforeAfterImages before={images[0]} after={images[1]} />
              </>
              :
              <>
                <div className=' text-center mb-2'><b>Example:</b></div>
                <BeforeAfterImages before={beforeJpg} after={afterJpg} />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
