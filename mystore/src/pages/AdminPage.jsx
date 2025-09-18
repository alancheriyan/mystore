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
  Upload,
  Grid,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { useBreakpoint } = Grid;
//const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//const uploadPreset = process.env.env.VITE_CLOUDINARY_UPLOAD_PRESET;


export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleHold } =
    useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const nav = useNavigate();
  const [form] = Form.useForm();

  // 🔹 Cloudinary Upload
  const handleCloudinaryUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        }/upload`,
        { method: "POST", body: data }
      );
      const result = await res.json();
      setImageUrl(result.secure_url);
      form.setFieldValue("image", result.secure_url);
      message.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      message.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Save Product
  const handleSave = async (values) => {
    const cleanValues = {
      ...values,
      short: values.short || "",
      rating: parseFloat(values.rating ?? 0),
      sequence: parseInt(values.sequence ?? 0, 10),
      clicks: editingProduct?.clicks || 0,
      onHold: editingProduct?.onHold || false,
      image: imageUrl || values.image,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, cleanValues);
        message.success("Product updated");
      } else {
        await addProduct(cleanValues);
        message.success("Product added");
      }
      setModalVisible(false);
      setEditingProduct(null);
      setImageUrl("");
      form.resetFields();
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Error saving product");
    }
  };

  // 🔹 Table Columns
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
    { title: "Rating", dataIndex: "rating", render: (r) => r ?? 0 },
    { title: "Seq", dataIndex: "sequence", render: (s) => s ?? 0 },
    {
      title: "Clicks",
      dataIndex: "clicks",
      render: (c) => <Tag color="blue">{c || 0}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="link"
            onClick={() => {
              setEditingProduct(record);
              setModalVisible(true);
              setImageUrl(record.image || "");
              form.setFieldsValue(record);
            }}
          >
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
      {/* Header with Home button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h2 style={{ margin: 0 }}>Admin - Manage Products</h2>
        <Button
          type="text"
          icon={<HomeOutlined style={{ fontSize: 20 }} />}
          onClick={() => nav("/")}
        />
      </div>

      {/* Add Product */}
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setEditingProduct(null);
          setModalVisible(true);
          setImageUrl("");
          form.resetFields();
        }}
        block={isMobile}
      >
        Add Product
      </Button>

      {/* Product Listing */}
      {!isMobile ? (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products}
          pagination={{ pageSize: 6 }}
        />
      ) : (
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
              <p>
                <b>Rating:</b> {record.rating ?? 0}
              </p>
              <p>
                <b>Seq:</b> {record.sequence ?? 0}
              </p>
              {record.image && (
                <img
                  src={record.image}
                  alt={record.title}
                  style={{ width: "100%", marginBottom: 8 }}
                />
              )}
              <Space wrap>
                <Button
                  size="small"
                  onClick={() => {
                    setEditingProduct(record);
                    setModalVisible(true);
                    setImageUrl(record.image || "");
                    form.setFieldsValue(record);
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete?"
                  onConfirm={() => deleteProduct(record.id)}
                >
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

      {/* Modal Form */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={
            editingProduct || { category: "Tech & Gadgets", price: 0, rating: 0 }
          }
          onFinish={handleSave}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select>
              {["Tech & Gadgets", "Home & Kitchen", "Fitness", "Outdoors", "Beauty"].map(
                (c) => (
                  <Option key={c} value={c}>
                    {c}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="rating" label="Rating (0–5, decimals allowed)">
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="sequence" label="Sequence">
            <InputNumber min={0} step={10} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="short" label="Short Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* Cloudinary Image Upload */}
          <Form.Item
            name="image"
            label="Product Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="preview"
                  style={{ width: "100%", marginBottom: 8 }}
                />
              )}
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  handleCloudinaryUpload(file);
                  return false; // stop Antd auto-upload
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </>
          </Form.Item>

          <Form.Item
            name="affiliateUrl"
            label="Affiliate URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Paste affiliate link here" />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => setModalVisible(false)}
              style={{ marginRight: 8 }}
            >
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
