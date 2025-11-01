import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  theme,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled,
  CreditCardFilled,
  AppstoreFilled,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userMenu = (
    <Menu
      items={[
        { key: "profile", icon: <UserOutlined />, label: "Profile" },
        { type: "divider" },
        { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{
          background: "#001529",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: collapsed ? 22 : 20,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.05)",
            margin: 18,
            borderRadius: 8,
          }}
        >
          {collapsed ? "💳" : "StripeApp"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            background: "transparent",
            borderRight: "none",
            fontSize: "15px",
            fontWeight: 500,
          }}
          items={[
            {
              key: "/",
              icon: <HomeFilled style={{ color: "#40a9ff" }} />,
              label: <Link to="/" style={{ color: "#e6f7ff", fontWeight:"bold", textDecoration:"none" }}>Home</Link>,
            },
            {
              key: "/checkout",
              icon: <CreditCardFilled style={{ color: "#13c2c2" }} />,
              label: <Link to="/checkout" style={{ color: "#e6f7ff", fontWeight:"bold", textDecoration:"none" }}>Checkout Payment</Link>,
            },
            {
              key: "/elements",
              icon: <AppstoreFilled style={{ color: "#52c41a" }} />,
              label: <Link to="/elements" style={{ color: "#e6f7ff", fontWeight:"bold", textDecoration:"none" }}>Elements Payment</Link>,
            },
            {
              key: "/subscription",
              icon: <FormOutlined style={{ color: "#faad14" }} />,
              label: <Link to="/subscription" style={{ color: "#e6f7ff", fontWeight:"bold", textDecoration:"none" }}>Subscription</Link>,
            },
          ]}
        />
      </Sider>

      {/* Main Area */}
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "18px", width: 40, height: 40 }}
          />

          <Dropdown overlay={userMenu} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1677ff" }} icon={<UserOutlined />} />
              {!collapsed && <span style={{ fontWeight: 500 }}>Anil</span>}
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: "24px",
            minHeight: "calc(100vh - 112px)",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
