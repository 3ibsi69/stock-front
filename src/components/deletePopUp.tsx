import React from "react";
import { Button, message, Popconfirm, PopconfirmProps } from "antd";
import axios from "axios";

interface DeletePopProps {
  productId: string;
  onDeleteSuccess: () => void;
}

const DeletePop: React.FC<DeletePopProps> = ({
  productId,
  onDeleteSuccess,
}) => {
  const confirm: PopconfirmProps["onConfirm"] = () => {
    axios
      .delete(`http://localhost:3637/stock/delete/${productId}`)
      .then(() => {
        message.success("Product deleted successfully");
        onDeleteSuccess();
      })
      .catch((error) => {
        message.error("Failed to delete product");
        console.error(error);
      });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {};

  return (
    <Popconfirm
      title="Delete this product?"
      description="Are you sure to delete this product?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

export default DeletePop;
