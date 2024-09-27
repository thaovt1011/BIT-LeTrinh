import axios from "axios";

const endpoint = "https://graph.zalo.me/v2.0/me/info";
const secretKey = "yp1hGgnWe0eE55rd2OBX";


export const UserInforService = {
    get: async (accessToken, token) => {

        return await axios.get(
            import.meta.env.VITE_USER_INFO_END_POINT,
            {
                headers: {
                    access_token: accessToken,
                    code: token.token,
                    secret_key: import.meta.env.VITE_SECRET_KEY
                }
            }
        )
    }
}