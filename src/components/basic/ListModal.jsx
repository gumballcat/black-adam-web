import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
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
  selectOptions,
  children,
  ...restProps
}) => {
  let inputNode;
  if (inputType === "number") {
    inputNode = <InputNumber />;
  } else if (inputType === "select") {
    inputNode = (
      <Select
        style={{ width: 120 }}
        options={selectOptions}
        mode={"multiple"}
      />
    );
  } else {
    inputNode = <Input />;
  }

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

const ListModal = ({
  title,
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
  const [editingKey, setEditingKey] = useState("");
  const [addingKey, setAddingKey] = useState("");

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
    const row = await form.validateFields();
    const newData = [...data];

    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = { ...newData[index], ...row };
      console.log(row);
      console.log(item);
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      if (item.id) {
        onSaveEdit(item);
      } else {
        onAdd(item);
      }
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

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const mergedColumns = columns.map((column) => {
    if (column.dataType === "select") {
      return column.editable
        ? {
            ...column,
            render: (_, record) => (
              <Select
                disabled={true}
                style={{ width: 120 }}
                defaultValue={
                  column.currentOption(record, column.options).label
                }
              />
            ),
            onCell: (record) => ({
              record,
              inputType: column.dataType,
              dataIndex: column.dataIndex,
              title: column.title,
              editing: isEditing(record),
              selectOptions: column.dataType === "select" ? column.options : [],
            }),
          }
        : column;
    }
    return column.editable
      ? {
          ...column,
          onCell: (record) => ({
            record,
            inputType: column.dataType,
            dataIndex: column.dataIndex,
            title: column.title,
            editing: isEditing(record),
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
              <a>Cancel</a>
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
                onClick={() => handleDelete(record.key)}
              />
            ) : null}
          </>
        );
      },
    });
  }

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
