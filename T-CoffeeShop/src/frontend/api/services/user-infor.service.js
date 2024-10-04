import axios from "axios";




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