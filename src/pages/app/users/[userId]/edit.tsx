import MainLayout from '@/components/common/MainLayout';
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../_app';
import Link from 'next/link';
import { ROUTER } from '@/constants';
import { Button, Form, Input, InputNumber, Breadcrumb, message, Select } from 'antd';
import { ServiceApi, isSuccess } from '@/services/api';
import { IProduct, IUser } from '@/services/api.type';
import { useRouter } from 'next/router';
import { ApiResponse } from 'apisauce';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};



const AddUserPage: NextPageWithLayout<{ data: any }> = (props) => {
    const [loading, setLoading] = useState(false)
    const { replace, back, query } = useRouter()
    const [user, setUser] = useState(null as any)

    const getUserById = async () => {
        const res = await ServiceApi.getUserById(Number(query?.userId));
        setUser(res?.data)
    }

    useEffect(() => {
        if (query?.userId) {
            getUserById()
        }
    }, [query])

    const items = [
        {
            title: <Link href="/">Home</Link>,
        },
        {
            title: <Link href={ROUTER.USERS}>List Users</Link>,
        },
        {
            title: query?.userId, // query?.userId always string
        },
        {
            title: <p>Edit</p>,
        },
    ]

    const onFinish = async (values: IUser) => {
        setLoading(true)
        try {
            const res: any = await ServiceApi.updateUser(Number(query?.userId), values);
            if (isSuccess(res)) {
                message.success("Update User Success");
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
            {
                !!user && <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    initialValues={{
                        ...user
                    }}
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
            }
        </div>
    </div>;
};

AddUserPage.getLayout = MainLayout;

// get api 
// call apip => data => return { props: { data }}
export default AddUserPage;