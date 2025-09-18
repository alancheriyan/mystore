import { Link } from "react-router-dom";
import { Layout, Input, Button, Typography, Grid, Drawer } from "antd";
import {
  ShoppingOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function AppHeader({ onSearch, onToggleSider }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // md = 768px breakpoint
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button type="text" icon={<MenuOutlined />} onClick={onToggleSider} />
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <ShoppingOutlined style={{ fontSize: 22, color: "#1890ff" }} />
          {!isMobile && (
            <Title level={4} style={{ margin: 0 }}>
              Deal Snap
            </Title>
          )}
        </Link>
      </div>

      {/* Right side */}
      {isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={() => setSearchOpen(true)}
          />
          <Link to="/best-deals">
            <Button type="primary" size="small">
              Deals
            </Button>
          </Link>

          {/* Search drawer for mobile */}
          <Drawer
            placement="top"
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            bodyStyle={{ padding: 16 }}
            height="auto"
          >
            <Input.Search
              placeholder="Search products..."
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={(val) => {
                onSearch(val);
                setSearchOpen(false);
              }}
            />
          </Drawer>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Input.Search
            placeholder="Search products..."
            allowClear
            onSearch={onSearch}
            style={{ width: 260 }}
            enterButton={<SearchOutlined />}
          />
          <Link to="/best-deals">
            <Button type="primary">Best Deals</Button>
          </Link>
        </div>
      )}
    </Header>
  );
}
