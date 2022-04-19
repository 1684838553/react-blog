import React, { useState, useRef } from 'react'
import styles from './write.module.css'
import Editor from 'for-editor'
import { Input, Button, message } from 'antd';
import { addArticle } from '../api/profile'

export default function Write(): JSX.Element {
    const editorRef = useRef(null)

    const [file, setFile] = useState('')
    const [article, setArticle] = useState({
        title: '',
        description: ''
    })

    const handleChange = (value: string) => {
        setFile(value)
    }

    const addImg = (value: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(value)
        reader.addEventListener('load', (res: any) => {
            const result = file + `<img src="${res.target.result}" />`
            setFile(result)
        })
    }

    const addField = (value: string, type: string) => {
        setArticle({
            ...article,
            [type]: value
        })
    }

    const submitArticle = () => {
        const param = {
            article: {
                ...article,
                body: file
            }
        }
        addArticle(param).then(({ data, status }) => {
            if (status === 201) {
                message.success('提交成功')
                setArticle({
                    title: '',
                    description: ''
                })
                setFile('')
            } else if (status === 400) {
                const errMssage = data.errors.map((item: any) => item.msg).join(',')
                message.error(errMssage)
            } else {
                throw new Error(data)
            }
        })
    }

    return <div className={styles.write}>
        <img className={styles.writeImg} src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <Input placeholder="文章标题" maxLength={20} value={article.title} showCount allowClear onChange={e => addField(e.target.value, 'title')} />
            </div>
            <div className={styles.input}>
                <Input placeholder="文章描述" maxLength={30} value={article.description} showCount allowClear onChange={e => addField(e.target.value, 'description')} />
            </div>
            <Editor
                ref={editorRef}
                value={file}
                style={{ boxShadow: 'none' }}
                onChange={handleChange}
                addImg={addImg}
            />
            <div className={styles.input}>
                <Button type="primary" block onClick={submitArticle}>提交</Button>
            </div>
        </div>
    </div>
}
