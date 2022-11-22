export default {
    auth(to, from, next) {
        if(document.cookie.indexOf('user_token') == -1) {
            alert('Não foi possível fazer o login')
            next('/login');
        }

        next();
    }
}