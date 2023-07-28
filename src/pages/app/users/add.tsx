import MainLayout from '@/components/common/MainLayout';
import React, { useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import Link from 'next/link';
import { ROUTER } from '@/constants';
import { Button, Form, Input, InputNumber, Breadcrumb, message, Select } from 'antd';
import { ServiceApi, isSuccess } from '@/services/api';
import { IProduct, IUser } from '@/services/api.type';
import { useRouter } from 'next/router';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


const items = [
    {
        title: <Link href="/">Home</Link>,
    },
    {
        title: <Link href={ROUTER.USERS}>List Users</Link>,
    },
    {
        title: <p>Create</p>,
    },
]
const AddUserPage: NextPageWithLayout<{ data: any }> = (props) => {
    const [loading, setLoading] = useState(false)
    const { replace, back } = useRouter()
    const onFinish = async (values: IUser) => {
        setLoading(true)
        try {
            const res: any = await ServiceApi.createUser(values);
            if (isSuccess(res)) {
                message.success("Create User Success");
                replace(ROUTER.USERS);
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
                <Form.Item name={['firstName']} label="First Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['lastName']} label="LastName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['email']} label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['roles']} label="Role" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="staff">Staff</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['password']} label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <div className='gap-6 row center'>
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