import React, { useState } from "react";
import { Upload, message, Card, Button } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Assets = () => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ display: "flex", textAlign: "end", alignItems: "end" }}>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        action="https://api.escuelajs.co/api/v1/files/upload"
        // onChange={handleUploadChange}
      >
        {uploadButton}
      </Upload>
      
    </div>
  );
};

export default Assets;
