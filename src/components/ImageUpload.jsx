import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
const ImageUpload = ({ onImageSelect, initialImages = [] }) => {
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState(initialImages); // Thêm trạng thái để lưu URL ảnh

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (onImageSelect) {
      onImageSelect(fileList);
    }
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    setImageUrls((prevUrls) => prevUrls.filter((url) => url !== file.url));
  };

  return (
    <div>
      <Upload
        listType="picture"
        fileList={fileList}
        onChange={handleChange}
        onRemove={handleRemove} 
        beforeUpload={() => false} 
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <div className="album">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: 100, margin: 10 }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
