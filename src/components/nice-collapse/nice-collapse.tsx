import { DownOutlined } from '@ant-design/icons';
import { Button, Collapse, Divider } from 'antd';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import './nice-collapse.styles.less';

const { Panel } = Collapse;

export interface INiceCollapseProps {
  title: React.ReactNode;
  open?: boolean;
  className?: string;
  extra?: React.ReactNode;
  showDivider?: boolean;
  hasError?: boolean;
  onChange?: any;
  children?: any;
}
export const NiceCollapse: FC<INiceCollapseProps> = ({
  children,
  title,
  open,
  className,
  extra,
  showDivider,
  hasError,
  onChange,
}) => {
  const expandIcon = ({ isActive }: { isActive?: boolean }) => (
    <Button className="collapse-btn !flex items-center justify-center" shape="circle" size="small">
      <DownOutlined style={{ fontSize: 14 }} rotate={isActive ? 180 : 0} />
    </Button>
  );

  const [activeKey, setActiveKey] = useState<string[] | string>(open ? ['1'] : []);

  useEffect(() => {
    if (hasError) {
      setActiveKey(['1']);
    }
  }, [hasError]);

  const onActiveKeyChange = (key: any) => {
    setActiveKey(key);
    if (onChange) {
      onChange(key);
    }
  };

  return (
    <div className={classNames('nice-collapse-wrapper', className, hasError ? 'error' : '')}>
      <Collapse expandIconPosition="start" activeKey={activeKey} expandIcon={expandIcon} onChange={onActiveKeyChange}>
        <Panel header={title} key="1" extra={extra} forceRender>
          {showDivider && <Divider className="m-0 mb-3" />}
          {children}
        </Panel>
      </Collapse>
    </div>
  );
};
