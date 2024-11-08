import React, { FC, useState } from "react";
import { Box, Header, Icon, Page, Text, Spinner } from "zmp-ui";
import CustomReview from "../components/custom-review"; 
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router-dom";
import { useToBeImplemented } from "hooks/hooks";
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authenticationState, 
  accessTokenState,
  getPhonenumber,
  userCurrentAtom,
  userCurrentState,
  sendNotification
} from "state";
import { CustomerService } from "api/services/customer.service";
import { Subscription } from "../components/subscription"
import { getUserInfo } from "zmp-sdk";

const listRender = (handle, navigate, isAdmin) => {
  const items = [
    {
      left: <Icon icon="zi-user" />,
      right: (
        <Box flex>
          <Text.Header className="flex-1 items-center font-normal">
            Thông tin tài khoản
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
      onclick: handle,
    },
    {
      left: <Icon icon="zi-clock-2" />,
      right: (
        <Box flex onClick={() => navigate("/order-history")}>
          <Text.Header className="flex-1 items-center font-normal">
            Lịch sử đơn hàng
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
      onclick: () => {},
    },
  ];

  if (isAdmin) {
    items.push({
      left: <Icon icon="zi-setting" />,
      right: (
        <Box flex onClick={() => navigate("/admin/dashboard")}>
          <Text.Header className="flex-1 items-center font-normal">
            Quản trị
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
      onclick: () => {},
    });
  }

  return items;
};

// const Subscription: FC = () => {
//   const onClick = () => {
//     sendNotification(); 
//   };
//   return (
//     <Box className="m-4" onClick={onClick}>
//       <Box
//         className="bg-green text-white rounded-xl p-4 space-y-2"
//         style={{
//           backgroundImage: `url(${subscriptionDecor})`,
//           backgroundPosition: "right 8px center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <Text.Title className="font-bold">Trở thành thành viên</Text.Title>
//         <Text size="xxSmall">Quan tâm ZaloOA để trở thành thành viên bạn nhé!</Text>
//       </Box>
//     </Box>
//   );
// };

interface PersonalProps {
  setLoading: (loading: boolean) => void; // Thêm prop setLoading
}


const Personal: FC<PersonalProps> = ({ setLoading }) => {
  const navigate = useNavigate();
  const getAuth = useRecoilValue(authenticationState);
  const accessToken = useRecoilValueLoadable(accessTokenState);
  const setAuthentication = useSetRecoilState(authenticationState);

  let { contents } = accessToken;
  const userCurrent = useRecoilValue(userCurrentState);
  const setUserCurrent = useSetRecoilState(userCurrentAtom);

  const handleRequestPermission = async () => {
    try {
      const userInfo = await getUserInfo({ autoRequestPermission: true });
      const name = userInfo.userInfo.name;
      console.log('ten ne pa: ', name);
      

      setUserCurrent({
        ...userCurrent,
        id: userInfo.userInfo.id,
        name: name
      });

      const phone = await getPhonenumber(contents);

      const updatedUser = { ...userCurrent, phone_number: phone };
          setUserCurrent(updatedUser);
          

          (async () => {
            try {
              const updateResponse = await CustomerService.update({
                id: updatedUser.id,
                name: updatedUser.name,
                phone_number: phone,
              });

              if (!updateResponse) {
                if (userCurrent?.id) {
                  const { id, name } = userCurrent;
            
                  console.log('Saving user to DB: ', { id, name });
                  (async () => {
                    await CustomerService.create({
                      id,
                      name
                    });
                  })();
            
                  (async () => {
                    await CustomerService.auth(
                      id,
                      import.meta.env.VITE_APP_ID,
                      setAuthentication
                    );
                  })();
                }
              }

              
              setUserCurrent(updatedUser);
              setLoading(false); 
              navigate("/info_user");
            } catch (error) {
              setLoading(false); 
              console.error("Update error:", error);
            }
          })();

    } catch (error) {
      console.error("Error fetching user info or phone number:", error);
    }
  };

  const handleUserInfo = () => {
    // setLoading(true);

    let { name, phone_number } = userCurrent;
    if (name && phone_number) {
      setLoading(false); 
      navigate("/info_user");
    } else {
      handleRequestPermission()
    }
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        items={listRender(handleUserInfo, navigate, getAuth.isAdmin)}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
        onClick={(item) => item.onclick()}
      />
    </Box>
  );
};


const Other: FC = () => {
  const [isSheetVisible, setSheetVisible] = useState(false); 
  const navigate = useNavigate(); 
  const handleContact = () => {   
    navigate('/contact');
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex onClick={() => setSheetVisible(true)}> {/* Show Sheet on click */}
                <Text.Header className="flex-1 items-center font-normal">
                  Đánh giá đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onclick: () => {},
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onclick: handleContact, 
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
        onClick={(item) => item.onclick()}
      />
      <CustomReview
        visible={isSheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </Box>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const ProfilePage: FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Page>
      {loading && (
        <div style={overlayStyle}>
          <Spinner />
        </div>
      )}
      <Header showBackIcon={false} title="&nbsp;" />
      {!loading && (
        <>
          <Subscription></Subscription>
          <Personal setLoading={setLoading} />
          <Other />
        </>
      )}
    </Page>
  );
};

export default ProfilePage;