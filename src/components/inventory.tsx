import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import DeletePop from "./deletePopUp.tsx";
import ModalCompEdit from "./modalEditStock.jsx";
import "../styles/modal.css";

interface DataType {
  _id: string;
  code: String;
  name: String;
  designation: String;
  category: String;
  prixAchatHT: number;
  prixVenteHT: number;
  MargeHT: number;
  quantite: number;
}

interface InventoryProps {
  data: DataType[];
  fetchStock: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ data, fetchStock }) => {
  const [editProduct, setEditProduct] = useState<DataType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (record: DataType) => {
    setEditProduct(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditProduct(null);
    setModalVisible(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Category",
      dataIndex: "category",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Prix Achat HT",
      dataIndex: "prixAchatHT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.prixAchatHT - b.prixAchatHT,
    },
    {
      title: "Prix Vente HT",
      dataIndex: "prixVenteHT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.prixVenteHT - b.prixVenteHT,
    },
    {
      title: "Marge HT",
      dataIndex: "MargeHT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.MargeHT - b.MargeHT,
    },
    {
      title: "Quantite",
      dataIndex: "quantite",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.quantite - b.quantite,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="edit-btn" onClick={() => handleEdit(record)}>
              Edit
            </button>
            <DeletePop productId={record._id} onDeleteSuccess={fetchStock} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      {editProduct && (
        <ModalCompEdit
          product={editProduct}
          onResponseData={() => {
            fetchStock();
          }}
          open={modalVisible} // Pass modalVisible as the open prop
          handleCancel={handleCloseModal}
          setOpen={setModalVisible}
        />
      )}
    </>
  );
};

export default Inventory;
