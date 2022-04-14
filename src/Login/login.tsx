import React from 'react'
import styles from './login.module.css'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login } from '../api/use'

export default function Login() {

    const pathname = window.location.pathname

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const param = {
            user: {
                email: values.email,
                password: values.password
            }
        }
        login(param).then(({ data, status }) => {
            if (status === 200) {
                sessionStorage.setItem('token', data.token)
                message.success('登录成功')
            } else if (status === 400) {
                const errMssage = data.errors.map((item: any) => item.msg).join(',')
                message.error(errMssage)
            } else {
                throw new Error(data)
            }

        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.bg}>
            <Form
                className={styles.form}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>

                {
                    pathname === '/login' ? null : <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                }


                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                {
                    pathname === '/login' ? <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 12, span: 12 }}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item> : null
                }

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        {pathname === '/login' ? "Login" : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

