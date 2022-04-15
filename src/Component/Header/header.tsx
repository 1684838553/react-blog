import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login, register } from '../api/use'
import { loginInfo } from '../util/session-obj';


function Login() {
    const [form] = Form.useForm()
    const loginObject = loginInfo()
    const pathname = window.location.pathname
    const page = pathname ? pathname.slice(1) : 'login'
    const [pageName, setPageName] = useState(page)


    useEffect(() => {
        if (pageName === 'login') {
            form.setFieldsValue({
                email: loginObject.email,
                password: loginObject.password
            })
        }
    }, [])

    const loginSubmit = () => {
        const values = form.getFieldsValue()

        const param = {
            user: {
                email: values.email,
                password: values.password
            }
        }

        if (values.remember) {
            sessionStorage.setItem('loginInfo', JSON.stringify(param.user))
        }

        login(param).then(({ data, status }) => {
            if (status === 200) {
                sessionStorage.setItem('user', JSON.stringify(data))
                message.success('登录成功')
                window.location.href = '/'
            } else if (status === 400) {
                const errMssage = data.errors.map((item: any) => item.msg).join(',')
                message.error(errMssage)
            } else {
                throw new Error(data)
            }

        })
    };

    const toRegisterPage = () => {
        window.location.href = '/register'
        setPageName('register')
        form.resetFields()
    }

    const registerSubmit = () => {
        const values = form.getFieldsValue()
        console.log(values, 'registerSubmit')
        register({ user: { ...values } }).then(({ data, status }) => {
            console.log(data, status, 'uuhhu')
            if (status === 201) {
                message.success('注册成功,请登录')
                window.location.href = '/login'
                setPageName('login')
            } else if (status === 400) {
                const errMssage = data.errors.map((item: any) => item.msg).join(',')
                message.error(errMssage)
            } else {
                throw new Error(data)
            }
        })
    }


    return (
        <div className={styles.bg}>
            <Form
                className={styles.form}
                layout="vertical"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
            >
                <div className={styles.title}>{pageName === 'login' ? 'Login' : 'Register'}</div>

                {
                    pageName === 'login' ? null : <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                }

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>

                {
                    pageName === 'login' ?
                        <div className={styles.col}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <Button type="link" onClick={toRegisterPage} className={styles.register}>
                                注册
                            </Button>
                        </div> : null
                }

                <Form.Item>
                    {
                        pageName === 'login' ?
                            <Button block type="primary" onClick={loginSubmit}>
                                Login
                            </Button> :
                            <Button block type="primary" onClick={registerSubmit}>
                                Register
                            </Button>
                    }
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login

