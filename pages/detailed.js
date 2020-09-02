import Head from "next/head";
import { Row, Col, Breadcrumb, Affix } from "antd";
import axios from "axios";
import servicePtah from "../config/apiUrl";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
// https://www.npmjs.com/package/marked
import marked from "marked";
// https://www.npmjs.com/package/highlight.js
import hljs from "highlight.js";
// import MarkNav from "markdown-navbar";
import Header from "../components/Header";
import Auttor from "../components/Author";
import Avdert from "../components/Advert";
import Footer from "../components/Footer";
import Tocify from "../components/Tocify.tsx";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/pages/detailed.css";

const Detailed = (props) => {
  const renderer = new marked.Renderer();

  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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
  const { data } = props;
  const markdown = data.articleContent;
  let html = marked(markdown);

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/">视频列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{data.typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <div className="detailed-title">
              React实战视频教程-技术胖Blog开发(更新08集)
            </div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined />
                {data.createTime}
              </span>
              <span>
                <FolderOutlined />
                {data.typeName}
              </span>
              <span>
                <FireOutlined />
                {data.viewCount}人
              </span>
            </div>

            <div className="detailed-content">
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={5}>
          <Auttor />
          <Avdert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
              {/* <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              /> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Detailed.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await axios(servicePtah.getArticleById + id);
  return res.data;
};

export default Detailed;
