import React, { useCallback } from 'react';
import { Button, Layout, Modal, Space } from 'antd';
import { useAuthStore } from '@/store/authstorage';
import { useRouter } from 'next/router';
import { ROUTER } from '@/constants';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Header: AntHeader } = Layout


const { confirm } = Modal;

const Header: React.FC = () => {
    const { profile, setToken } = useAuthStore((state) => state);
    const { push } = useRouter()
    const onLogout = useCallback(() => {
        confirm({
            title: 'Do you Want to logout now?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                setToken(null, null);
                push(ROUTER.LOGIN)
            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }, [])

    return (
        <AntHeader className='h-[64px] bg-[#7dbcea] row justify-between '>
            <div>

            </div>
            <div className='row gap-7'>
                <p>
                    {profile?.email}
                </p>
                <Button type='primary' onClick={onLogout}>
                    Logout
                </Button>
            </div>

        </AntHeader>
    )

};

export default Header;