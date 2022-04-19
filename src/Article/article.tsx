import React, { useState, useEffect } from 'react'
import styles from './article.module.css'
import { Table, Popover, message, Tag } from 'antd';
import { getArticleList, deleteArticle } from '../api/profile';
import showdown from 'showdown'

export default function Article(): JSX.Element {
    const converter = new showdown.Converter()
    const [list, setList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [obj, setObj] = useState({
        pageSize: 5,
        current: 1,
    })
    const [total, setTotal] = useState(0)

    const columns = [
        {
            title: '索引',
            width: 60,
            render: (_: any, record: any, index: number) => {
                return <span>{(obj.current - 1) * obj.pageSize + index + 1}</span>
            }
        },
        {
            title: '标题',
            width: 180,
            align: 'center' as 'center',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '描述',
            width: 230,
            align: 'center' as 'center',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '标签',
            width: 180,
            align: 'center' as 'center',
            dataIndex: 'tagList',
            key: 'tagList',
            render: (text: Array<string>) => {
                const colors = ['magenta', 'cyan', 'volcano']
                return <>
                    {
                        text?.map((tag: string, index: number) => {
                            return <Tag color={colors[index]} key={tag + index}>{tag}</Tag>
                        })
                    }
                </>
            }
        },
        {
            title: '内容',
            align: 'center' as 'center',
            dataIndex: 'body',
            key: 'body',
            render: (text: string = '') => {
                const html = converter.makeHtml(text)
                return <Popover content={<div dangerouslySetInnerHTML={{ __html: html }}></div>}>
                    <span className={styles.content}>{text ? text.slice(0, 60) + (text.length > 60 ? '...' : '') : ''}</span>
                </Popover>
            }

        },
        {
            title: '操作',
            key: 'action',
            width: 130,
            align: 'center' as 'center',
            render: (text: any, record: any) => (
                <>
                    <span className={styles.btnText} onClick={() => action(record, 'delete')}>删除</span>
                    <span className={styles.btnText} onClick={() => action(record, 'update')}>修改</span>
                </>
            ),
        },
    ];

    const action = (record: any, type: 'delete' | 'update') => {
        console.log(record)
        if (type === "delete") {
            deleteArticle(record._id).then(({ data, status }) => {
                console.log(data, 'redddd')
                if (status === 204) {
                    message.success('删除成功')
                    setObj({
                        ...obj
                    })
                } else {
                    throw new Error(data)
                }
            })
        }
    }

    useEffect(() => {
        getArticleList(obj).then(({ data, status }) => {
            if (status === 201) {
                setList(data?.articles ?? [])
                setTotal(data.total)
            } else if (status === 400) {
                const errMssage = data.errors.map((item: any) => item.msg).join(',')
                message.error(errMssage)
            } else {
                throw new Error(data)
            }
        })
    }, [obj])

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <div className={styles.wrapper}>
        <Table columns={columns} dataSource={list} rowKey={record => record._id} pagination={{
            ...obj,
            total,
            onChange: (current, pageSize) => {
                console.log(current, pageSize)
                setObj({
                    current,
                    pageSize
                })
            }
        }} />
        {/* <Modal title="更新文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal> */}

    </div>
}
