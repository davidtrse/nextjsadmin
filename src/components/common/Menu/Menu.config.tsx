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
        key: ROUTER.USERS,
        icon: <UserOutlined />,
        // children: [
        //     {
        //         label: 'List',
        //         key: ROUTER.USERS,
        //         icon: <UnorderedListOutlined />,
        //     },
        // ]
    },
]
