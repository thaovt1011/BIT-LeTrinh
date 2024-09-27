// import { set } from "lodash";
import { useRecoilValue } from 'recoil';
import { userCurrentState } from "state";
import React, { FC, useState } from "react";
import { Box, Text, Sheet, Icon, Input, Select, Modal, Button } from "zmp-ui";
import { FeedbackService } from 'api/services/feedback.service';


const CustomReview: FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const [showErrorModal, setShowErrorModal] = useState(false); // Trạng thái hiển thị modal lỗi
  const [errorMessage, setErrorMessage] = useState<string>(""); // Thông báo lỗi

  // Retrieve current user data from Recoil
  const userCurrent = useRecoilValue(userCurrentState);
  const userId = userCurrent?.id || '';

  const descriptions = ["Quá tệ", "Chưa tốt", "Bình thường", "Ổn", "Quá tuyệt vời",];

  const { Option } = Select;

  const options = [
    { value: 1, title: "Sản Phẩm" },
    { value: 2, title: "Thái Độ" },
    { value: 3, title: "Giá Cả" },
    { value: 4, title: "Khác" }
  ]

  // lấy value từ input (loại dịch vụ)
  const handleSelect = (value) => {
    setSelectedOption(value);
  }

  const handleSubmit = async () => {

    if (selectedOption === 0 || rating === 0 || comment.trim() === "") {
      setErrorMessage("Vui lòng điền đầy đủ thông tin trước khi gửi.");
      setShowErrorModal(true);
      return;
    }

    const newFeedback = {
      service_type: selectedOption,
      rating,
      comment,
      customer_id: userId
    };

    await FeedbackService.create(newFeedback);

    setShowModal(true);

    // Reset form fields
    setRating(0);
    setComment("");
    // setSelectedOption(0);
  };

  return (
    <>
      <Sheet
        visible={visible}
        onClose={onClose}
        title="Đánh giá dịch vụ của chúng tôi"
        maskClosable={true}
      >
        <Box p={4}>
          <Select
            label="Bạn muốn đánh giá dịch vụ nào?"
            placeholder="Chọn dịch vụ"
            closeOnSelect={true}
            style={{ marginBottom: 16 }}
            onChange={handleSelect}
          >
            {options.map(option => (
              <Option key={option.value} value={option.value} title={option.title} />
            ))}
          </Select>
          <Box flex justifyContent="center" mb={4} mt={4}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box
                onClick={() => setRating(star)}
                className="mx-1"
                style={{ cursor: "pointer" }}
              >
                <Icon
                  key={star}
                  icon={star <= rating ? "zi-star-solid" : "zi-star"}
                  style={{
                    fontSize: 24,
                    color: star <= rating ? "yellow" : "black",
                  }}
                />
              </Box>
            ))}
          </Box>
          <Text className="text-center">{descriptions[rating - 1] || ""}</Text>
          <Input
            type="text"
            placeholder="Nhập ý kiến của bạn"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Box flex justifyContent="center">
            <Button onClick={handleSubmit}>Gửi đánh giá</Button>
          </Box>
        </Box>
      </Sheet>
      {/* Modal hiển thị thông báo thành công */}
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Cám ơn bạn"
      >
        <Box p={4}>
          <Text className="text-center">Cám ơn bạn đã đánh giá!</Text>
        </Box>
      </Modal>

      {/* Modal hiển thị thông báo lỗi */}
      <Modal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Lỗi"
      >
        <Box p={4}>
          <Text className="text-center text-red-700">{errorMessage}</Text>
        </Box>
      </Modal>
    </>
  );
};

export default CustomReview;
