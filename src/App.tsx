import { useState } from 'react';
import { BeforeAfterImages } from './components/before-after-images';
import { ImageDragger } from './components/image-dragger';
import { Form } from 'antd';
// import before from './assets/before.jpg';
// import after from './assets/after.jpg';

function App() {
  const [images, setImages] = useState<[string, string] | undefined>();

  return (
    <div className=' min-h-screen'>
      <div className='px-4 py-6'>
        <div>Change the appearance of your smile with 32Co AI</div>
        <Form.Item>
          <ImageDragger
            onFinished={(v) => setImages(v)}
          />
        </Form.Item>
        {images &&
          <BeforeAfterImages before={images[0]} after={images[1]} />
        }
      </div>
    </div>
  );
}

export default App;
