import MainLayout from '@/components/common/MainLayout';
import { NextPageWithLayout } from '../../_app';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Breadcrumb, Button, Input, Pagination, Popconfirm, Space, Table, TableProps, message } from 'antd';
import Link from 'next/link'
import { ColumnsType } from 'antd/es/table';
import { ROUTER } from '@/constants';
import { ServiceApi, isSuccess } from '@/services/api';
import { IUser } from '@/services/api.type';
import { FileAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BreakcrumbUsers } from './Users.config'
import { useAuthStore } from '@/store/authstorage';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type DataIndex = keyof IUser;

const ListUsersPage: NextPageWithLayout<{ data: any }> = (props) => {
    const token = useAuthStore(state => state.token)
    const [data, setData] = useState({
        list: [] as IUser[],
        total: 0
    })

    const { list, total } = data;

    const [params, setPrams] = useState({
        limit: 10,
        offset: 0,
        order: ['id DESC'],
        where: {}
    })

    const confirm = async (id: number) => {
        const res: any = await ServiceApi.deleteUser(id);

        if (isSuccess(res)) {
            message.success('Delete user successfully');
            getProducts();
            return;
        }

        message.error('Delete user failure');

    };


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUser> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<IUser> = useMemo(() => [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            render: (text: any, record: any) => record.firstName + " " + record.lastName
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            filters: [
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'Staff',
                    value: 'staff',
                },
            ],
            filterSearch: true,
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
                            description="Are you sure to delete this user?"
                            onConfirm={() => confirm(record.id)}
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

                        <Link href={ROUTER.EDIT_USER.replace('[userId]', record.id)}>
                            <button
                                className={
                                    'text-xl cursor-pointer  bg-transparent active:translate-y-[1px]'
                                }
                            >
                                <EditOutlined />
                            </button>
                        </Link>

                    </div>
                );
            },
        },
    ], [])


    const getProducts = async () => {
        const res: any = await ServiceApi.getUsers(params)

        if (isSuccess(res)) {
            setData({
                list: res.data?.data || [],
                total: Number(res.data?.total),
            })
        }
    }

    useEffect(() => {
        getProducts()
    }, [params])

    useEffect(() => {
        setPrams((oldParams) => ({
            ...oldParams,
            where: searchText ? {
                [searchedColumn]: searchText
            } : {}
        }))
    }, [searchText, searchedColumn])

    const onPaginationChange = (pageNumber: number) => {
        setPrams((oldPrams) => ({ ...oldPrams, offset: oldPrams.limit * (pageNumber - 1) }))
    }

    const onChange: TableProps<IUser>['onChange'] = (pagination, filters: any, sorter: any, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setPrams((oldPrams) => ({
            ...oldPrams, where: filters?.roles?.length > 0 ? {
                roles: {
                    inq: filters?.roles
                },
            } : {},
            order: sorter.field ? [`${sorter.field} ${sorter.order === 'ascend' ? 'ASC' : 'DESC'}`] : ['id DESC']
        }))
    };

    return <div>
        <Breadcrumb
            items={BreakcrumbUsers}
        />
        <div className="flex justify-end">
            <Link href={ROUTER.ADD_USER}>
                <Button
                    type="primary"
                    ghost
                >
                    <p>Create</p>
                </Button>
            </Link>
        </div>
        <div className="p-4">

            <Table columns={columns} dataSource={list} pagination={false} onChange={onChange}
                rowKey={(item => item.id)}
            />
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