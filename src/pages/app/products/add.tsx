import MainLayout from '@/components/common/MainLayout';
import React, { useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import Link from 'next/link';
import { ROUTER } from '@/constants';
import { Button, Form, Input, InputNumber, Breadcrumb, message } from 'antd';
import { ServiceApi, isSuccess } from '@/services/api';
import { IProduct } from '@/services/api.type';
import { useRouter } from 'next/router';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


/* eslint-enable no-template-curly-in-string */


const items = [
    {
        title: <Link href="/">Home</Link>,
    },
    {
        title: <Link href={ROUTER.PRODUCTS}>List Products</Link>,
    },
    {
        title: <Link href={ROUTER.PRODUCTS}>Create</Link>,
    },
]
const AddUserPage: NextPageWithLayout<{data: any}> = (props) => {
    const [loading, setLoading] = useState(false)
    const {replace, back} = useRouter()
    const onFinish = async(values: IProduct) => {
        setLoading(true)
        try {
            const res: any = await ServiceApi.createProduct(values);
        if(isSuccess(res)){
            message.success("Create Product Success");
            replace(ROUTER.PRODUCTS);
            return;
        }
        message.error(res.data?.error?.message);
        } catch (err: any) {
            message.error(err?.message);

        } finally {
            setLoading(false);
        }
      };

    return <div>
       <Breadcrumb
            items={items}
        />
        <div className='p-9'>
        <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
    <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['description']} label="Description" rules={[{ required: true }]}>
      <Input.TextArea />
    </Form.Item>
    <Form.Item name={['categoryId']} label="Category" rules={[{ type: 'number', min: 1, max: 10 }]}>
      <InputNumber />
    </Form.Item>
    <Form.Item name={['salePrice']} label="Sale price" rules={[{ type: 'number', min: 0, max: 100000000 }]}>
      <InputNumber />
    </Form.Item>
    <Form.Item name={['purchasePrice']} label="Purchase price" rules={[{ type: 'number', min: 0, max: 100000000 }]}>
      <InputNumber />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
    <div className='row gap-6 center'>
    <Button type="primary" ghost onClick={back}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </div>
    </Form.Item>
  </Form>
        </div>
    </div>;
};

AddUserPage.getLayout = MainLayout;

// get api 
// call apip => data => return { props: { data }}
export default AddUserPage;