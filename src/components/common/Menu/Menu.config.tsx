import { ROUTER } from "@/constants";
import { DashboardOutlined, UserOutlined, UnorderedListOutlined,UserAddOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export const MENU: MenuProps['items'] = [
    {
        label: 'Dashboard',
        key: ROUTER.DASHBOARD,
        icon: <DashboardOutlined />,
    },
    {
        label: 'Users',
        key: 'Users',
        icon: <UserOutlined />,
        children: [
            {
                label: 'List',
                key: ROUTER.USERS,
                icon: <UnorderedListOutlined />,
            },
            {
                label: 'Add',
                key: ROUTER.ADD_USER,
                icon: <UserAddOutlined />,
            }
        ]
    }
]
