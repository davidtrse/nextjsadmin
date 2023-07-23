import axios from 'axios';

interface ILoginPayload {
    email: string;
    password: string;
}

const handleLogin = async (payload: ILoginPayload) => {
    const { email, password } = payload;

    try {
        const res = await axios.post('http://159.223.59.66:4003/users/login', { email, password })

        if (res.status === 200) {
            return res.data;
        }
    } catch (e: any) {
        alert(e.message);
        return null;
    }

};

export {
    handleLogin
};