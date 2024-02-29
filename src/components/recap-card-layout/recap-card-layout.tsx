import { Card } from 'antd';
import { FC } from 'react';
import { ReactComponent as Logo } from '../../assets/32co-logo.svg';
import { useWindowSize } from '../../utils/useWindowSize';

interface IProps {
  title: string;
  children: any;
}

export const RecapCardLayout: FC<IProps> = ({ children, title }) => {
  const { isMd } = useWindowSize();
  return (
    <Card
      className="m-auto min-h-screen w-full max-w-5xl overflow-hidden rounded-none !p-0 shadow-custom md:min-h-fit md:rounded-lg"
      bordered={isMd}
      bodyStyle={{ padding: 0 }}
    >
      <div
        className="p-6 text-center text-[24px] font-semibold text-white"
        style={{
          background: 'linear-gradient(262deg, #EB1F6D 0%, #EC4B26 48.88%)',
        }}
      >
        {title}
      </div>
      {children}
      <div className="my-16 text-center">
        <div className="text-base font-semibold">Powered by</div>
        <Logo />
      </div>
    </Card>
  );
};
