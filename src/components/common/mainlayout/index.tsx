import React, { useEffect, useLayoutEffect } from 'react';
import { Layout, Space, message } from 'antd';
import { useAuthStore } from '@/store/authstorage';
import dynamic from 'next/dynamic'
import Menu from '@/components/common/Menu';
import { ServiceApi, setApiAuthorization } from '@/services/api';
import { ApiResponse } from 'apisauce';
import { useRouter } from 'next/router';
import { ROUTER } from '@/constants';

const DynamicHeader = dynamic(() => import('@/components/common/Header'), {
    loading: () => <div className='w-full h-64px'>Loading...</div>,
    ssr: false,
})


const { Footer, Sider, Content } = Layout;


const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { push } = useRouter();
    const token = useAuthStore(state => state.token)

    const naviMonitor = (response: ApiResponse<any>) => {
        // console.log('hey!  listen! ', response);
        if(response.status === 401){
            message.error("Permission denied");
            push(ROUTER.LOGIN)
        }
    }
    
    useLayoutEffect(() => {
        ServiceApi.api.addMonitor(naviMonitor)

        if(token){
            setApiAuthorization(token)
        }
    }, [])
    
    return <div>
        <Space direction="vertical" className='w-screen min-h-screen' size={[0, 48]}>
            <Layout className='min-h-screen'>
                <Sider style={siderStyle}>
                    <div className='h-[64px] bg-gray-300 center'>
                        <p>LOGO</p>
                    </div>
                    <Menu />
                </Sider>
                <Layout>
                    <DynamicHeader />
                    <Content className='p-8 bg-white min-h-[(100vh_-_64px)]'>
                        {children}
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Space>
    </div>;
};

export default MainLayout;