import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const handleLogin = async ({ email, password }: { email: string; password: string }) => {
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

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();
    const handlerSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        const res = await handleLogin({ email, password });
        if (res) {
            push('/')
        }
        setLoading(false)
    };
    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center relative bg-[url('/bg-login.png')] bg-cover bg-bottom" >
            <div className='text-white w-[538px] h-[421px] z-40 rounded-3xl bg-[#2B2B2B] py-9 px-14'>
                <h1 className='text-[#2ADDC8] text-5xl text-center'>Đăng nhập</h1>
                <p className='text-center mt-3'>Đăng nhập để quản lý website</p>
                <form onSubmit={handlerSubmit} className='flex flex-col mt-4'>
                    <label htmlFor="">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#404040] rounded-xl h-12 mt-2 px-3'
                    >
                    </input>
                    <label htmlFor="password" className='mt-6'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#404040] rounded-xl h-12 mt-2 px-3'
                    ></input>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-gradient-to-b from-[#2ACCDB] to-[#2ACCDD] w-[138px] h-[46px] mx-auto mt-2"
                    >
                        {loading ? "Loading..." : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;