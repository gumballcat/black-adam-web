import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import HELPER from "common/HELPER";
import React, { useEffect, useState } from "react";
import "styles/css/ListModal.css";
import ImageUpload from "./ImageUpload";

const EditableCell = ({
  editing,
  record,
  index,
  children,
  column,
  ...restProps
}) => {
  if (!column) {
    return <td {...restProps}>{children}</td>;
  }

  let inputNode;
  if (column.dataType === "number") {
    inputNode = <InputNumber />;
  } else if (column.dataType === "select") {
    inputNode = (
      <Select
        options={column.options}
        mode={column.selectMode}
        styles={{ ...column.styles }}
      />
    );
  } else if (column.dataType === "image") {
    inputNode = <ImageUpload />;
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={column.dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `${column.title} goes here` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListModal = ({
  title,
  pageSize,
  columns,
  source,
  open,
  setOpen,
  actions = [],
  onSaveEdit,
  onAdd,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [addingKey, setAddingKey] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (open) {
      HELPER.HTTP.executeGet(source.endpoint).then((response) => {
        setData(response.content.map((item) => source.dataTransform(item)));
      });
    }
  }, [open, source]);

  const isBusy = () => editingKey !== "" || addingKey !== "";
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const saveEdit = async (key) => {
    const row = form.getFieldsValue(true);
    console.log(row);
    const newData = [...data];

    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = { ...newData[index], ...row };
      if (item.id) {
        onSaveEdit(item);
      } else {
        const addedItem = await onAdd(item);
        item.id = addedItem.id;
      }
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    }

    setData(newData);
    form.resetFields();
    setEditingKey("");
    setAddingKey("");
  };
  const cancelEdit = () => {
    if (editingKey === addingKey) {
      const newData = data.filter((item) => item.key !== addingKey);
      setData(newData);
    }

    form.resetFields();
    setEditingKey("");
    setAddingKey("");
  };

  const add = async () => {
    const row = await form.validateFields();
    let newKey = Math.random();
    let newItem = { ...source.dataTransform(row), key: newKey };
    setData([newItem, ...data]);
    setEditingKey(newKey);
    setAddingKey(newKey);
    setOpen(true);
  };

  const handleDelete = (record) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    onDelete(record);
  };

  const handlePreview = (record) => {
    setShowImageModal(true);
    setImageURL(record.thumbnailUrl);
  };

  const mergedColumns = columns.map((column) => {
    if (column.dataType === "select") {
      return column.editable
        ? {
            ...column,
            render: (_, record) => (
              <span>
                {column.currentOption(record, column.options).toString()}
              </span>
            ),
            onCell: (record) => ({
              record,
              editing: isEditing(record),
              column: { ...column },
            }),
          }
        : column;
    }
    if (column.dataType === "image") {
      return column.editable
        ? {
            ...column,
            render: (_, record) => {
              return record.thumbnailUrl ? (
                <Link onClick={() => handlePreview(record)}>Preview</Link>
              ) : null;
            },
            onCell: (record) => ({
              record,
              editing: isEditing(record),
              column: { ...column },
            }),
          }
        : column;
    }
    return column.editable
      ? {
          ...column,
          onCell: (record) => ({
            record,
            editing: isEditing(record),
            column: { ...column },
          }),
        }
      : column;
  });
  if (actions.includes("edit") || actions.includes("delete")) {
    mergedColumns.push({
      title: "Action",
      dataIndex: "operation",
      render: (_, record) => {
        const editing = isEditing(record);
        return editing ? (
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
              <Typography.Link
                style={{
                  color: "red",
                  marginRight: 8,
                }}
              >
                Cancel
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <>
            {actions.includes("edit") ? (
              <Button
                type="primary"
                shape="round"
                icon={<EditOutlined />}
                disabled={isBusy()}
                onClick={() => edit(record)}
              />
            ) : null}
            {actions.includes("delete") ? (
              <Button
                danger
                type="primary"
                shape="round"
                icon={<DeleteOutlined />}
                disabled={isBusy()}
                onClick={() => handleDelete(record)}
              />
            ) : null}
          </>
        );
      },
    });
  }

  return (
    <>
      <Modal
        open={open}
        title={title}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1500}
        mask={false}
        centered
      >
        <Form form={form} component={false}>
          {actions.includes("add") ? (
            <Button
              onClick={add}
              disabled={editingKey !== ""}
              type="primary"
              style={{ marginBotton: 16 }}
            >
              Add
            </Button>
          ) : null}
          <Table
            rowKey="id"
            columns={mergedColumns}
            dataSource={data}
            components={{ body: { cell: EditableCell } }}
            bordered
            rowClassName={"editable-row"}
            pagination={{
              onChange: cancelEdit,
              defaultPageSize: pageSize ? pageSize : 10,
            }}
          />
        </Form>
      </Modal>

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

export default ListModal;
