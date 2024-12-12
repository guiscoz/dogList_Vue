const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('user_token='))
    ?.split('=')[1]

export default token