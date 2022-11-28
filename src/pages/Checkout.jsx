import { DeleteOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Layout,
  Row,
  Space,
  Statistic,
  Table,
  Input,
  Button,
} from "antd";
import {  Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import CartAction from "redux/actions/CartAction";
import CartService from "services/CartService";
import "styles/css/Checkout.css";
import HELPER from "common/HELPER";
import ENDPOINTS from "common/ENDPOINTS";

const { Content } = Layout;

const Checkout = ({ isLoggedIn, token, cartItems, totalItems, totalPrice }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [form] = Form.useForm();
  const [data, setData] = useState(cartItems);
  const [isModalShow, setIsModalShow] = useState(false);

  const onSubmit = () => {
    const phone = form.getFieldValue("phone");
    const street = form.getFieldValue("street");
    const district = form.getFieldValue("district");
    const province = form.getFieldValue("province");
    const city = form.getFieldValue("city");
    const zipCode = form.getFieldValue("zipCode");

    if (isLoggedIn) {
      HELPER.HTTP.executePost(ENDPOINTS.ADD_ORDER, {
        headers: { Authorization: `Bearer ${token}` },
        body: {
          orderItems: data.map((item) => {
            return { productId: item.id, quantity: item.quantity };
          }),
          address: { city, district, province, street, zipCode },
          phone,
        },
      });
    }

    dispatch(CartAction.set({items: [], totalPrice: 0, totalItems: 0}))
    form.resetFields();
    setIsModalShow(false);
  };

  const handleDelete = (removedItem) => {
    const itemsInCart = [...cartItems];
    let iTotalPrice = totalPrice;
    let iTotalItems = totalItems;
    let quantity = 0;

    for (const [index, item] of itemsInCart.entries()) {
      if (item.id === removedItem.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          quantity = item.quantity;
        } else {
          itemsInCart.splice(index, 1);
        }

        iTotalItems -= 1;
        iTotalPrice -= item.price;

        break;
      }
    }

    dispatch(
      CartAction.set({
        items: itemsInCart,
        totalPrice: iTotalPrice,
        totalItems: iTotalItems,
      })
    );

    CartService.setItem(account.token, removedItem.id, quantity);

    setData([...itemsInCart]);
  };

  useEffect(() => {
    setData([...cartItems]);
  }, [cartItems]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      rowKey: "itemID",
      key: "itemID",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      rowKey: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      key: "price",
      rowKey: "price",
      dataIndex: "price",
      render: (_, record) => (
        <Space size="middle">
          <p>{`$ ${Math.round(record.price).toFixed(2)}`}</p>
        </Space>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      rowKey: "quantity",
      dataIndex: "quantity",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Button
            danger
            type="primary"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Layout>
          <Content className="site-layout-background">
            <h2>
              Total Items <strong>({totalItems})</strong>
            </h2>
            <br></br>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Divider orientation="right"></Divider>
            <Row justify="start">
              <Col md={12}>
                <Divider orientation="left">Policy</Divider>
                <p>We accept no returns</p>
                <Divider orientation="left">Terms</Divider>
                <p>
                  1. Submitting orders means you agree to let us store your
                  personal information for order fulfillment purposes
                  <br />
                  2. And cookies and etcetera
                  <br />
                  3. Peace out
                </p>
              </Col>
            </Row>
            <br></br>
            <Row justify="end">
              <Col>
                <Statistic
                  title="Total (tax incl)."
                  value={`$ ${Math.round(totalPrice).toFixed(2)}`}
                  precision={2}
                />
                <Button
                  onClick={() => setIsModalShow(true)}
                  style={{ marginTop: 16 }}
                  type="primary"
                >
                  Proceed
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>

      <Modal
        centered
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        onCancel={() => setIsModalShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Shipping Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Street" name="street">
              <Input />
            </Form.Item>
            <Form.Item label="District" name="district">
              <Input />
            </Form.Item>
            <Form.Item label="Province" name="province">
              <Input />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
            <Form.Item label="Zip Code" name="zipCode">
              <Input />
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button onClick={onSubmit} type="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.account.auth === 1,
    token: state.account.token,
    cartItems: state.cart.items,
    totalItems: state.cart.totalItems,
    totalPrice: state.cart.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
