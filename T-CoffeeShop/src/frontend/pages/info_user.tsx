import { CustomerService } from 'api/services/customer.service';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userCurrentState, userCurrentAtom } from "state";
import { Header, Modal, Icon, Box, Text } from 'zmp-ui';
import { FaEdit } from "react-icons/fa";


const InfoUserPage: React.FC = () => {
    const userCurrent = useRecoilValue(userCurrentAtom); 
    const setUserCurrent = useSetRecoilState(userCurrentAtom); 

    const [username, setUsername] = useState<string>(userCurrent?.name || '');
    const [phone, setPhone] = useState<string>(userCurrent?.phone_number || '');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleEditCustomer = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const updatedCustomer = {
                id: userCurrent.id,
                name: username,
                phone_number: phone.replace("0", "84"), 
            };
            const response = await CustomerService.update(updatedCustomer);
            console.log("Update response:", response);
            setShowModal(true);
            // Cập nhật thông tin mới trong modal
            setUsername(updatedCustomer.name);
            setPhone(updatedCustomer.phone_number);
            setUserCurrent(updatedCustomer); 
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleBackClick = () => {
        navigate('/profile');
    };

    return (
        
        <>
        <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Cám ơn bạn"
        >
        <Box p={4}>
          <Text className="text-center">Cám ơn bạn đã thay đổi!</Text>
          <Text className="text-center">Tên: {username}</Text> 
          <Text className="text-center">Số điện thoại: {phone}</Text> 
        </Box>
      </Modal>
        <Header title="Hồ sơ của tôi" showBackIcon={true}></Header>
        <div style={styles.container}>
            <div style={styles.content}>
                <form onSubmit={handleEditCustomer} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>Tên người dùng
                        <FaEdit  size={20} />

                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            required />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="phone" style={styles.label}>Số điện thoại
                        <Icon icon="zi-edit" size={20} />

                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={String(phone).replace("84", "0")}
                            onChange={(e) => setPhone(e.target.value)}
                            style={styles.input}
                            required />
                    </div>
                    <button type="submit" style={styles.submitButton}>Chỉnh sửa thông tin</button>
                </form>
            </div>
        </div></>
    );
};


const styles = {
    container: {
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e6ffe6',
        padding: '20px',
    },
    content: {
        width: '100%',
        maxWidth: '500px',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#2e8b57',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#555',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    label: {
        marginBottom: '5px',
        color: '#2e8b57',
        fontWeight: 'bold' as 'bold',
    },
    input: {
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: 'white',
        textAlign: 'center' as 'center'
    },
    submitButton: {
        padding: '12px',
        backgroundColor: '#2e8b57',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold' as 'bold',
        transition: 'background-color 0.3s',
    },
    backButton: {
        marginTop: '40px',
        position: 'absolute' as 'absolute',
        top: '20px',
        left: '20px',
        padding: '10px 20px',
        backgroundColor: '#2e8b57',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold' as 'bold',
        transition: 'background-color 0.3s',
    },
    loginText: {
        marginTop: '20px',
        color: '#666',
    },
    loginLink: {
        color: '#2e8b57',
        fontWeight: 'bold' as 'bold',
        cursor: 'pointer',
    },
};

export default InfoUserPage;