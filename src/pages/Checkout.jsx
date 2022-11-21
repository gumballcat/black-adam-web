import {
  Layout,
  Row,
  Col,
  Table,
  Space,
  Divider,
  Statistic,
  Button,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import "styles/css/Checkout.css";
import { useSelector } from "react-redux";

const { Content } = Layout;

const Checkout = () => {
  const account = useSelector((state) => state.account);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "itemID",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_, record) => (
        <Space size="middle">
          <p>{`$ ${Math.round(record.price).toFixed(2)}`}</p>
        </Space>
      ),
    },
  ];

  let total = 0;
  account.cart.forEach((item) => (total += item.price));

  return (
    <div>
      <Layout>
        <Content className="site-layout-background">
          <h2>
            Total Items <strong>({account.cart.length})</strong>
          </h2>
          <br></br>
          <Table columns={columns} dataSource={account.cart} pagination={false} />
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
                value={`$ ${Math.round(total).toFixed(2)}`}
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

export default Checkout;
