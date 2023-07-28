import { ServiceApi, isSuccess,setApiAuthorization } from "./api";
import { message } from 'antd';

export const login = async(values: { email: string, password: string}) => {
    const res : any= await ServiceApi.login(values);

        if (isSuccess(res)) {
            message.success("Login successful");
            setApiAuthorization(res?.data?.token)
            return res?.data?.token
        }
        message.error("Login failure")
        return null
}