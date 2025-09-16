import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Space,
  Popconfirm,
  message,
  Card,
  Grid,
} from "antd";
import { sampleCategories } from "../data/sampleData";
import { useProducts } from "../context/ProductsContext";

const { Option } = Select;
const { useBreakpoint } = Grid;

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleHold } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleSave = (values) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, values);
      message.success("Product updated");
    } else {
      addProduct(values);
      message.success("Product added");
    }
    setModalVisible(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <Space>
          {record.onHold && <Tag color="orange">On Hold</Tag>}
          {text}
        </Space>
      ),
    },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price", render: (p) => `$${p}` },
    { title: "Clicks", dataIndex: "clicks", render: (c) => <Tag color="blue">{c || 0}</Tag> },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => { setEditingProduct(record); setModalVisible(true); }}>
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => deleteProduct(record.id)}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => toggleHold(record.id)}>
            {record.onHold ? "Unhold" : "Hold"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>Admin - Manage Products</h2>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setEditingProduct(null);
          setModalVisible(true);
        }}
        block={isMobile}
      >
        Add Product
      </Button>

      {/* ✅ Desktop: Table view */}
      {!isMobile ? (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products}
          pagination={{ pageSize: 6 }}
        />
      ) : (
        /* ✅ Mobile: Card view */
        <div style={{ display: "grid", gap: 12 }}>
          {products.map((record) => (
            <Card
              key={record.id}
              title={
                <Space>
                  {record.onHold && <Tag color="orange">On Hold</Tag>}
                  {record.title}
                </Space>
              }
              extra={<Tag color="blue">{record.clicks || 0} clicks</Tag>}
            >
              <p>
                <b>Category:</b> {record.category}
              </p>
              <p>
                <b>Price:</b> ${record.price}
              </p>
              <Space wrap>
                <Button size="small" onClick={() => { setEditingProduct(record); setModalVisible(true); }}>
                  Edit
                </Button>
                <Popconfirm title="Delete?" onConfirm={() => deleteProduct(record.id)}>
                  <Button size="small" danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Button size="small" onClick={() => toggleHold(record.id)}>
                  {record.onHold ? "Unhold" : "Hold"}
                </Button>
              </Space>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingProduct || { category: "Tech & Gadgets", price: 0 }}
          onFinish={handleSave}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              {sampleCategories.filter((c) => c !== "All").map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="short" label="Short Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => setModalVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
