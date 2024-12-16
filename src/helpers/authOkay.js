
const isAuth = () => {
   
    const user = localStorage.getItem('userLogged')
    if(!user) {
        return false
    } else {
        return true
    }
}

export default isAuth;