export default function getToken() {
    return new Promise((resolve) => {
        let token = document.cookie
            .split('; ')
            .find(row => row.startsWith('user_token='))
            ?.split('=')[1]

        if (token) {
            resolve(token)
        } else {
            const interval = setInterval(() => {
                token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('user_token='))
                    ?.split('=')[1]

                if (token) {
                    clearInterval(interval);
                    resolve(token)
                }
            }, 100)
        }
    });
}
