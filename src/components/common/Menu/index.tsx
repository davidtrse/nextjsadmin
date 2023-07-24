import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu as MenuAntd, theme } from 'antd';
import { MENU } from './Menu.config';

import { useRouter } from 'next/router';
import {ROUTER} from '@/constants'

const Menu: React.FC = () => {
  const {push, pathname} = useRouter()

    const [current, setCurrent] = useState(ROUTER.DASHBOARD);

    console.log(111, current, pathname)
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        push(e.key)
    };

    return <MenuAntd
        mode="inline"
        selectedKeys={[current]}
        style={{ height: '100%', borderRight: 0 }}
        items={MENU}
        onClick={onClick}
    />
}

export default Menu;