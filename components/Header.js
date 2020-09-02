import React, { useState, useEffect } from "react";
import Router from "next/router";
import "../styles/components/header.css";
import { Row, Col, Menu } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import * as Icons from "@ant-design/icons";

const Header = (props) => {
  const [navList, setNavList] = useState([]);

  useEffect(() => {
    axios(servicePath.getArticleTypeList).then((res) => {
      setNavList(res.data);
    });
  }, []);

  const handleClick = (e) => {
    if (e.key === "0") {
      Router.push("/");
    } else {
      Router.push(`/list?id=${e.key}`);
    }
  };

  return (
    <div className="header">
      <Row justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">LDY</span>
          <span className="header-txt">专注前端技术开发</span>
        </Col>
        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              {React.createElement(Icons.HomeOutlined)}
              博客首页
            </Menu.Item>
            {navList.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  {React.createElement(Icons[item.icon_name])}
                  {item.type_name}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
