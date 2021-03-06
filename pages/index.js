import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Row, Col, List } from "antd";
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
import servicePtah from "../config/apiUrl";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../styles/pages/index.css";
import "highlight.js/styles/monokai-sublime.css";

const Home = (props) => {
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

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.id } }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined /> {item.createTime}
                  </span>
                  <span>
                    <FolderOutlined /> {item.typeName}
                  </span>
                  <span>
                    <FireOutlined /> {item.viewCount}人
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

Home.getInitialProps = async () => {
  const res = await axios(servicePtah.getList);
  return res.data;
};

export default Home;
