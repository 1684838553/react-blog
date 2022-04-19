export function userInfo() {
    let userString = sessionStorage.getItem('user')
    let user;
    // 解析json对象
    try {
        if (userString) {
            user = JSON.parse(userString)
        } else {
            user = null
        }
    } catch (err) {
        console.log(err)
    }

    return user
}

export function loginInfo() {
    let loginString = sessionStorage.getItem('loginInfo')
    let loginInfo;
    // 解析json对象
    try {
        if (loginString) {
            loginInfo = JSON.parse(loginString)
        } else {
            loginInfo = null
        }
    } catch (err) {
        console.log(err)
    }

    return loginInfo
}
