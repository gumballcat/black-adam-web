import {
  Modal,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  InputNumber,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListModal = ({ title, columns, originalData, open, setOpen, expandable }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originalData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldValue({
      ...record
    });
    setEditingKey(record.key);
  };
  const cancelEdit = () => {
    setEditingKey("");
  }
  const saveEdit = async (key) => {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if(index >= 0){
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
      }
  }

  columns.append({
    key: "x",
    title: "Action",
    dataIndex: "",
    render: (_, record) => <>

    </>,
  });
  return (
    <Modal
      open={open}
      title={title}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <Table
        columns={columns}
        expandable={
          expandable
            ? {
                expandedRowRender: (record) => (
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    {record.description}
                  </p>
                ),
                rowExpandable: (record) => record.description,
              }
            : {}
        }
        dataSource={originalData}
      />
    </Modal>
  );
};

export default ListModal;
