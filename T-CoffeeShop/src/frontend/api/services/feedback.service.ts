import AxiosClient from "api/axios-client";
import { Feedback } from "types/feedback";


export const FeedbackService = {
    create: async (newFeedback: Feedback): Promise<Feedback> => {
        const response = await AxiosClient.post(`/feedback`, newFeedback, {
            headers: {
                'Content-Type': 'application/json' // Gửi dữ liệu dưới dạng JSON
            }
        });
        return response.data;
    },

    getFeedbackByUserId: async (id): Promise<any> => {
        return await AxiosClient.get(`/feedback/${id}/feedbacks`)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return [];
          });
      },
}

