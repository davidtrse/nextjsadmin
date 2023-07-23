import React from 'react';
import { Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authstorage';
import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('@/components/common/header'), {
  loading: () => <div className='h-64px w-full'>Loading...</div>,
  ssr: false,
})
 


const { Footer, Sider, Content } = Layout;


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

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

const MainLayout = ({children}: {children: React.ReactNode}) => {
   return <div>
        <Space direction="vertical" className='min-h-screen w-screen' size={[0, 48]}>
            <Layout className='min-h-screen'>
                <Sider style={siderStyle}>Sider</Sider>
                <Layout>
                    <DynamicHeader/>
                    <Content style={contentStyle}>
                           {children}
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Space>
    </div>;
};

export default MainLayout;