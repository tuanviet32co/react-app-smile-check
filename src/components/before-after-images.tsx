import { FC } from 'react';

type TProps = {
  before: string;
  after: string;
}

export const BeforeAfterImages: FC<TProps> = ({ before, after }) => {
  return (
    <div className='w-full h-[400px] rounded-lg border-2 border-red-400'>
      {before}
      {after}
    </div>
  );
}