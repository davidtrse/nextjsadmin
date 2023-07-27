import MainLayout from '@/components/common/MainLayout';
import { NextPageWithLayout } from '../../_app';
import React, { useEffect, useState, useMemo } from 'react';
import { Breadcrumb, Button, Pagination, Popconfirm, Table, TableProps, message } from 'antd';
import Link from 'next/link'
import { ColumnsType } from 'antd/es/table';
import { ROUTER } from '@/constants';
import { ServiceApi, isSuccess } from '@/services/api';
import { IProduct } from '@/services/api.type';
import { FileAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


const items = [
    {
        title: <Link href="/">Home</Link>,
    },
    {
        title: <Link href={ROUTER.PRODUCTS}>Products</Link>,
    },

]


const onChange: TableProps<IProduct>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const ListUsersPage: NextPageWithLayout<{ data: any }> = (props) => {
    const [data, setData] = useState({
        list: [] as IProduct[],
        total: 0
    })
    const [categories, setCategories] = useState([])

    const { list, total } = data;

    const [params, setPrams] = useState({
        limit: 10,
        offset: 0,
        order: ['id DESC'],
        where: {}
    })

    const confirm: any = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel: any = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        message.error('Click on No');
    };


    const columns: ColumnsType<IProduct> = useMemo(() => [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'salePrice',
            sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            filters: categories,
            filterSearch: true,
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
        },
        {
            title: <p className={'text-center'}>Operation</p>,
            key: 'operation',
            width: '150px',
            render: (text: any, record: any) => {
                return (
                    <div className={'row space-x-4 justify-center'}>
                        <Popconfirm
                            title="Delete the data"
                            description="Are you sure to delete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className={
                                    'text-xl text-red-600 bg-transparent cursor-pointer active:translate-y-[1px]'
                                }
                            >
                                <DeleteOutlined />
                            </button>
                        </Popconfirm>

                        <button
                            className={
                                'text-xl cursor-pointer  bg-transparent active:translate-y-[1px]'
                            }
                        >
                            <EditOutlined />
                        </button>
                    </div>
                );
            },
        },
    ], [categories])


    const getProducts = async () => {
        const res: any = await ServiceApi.getProducts(params)

        if (isSuccess(res)) {
            setData({
                list: res.data?.data || [],
                total: Number(res.data?.count),
            })
        }
    }
    const getCategories = async () => {
        const res: any = await ServiceApi.getCategories()

        if (isSuccess(res)) {
            setCategories(res.data?.data?.map((item: any) => ({
                text: item.name,
                value: item.id
            })))
        }
    }
    useEffect(() => {
        getProducts()
    }, [params])

    useEffect(() => {
        getCategories()
    }, []
    )
    const onPaginationChange = (pageNumber: number) => {
        setPrams((oldPrams) => ({ ...oldPrams, offset: oldPrams.limit * (pageNumber - 1) }))
    }
    const onChange: TableProps<IProduct>['onChange'] = (pagination, filters: any, sorter: any, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setPrams((oldPrams) => ({
            ...oldPrams, where: filters?.categoryId?.length > 0 ? {
                categoryId: {
                    inq: filters?.categoryId
                },
            } : {}, order: sorter ? [`${sorter.field} ${sorter.order === 'ascend' ? 'ASC' : 'DESC'}`] : ['id DESC']
        }))
    };
    return <div>
        <Breadcrumb
            items={items}
        />
        <div className="flex justify-end">
            <Link href={ROUTER.ADD_PRODUCTS}>
                <Button
                    type="primary"
                    ghost
                >
                    <p>Create</p>
                </Button>
            </Link>
        </div>
        <div className="p-4">

            <Table columns={columns} dataSource={list} pagination={false} onChange={onChange} />
            <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                className='mt-4'
                onChange={onPaginationChange}
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    </div>;
};

ListUsersPage.getLayout = MainLayout;

// get api 
// call apip => data => return { props: { data }}
export default ListUsersPage;