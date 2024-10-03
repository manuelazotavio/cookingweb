import useUserLoggedStore from "../stores/useUserLoggedStore.js";

const authFetch = async (url, options) => {
    console.log('Rodou authFetch...');
    const token = useUserLoggedStore.getState().token;

    console.log(token);

    const allOptions = {
        ...options,
        headers: {
            ...(options?.headers ? options.headers : {}),
            "Authorization": "Bearer " + token,
        },
    };

    const response = await fetch(url, allOptions);
    const responseClone = response.clone();

    if (!response.ok) {
        const data = await response.json();
        if (data?.error && data?.code === "expired-token") {
            console.log('Token Expirado...');
            const resRefreshToken = await fetch('https://backcooking.onrender.com/auth/refresh-token', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            });

            console.log('Rodou o refresh Token...');
            if (!resRefreshToken.ok) {
                console.log('Erro ao realizar refresh Token...');
                useUserLoggedStore.setState({ 
                    id: null,
                    nome: '',
                    email: '',
                    avatar: '',
                    token: '',
                    isLogged: false,
                });
                // Remove user from localStorage
                localStorage.removeItem('userLogged');
                return resRefreshToken;
            }
            const dataRefreshToken = await resRefreshToken.json();
            console.log(dataRefreshToken);
            useUserLoggedStore.setState({ token: dataRefreshToken.newToken });
            console.log('Token atualizado no zustand storage!');

            localStorage.setItem('userLogged', JSON.stringify({ ...dataRefreshToken.user, token: dataRefreshToken.newToken }));
            console.log('Token atualizado no localStorage!');

            console.log('Rodando recursividade do authFetch!');
            return await authFetch(url, options);
        }
    }

    return responseClone;
}

export default authFetch;