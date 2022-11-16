import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import HELPER from "common/HELPER";
import React, { useEffect, useState } from "react";
import "styles/css/ListModal.css";

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
          style={{ margin: 0 }}
          rules={[{ required: true, message: `${title} goes here` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListModal = ({ title, columns, source, open, setOpen, onSaveEdit }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [addingKey, setAddingKey] = useState("");

  useEffect(() => {
    HELPER.HTTP.executeGet(source.endpoint).then((response) => {
      setData(source.dataTransform(response));
    });
  }, [source]);

  const isBusy = () => editingKey !== "" || addingKey !== "";
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const saveEdit = async (key) => {
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(newData);
      setEditingKey("");
      setAddingKey("");
      onSaveEdit(item);
    } else {
      newData.push(row);
      setData(newData);
      setEditingKey("");
    }
  };
  const cancelEdit = () => {
    if (editingKey === addingKey) {
      const newData = data.filter((item) => item.key !== addingKey);
      setData(newData);
    }
    setEditingKey("");
    setAddingKey("");
  };

  const add = () => {
    if (editingKey === "") {
      let newKey = Math.random();
      let newItem = { key: newKey };
      setData([newItem, ...data]);
      setEditingKey(newKey);
      setAddingKey(newKey);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const mergedColumns = columns.map((column) => {
    if (!column.editable) {
      return column;
    }
    return {
      ...column,
      onCell: (record) => ({
        record,
        inputType: column.dataType,
        dataIndex: column.dataIndex,
        title: column.title,
        editing: isEditing(record),
      }),
    };
  });
  mergedColumns.push({
    title: "Action",
    dataIndex: "operation",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => saveEdit(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancelEdit}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            disabled={isBusy()}
            onClick={() => edit(record)}
          />
          <Button
            danger
            type="primary"
            shape="round"
            icon={<DeleteOutlined />}
            disabled={isBusy()}
            onClick={() => handleDelete(record.key)}
          />
        </>
      );
    },
  });

  return (
    <Modal
      open={open}
      title={title}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      mask={false}
      centered
    >
      <Form form={form} component={false}>
        <Button
          onClick={add}
          disabled={editingKey !== ""}
          type="primary"
          style={{ marginBotton: 16 }}
        >
          Add
        </Button>
        <Table
          columns={mergedColumns}
          dataSource={data}
          components={{ body: { cell: EditableCell } }}
          bordered
          rowClassName={"editable-row"}
          pagination={{
            onChange: cancelEdit,
          }}
        />
      </Form>
    </Modal>
  );
};

export default ListModal;
