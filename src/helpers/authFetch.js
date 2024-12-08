import useUserLoggedStore from "../stores/useUserLoggedStore.js";
import { useNavigate } from 'react-router-dom';

const authFetch = async (url, options, navigate) => {
    console.log('Rodou authFetch...');
    const token = useUserLoggedStore.getState().token;
   

    if (!token) {
        console.log("token não encontrado");
        navigate('/login'); 
        return;
    }

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
                navigate('/login'); // Redireciona para a tela de login
                return resRefreshToken;
            }
            const dataRefreshToken = await resRefreshToken.json();
            console.log(dataRefreshToken);
            useUserLoggedStore.setState({ token: dataRefreshToken.newToken });
            console.log('Token atualizado no zustand storage!');

            localStorage.setItem('userLogged', JSON.stringify({ ...dataRefreshToken.user, token: dataRefreshToken.newToken }));
            console.log('Token atualizado no localStorage!');

            console.log('Rodando recursividade do authFetch!');
            return await authFetch(url, options, navigate);
        } else if (response.status === 401) {
            console.log('Erro 401: Não autorizado');
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
            navigate('/login'); // Redireciona para a tela de login
        }
    }

    return responseClone;
}

export default authFetch;