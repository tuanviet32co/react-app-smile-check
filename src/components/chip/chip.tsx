import { Tooltip } from 'antd';
import { FC } from 'react';
import './chip.less';

export const Chip: FC<{ text: string; className?: any }> = ({ className = '', text = '' }) => (
  <Tooltip className="format" title={text}>
    <span className={`chip ${className} col-3 mr-2 mb-2 px-1`}>{text}</span>
  </Tooltip>
);
