import React, { FC, useState } from "react";
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { items, MenuItem } from "../../router";


const { Header, Content, Footer, Sider } = Layout;

const Overview: FC = () => {

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const navigate = useNavigate();

  const _items = items.map(item => ({
    ...item,
    children: item.children?.map((child: MenuItem) => ({
      ...child,
      onClick: () => navigate(child.path)
    }))
  }))

  const onClick = () => setDarkTheme(prevDarkTheme => !prevDarkTheme);

  return (
    <ConfigProvider theme={{ ...theme, algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="demo-logo-vertical" />
          <Menu mode="inline" items={_items}/>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Button
              type="primary"
              onClick={onClick}
              icon={darkTheme ? <span>🌞</span> : <span>🌙</span>}
              style={{ position: "absolute", right: 16, top: 16 }}
            >
              {darkTheme ? "Light Mode" : "Dark Mode"}
            </Button>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                minHeight: 360,
                padding: 24
              }}
            >
             <Outlet/>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()} Created by Sven
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Overview;
