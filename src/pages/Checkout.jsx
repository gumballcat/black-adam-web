import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  Row,
  Space,
  Statistic,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import CartAction from "redux/actions/CartAction";
import CartService from "services/CartService";
import "styles/css/Checkout.css";

const { Content } = Layout;

const Checkout = ({ cartItems, totalItems, totalPrice }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [data, setData] = useState(cartItems);

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
      title: "Name",
      dataIndex: "name",
      rowKey: "name",
      key: "name",
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
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <Divider orientation="left">Terms</Divider>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
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
              <Button style={{ marginTop: 16 }} type="primary">
                Pay now <CreditCardOutlined />
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    cartItems: state.cart.items,
    totalItems: state.cart.totalItems,
    totalPrice: state.cart.totalPrice,
  };
}

export default connect(mapStateToProps)(Checkout);
