import { Drawer, Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

export default function CategorySider({
  categories,
  selected,
  onSelect,
  visible,
  onClose,
}) {
  return (
    <Drawer
      title="Categories"
      placement="left"
      onClose={onClose}
      open={visible}
      bodyStyle={{ padding: 0 }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        onClick={({ key }) => onSelect(key)}
        items={categories.map((c) => ({
          key: c,
          icon: <AppstoreOutlined />,
          label: c,
        }))}
      />
    </Drawer>
  );
}
