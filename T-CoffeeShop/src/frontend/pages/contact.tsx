import React, { FC, useEffect, useRef } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const ContactPage: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1232.5136104807154!2d106.62907371719339!3d10.840971709325483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bd5bfb32677%3A0x4f017048fcb754c5!2sC%C3%94NG%20TY%20TNHH%20TM%20DV%20PH%C3%9A%20MINH%20T%C3%82M!5e1!3m2!1svi!2s!4v1727689897724!5m2!1svi!2s";
    }
  }, []);

  return (
    <>
      <Header title="Liên hệ" showBackIcon={true} />
      <Page>
        <Box className="m-4 space-y-4">
          <Box className="space-y-2">
          <Text.Title><strong>Thông tin liên hệ</strong></Text.Title>
          <Text><strong>Địa chỉ:</strong> 481/83 Nguyễn Văn Quá, Tổ 11, KP8, Phường Đông Hưng Thuận, Quận 12, TP.HCM</Text>
          <Text><strong>Số điện thoại hotline/zalo:</strong> <a href="tel:02822611111" style={{ textDecoration: 'underline' }}>028.3715.5143</a></Text>
          <Text><strong>Số điện thoại văn phòng:</strong> <a href="tel:02822611111" style={{ textDecoration: 'underline' }}>0937.355.143</a></Text>
          <Text><strong>Email 1:</strong> <a href="mailto:ctyletrinh@gmail.com" style={{ textDecoration: 'underline' }}>phuminhtam@phuminhtam.com.vn</a></Text>
          <Text><strong>Email 2:</strong>  <a href="mailto:ctyletrinh@gmail.com" style={{ textDecoration: 'underline' }}> phuminhtampmt@gmail.com</a></Text>
        </Box>
        <Box className="space-y-2">
          <Text.Title><strong>Bản đồ</strong></Text.Title>
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