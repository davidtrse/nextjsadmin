import MainLayout from '@/components/common/MainLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';

const AddUserPage: NextPageWithLayout<{data: any}> = (props) => {
    return <div>
        <div>AddUserPage</div>
    </div>;
};

AddUserPage.getLayout = MainLayout;

// get api 
// call apip => data => return { props: { data }}
export default AddUserPage;