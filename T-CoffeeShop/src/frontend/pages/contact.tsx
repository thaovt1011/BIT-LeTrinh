import React, { FC, useEffect, useRef } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const ContactPage: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7831.8430351249035!2d106.445097!3d11.044511!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2de0be49d617%3A0xa1ec21246469499c!2zMzc4IFbDtSBWxINuIMSQaeG7gXUsIFRydW5nIEzhuq1wIFRoxrDhu6NuZywgQ-G7pyBDaGksIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1725435185437!5m2!1svi!2sus";
    }
  }, []);

  return (
    <>
      <Header title="Liên hệ" showBackIcon={true} />
      <Page>
        <Box className="m-4 space-y-4">
          <Box className="space-y-2">
          <Text.Title>Thông tin liên hệ</Text.Title>
          <Text>Địa chỉ: 378 Võ Văn Điều, Ấp Trung Bình, Xã Trung Lập Thượng, Huyện Củ Chi, Thành Phố Hồ Chí Minh</Text>
          <Text>Số điện thoại: <a href="tel:02822611111" style={{ textDecoration: 'underline' }}>028 2261 1111</a></Text>
          <Text>Email: <a href="mailto:ctyletrinh@gmail.com" style={{ textDecoration: 'underline' }}>ctyletrinh@gmail.com</a></Text>
        </Box>
        <Box className="space-y-2">
          <Text.Title>Bản đồ</Text.Title>
          <iframe
            ref={iframeRef}
            style={{ 
              width: '100%',  
              height: '50vh', 
              border: 0 
            }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>

      </Box>
    </Page>
    </>
  );
};

export default ContactPage;