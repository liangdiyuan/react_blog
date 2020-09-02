import { Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons";
import "../styles/components/author.css"

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar
          size={100}
          src="/static/image/author.jpg"
        />
      </div>
      <div className="author-introduction">
      专注于WEB和移动前端开发。此地维权无门。专注于WEB和移动前端开发。此地维权无门，此时无能为力，此心随波逐流。
      </div>
      <Divider>社交账号</Divider>
      <GithubOutlined className="account" />
      <QqOutlined className="account" />
      <WechatOutlined className="account" />
    </div>
  );
};

export default Author;
