import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Row, Col, List, Breadcrumb } from "antd";
import servicePtah from "../config/apiUrl";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import axios from "axios";

// https://www.npmjs.com/package/marked
import marked from "marked";
// https://www.npmjs.com/package/highlight.js
import hljs from "highlight.js";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../styles/pages/list.css";
import "highlight.js/styles/monokai-sublime.css";

const ListPage = (props) => {
  const [list, setList] = useState(props.data);

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  useEffect(() => {
    setList(props.data);
  });

  return (
    <div>
      <Head>
        <title>ListPage</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List
            itemLayout="vertical"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.id } }}
                  >
                    <a> {item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined /> 2019-06-28
                  </span>
                  <span>
                    <FolderOutlined /> 视频教程
                  </span>
                  <span>
                    <FireOutlined /> 5369人
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={5}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

ListPage.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await axios(servicePtah.getArticleListById + id);
  return res.data;
};

export default ListPage;
