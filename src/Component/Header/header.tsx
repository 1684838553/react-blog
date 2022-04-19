import React from 'react'
import { Tooltip } from 'antd';
import styles from './header.module.css'
import MyIcon from '../MyIcon/my-icon'
import LogoSrc from '../../assets/logo.jpeg'
import { userInfo } from '../../util/session-obj'

const IconfontUrl = MyIcon('//at.alicdn.com/t/font_3325824_y2sjp3f7s1i.js')

export default function Header() {

    const user = userInfo()

    const toPage = (path: string) => {
        window.location.href = path
    }

    const logOut = () => {
        sessionStorage.removeItem('user')
        window.location.href = '/login'
    }

    return (
        <div className={styles.top}>
            <div className={styles.topLeft}>
                <a href="https://github.com/1684838553" rel="noreferrer" target="_blank"><IconfontUrl className={styles.icons} type="icon-github" /></a>
                <a href="https://blog.csdn.net/jdrunk?type=blog" rel="noreferrer" target="_blank"><IconfontUrl className={styles.icons} type="icon-csdn" /></a>
                <a href="https://juejin.cn/my-course" rel="noreferrer" target="_blank"><IconfontUrl className={styles.icons} type="icon-juejin" /></a>
            </div>
            <div className={styles.topCenter}>
                <div className={styles.menus} onClick={() => toPage('/')}>HOME</div>
                <div className={styles.menus} onClick={() => toPage('/write')}>WRITE</div>
                <div className={styles.menus} onClick={() => toPage('/article')}>ARTICLE</div>
                {
                    !user ? <div className={styles.menus} onClick={() => toPage('/login')}>LOGIN</div> : null
                }
            </div>
            <div className={styles.topRight}>
                <img width="40" height="40" className={styles.image} src={LogoSrc} alt="" />

                <Tooltip title="退出登录">
                    <span onClick={logOut}>{user?.username}</span>
                </Tooltip>
            </div>
        </div>
    );
}
