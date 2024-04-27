import React, { FC, useEffect, useState } from "react";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { items, MenuItem } from "../../router";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const { Header, Content, Footer, Sider } = Layout;

const Overview: FC = () => {

  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const setAccessToken = async () => {
    const accessToken = await getAccessTokenSilently();
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }

  const _items = items.map(item => ({
    ...item,
    children: item.children?.map((child: MenuItem) => ({
      ...child,
      disabled: !isAuthenticated,
      onClick: () => navigate(child.path)
    }))
  }));

  const onClick = () => setDarkTheme(prevDarkTheme => !prevDarkTheme);

  return (
    <ConfigProvider theme={{ ...theme, algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="demo-logo-vertical" />
          <Menu mode="inline" items={_items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <div
              style={{ gap: 10, position: "absolute", right: 16, top: 16 }}
            >
            <Button
              type="primary"
              onClick={onClick}
              icon={darkTheme ? <span>🌞</span> : <span>🌙</span>}
            >
              {darkTheme ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button
              type="primary"
              // @ts-ignore
              onClick={loginWithRedirect}
            >Log In</Button>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                minHeight: 360,
                padding: 24
              }}
            >
              {isAuthenticated && <Outlet />}
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
