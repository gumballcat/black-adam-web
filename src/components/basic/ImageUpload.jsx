import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Progress, Image, Modal } from "antd";
import { useState } from "react";
import ENDPOINTS from "common/ENDPOINTS";
import ENVS from "common/ENVS";
import HELPER from "common/HELPER";

const ImageUpload = ({ onChange }) => {
  const [imageURL, setImageURL] = useState("");
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append("media", file);
    formData.append("key", ENVS.IMAGE_API_KEY);

    await HELPER.HTTP.executePostForm(ENDPOINTS.UPLOAD_IMAGE, formData)
      .then((response) => {
        setImageURL(response.data.media);
        onChange(response.data.media);
        onSuccess("OK");
      })
      .catch((error) => {
        onError("Something happened");
      });
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);
  };

  return (
    <>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
        className="image-upload-grid"
        onPreview={() => setShowImageModal(true)}
      >
        {defaultFileList.length >= 1 ? null : <UploadOutlined />}
      </Upload>

      <Modal
        open={showImageModal}
        onOk={() => {
          setShowImageModal(false);
          setImageURL("");
        }}
        onCancel={() => {
          setShowImageModal(false);
          setImageURL("");
        }}
      >
        <Image src={imageURL} />
      </Modal>
    </>
  );
};

export default ImageUpload;
