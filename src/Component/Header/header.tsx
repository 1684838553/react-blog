import React from 'react'
import styles from './header.module.css'
import MyIcon from '../MyIcon/my-icon'
import LogoSrc from '../../assets/logo.jpeg'

const IconfontUrl = MyIcon('//at.alicdn.com/t/font_3325824_y2sjp3f7s1i.js')

export default function Header() {

    function login() {
        // console.log(this.history, 'ppppp')
        // console.log(window.location)
        window.location.href = '/login'
    }

    return (
        <div className={styles.top}>
            <div className={styles.topLeft}>
                <a href="https://github.com/1684838553" target="_blank"><IconfontUrl className={styles.icons} type="icon-github" /></a>
                <a href="https://blog.csdn.net/jdrunk?type=blog" target="_blank"><IconfontUrl className={styles.icons} type="icon-csdn" /></a>
                <a href="https://juejin.cn/my-course" target="_blank"><IconfontUrl className={styles.icons} type="icon-juejin" /></a>
            </div>
            <div className={styles.topCenter}>
                <div className={styles.menus}>HOME</div>
                <div className={styles.menus}>WRITE</div>
                <div className={styles.menus} onClick={login}>LOGIN</div>
            </div>
            <div className={styles.topRight}>
                <img width="40" height="40" className={styles.image} src={LogoSrc} alt="" />
                {"drunk 喵咪"}
            </div>
        </div>
    );
}
