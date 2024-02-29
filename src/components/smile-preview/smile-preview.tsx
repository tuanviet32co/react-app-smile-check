import { FC } from 'react';
import { Empty } from 'antd';

interface ISmilePreviewComponentProps {
  url?: string | null;
}

const STARTS_WITH = 'https://webview.32-stories.com';

export const SmilePreviewComponent: FC<ISmilePreviewComponentProps> = ({ url }) => (
  <div className="text-center">
    {url && url !== '/' && url.startsWith(STARTS_WITH) ? (
      <iframe
        className='w-full'
        height="450px"
        src={url}
        title="Preview"
      />
    ) : (
      <Empty />
    )}
  </div>
);
