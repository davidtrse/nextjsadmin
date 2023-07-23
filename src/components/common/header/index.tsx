import React from 'react';
import { Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authstorage';

const {Header: AntHeader} = Layout

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };


const Header : React.FC = ()=> {
    const { profile } = useAuthStore((state) => state);
   
   return   (
    <AntHeader style={headerStyle}> header {profile?.email} </AntHeader>
   )
                   
};

export default Header;