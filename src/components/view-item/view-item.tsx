import { Typography } from 'antd';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const { Text } = Typography;

const isEmptyChildren = (children: ReactNode) =>
  children === undefined || children === null || children === '' || (Array.isArray(children) && children.length === 0);

const renderYesNo = (val: boolean) => (val === true ? 'Yes' : 'No');

interface IProps {
  title: React.ReactNode;
  hidden?: boolean;
  hiddenWhenEmpty?: boolean;
  className?: string;
  options?: { label: string; value: string | boolean | number }[];
  titleClassName?: string;
  children?: any;
}

export const ViewItem: React.FC<IProps> = ({
  title,
  children,
  hidden,
  hiddenWhenEmpty,
  className,
  options,
  titleClassName,
}) => {
  if (hidden) return null;
  if (hiddenWhenEmpty && isEmptyChildren(children)) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = useMemo(() => {
    if (!options) return children;
    return options.find((option) => option.value === children)?.label || children;
  }, [options, children]);

  return (
    <div className={classNames('py-2', className)}>
      <Text className={twMerge('font-semibold', titleClassName)} style={{ color: '#050D43' }}>
        {title}
      </Text>
      <div className="mt-2" style={{ color: '#555770' }}>
        {isEmptyChildren(value) ? (
          '-'
        ) : typeof value === 'boolean' ? (
          renderYesNo(value)
        ) : (
          <div style={{ whiteSpace: 'pre-line' }}>{value}</div>
        )}
      </div>
    </div>
  );
};
