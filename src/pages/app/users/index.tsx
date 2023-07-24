import MainLayout from '@/components/common/MainLayout';
import { NextPageWithLayout } from '../../_app';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Pagination, Table, TableProps } from 'antd';
import Link from 'next/link'
import { ColumnsType } from 'antd/es/table';
import {ROUTER} from '@/constants';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const items = [
    {
        title: <Link href="/">Home</Link>,
    },
    {
        title: <Link href={ROUTER.USERS}>Users</Link>,
    },

]
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value: any, record: any): any => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value: any, record: any): any => record.address.indexOf(value) === 0,
    },
];

const ListUsersPage: NextPageWithLayout<{data: any}> = (props) => {
    const [list, setList] = useState([])
    const [params, setPrams] = useState({
        limit: 10,
        offset: 0,
        order: ['id DESC']
    })

    useEffect(() => {

        // call api with params
        // return data
        // setList(data)

        // once params change will recall api
        // setList(newData)

    }, [params])

    const onChange = (e: any) => {
        console.log('====================================');
        console.log(1, e);
        console.log('====================================');
        setPrams(e)
    }

    const onPaginationChange = (e: any) => {
        console.log('====================================');
        console.log(1, e);
        console.log('====================================');
        setPrams(e)
    }

    return <div>
         <Breadcrumb
            items={items}
        />
        <div className="p-4"><Table onChange={onChange} columns={columns} dataSource={data} pagination={false} />
            <Pagination
                total={85}
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