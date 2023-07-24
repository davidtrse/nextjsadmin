import React from 'react';
import { Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authstorage';
import dynamic from 'next/dynamic'
import Menu from '@/components/common/Menu';

const DynamicHeader = dynamic(() => import('@/components/common/Header'), {
    loading: () => <div className='h-64px w-full'>Loading...</div>,
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
    return <div>
        <Space direction="vertical" className='min-h-screen w-screen' size={[0, 48]}>
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