import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useToBeImplemented } from "hooks/hooks";
import { getStorage } from "zmp-sdk";
import { setStorage } from "zmp-sdk/apis";

const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

AxiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const auth = await getStorage({
      keys: ["authentication"],
    });
    if (auth) {
      if (config.headers && auth.authentication?.token) {
        config.headers.Authorization = `Bearer ${auth.authentication?.token}`;
      }
    }
    return config;
  }
);

AxiosClient.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response && response.data) {
      return response.data;
    }
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest: AxiosRequestConfig =
      error.config as AxiosRequestConfig;
    console.error(error);

    if (error.response && error.response.status === 499) {
      try {
        const auth = await getStorage({
          keys: ["authentication"],
        });
        if (!auth) {
          console.error("Your session has expired. Please login again.");
          useToBeImplemented({
            position: "top",
            text: "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.",
          })();
          throw new Error("No refresh token available.");
        }
        if (auth.authentication.refresh_token) {
          const refreshedTokenResponse: any = await AxiosClient.post(
            "/admin/refresh",
            {
              refresh_token: auth.authentication.refresh_token,
            }
          );

          const token = refreshedTokenResponse?.token;

          setStorage({
            data: {
              authentication: {
                ...auth.authentication,
                token,
              },
            },
          });
          return AxiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.message);
  }
);

export default AxiosClient;