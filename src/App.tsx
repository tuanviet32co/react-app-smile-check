import { useState } from 'react';
import { BeforeAfterImages } from './components/before-after-images';
import { ImageDragger } from './components/image-dragger';
import { Form } from 'antd';

function App() {
  const [before, setBefore] = useState<string>('');
  const [after, setAfter] = useState<string>('');

  return (
    <div className=' min-h-screen'>
      <div className='px-4 py-6'>
        <Form.Item>
          <ImageDragger name="" />
        </Form.Item>
        <BeforeAfterImages before='0' after='0' />
      </div>
    </div>
  );
}

export default App;
