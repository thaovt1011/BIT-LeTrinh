import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import { sendNotification } from "state";

export const Subscription: FC = () => {
    const onClick = async () => {
      try {
        await sendNotification(); 
        console.log("Notification sent successfully");
      } catch (error) {
        console.error("Failed to send notification", error);
      }
    };
  
    return (
      <Box className="m-4" onClick={onClick}>
        <Box
          className="bg-green text-white rounded-xl p-4 space-y-2"
          style={{
            backgroundImage: `url(${subscriptionDecor})`,
            backgroundPosition: "right 8px center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Text.Title className="font-bold">Trở thành thành viên</Text.Title>
          <Text size="xxSmall">
            Quan tâm ZaloOA để trở thành thành viên bạn nhé!
          </Text>
        </Box>
      </Box>
    );
  };