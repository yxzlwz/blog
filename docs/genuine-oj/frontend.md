---
title: 前端
date: 2023/06/17 17:10:19
---

## 克隆代码

根据自己所处的网络环境选择以下任意代码：

```bash
git clone https://github.com/genuine-oj/frontend-naive.git
# OR
git clone https://ghproxy.com/https://github.com/genuine-oj/frontend-naive.git
```

## 安装 Node.js 和 yarn

推荐版本：Node.js 16.8.0+

下面给出通过 apt 安装 Node.js 16 的命令，其它系统环境和版本请自行解决：

```bash
sudo apt update
sudo apt install apt-transport-https curl ca-certificates software-properties-common
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

安装 yarn 并更换源站（当然如果服务器不在墙内就不用了）：

```bash
npm install -g yarn --registry=https://registry.npmmirror.com/
yarn config set registry https://registry.npmmirror.com/
```

## 安装依赖

切换到仓库根目录，执行命令：

```bash
yarn
```

## 创建配置文件

复制 `config.example.js` 为 `config.js` （Linux：`cp config.example.js config.js`），并根据自己的需要修改。

```json
const config = {
  name: 'GENUINE-OJ', // 网站标题
  useFooter: true, // 是否启用页脚（不启用无需配置 footer）
  footer: {
    icp: 'ICP-XXXXXXXXXX', // 网站 ICP 备案号
  },
  allowRegister: true, // 是否允许用户注册
  forceHideSubmissions: false, // 是否强制隐藏提交记录
  defaultSentenceApi: 'yxzl', // 首页默认的句子 API（可选 yxzl 或 hitokoto）
  defaultMarkdownTheme: 'vuepress', // 默认的 MarkDown 渲染主题（可选值default|github|vuepress|mk-cute|smart-blue|cyanosis|arknights，可在运行后前往个人设置界面尝试不同选择）
  defaultTheme: 'dark', // 默认使用浅色或深色模式
  defaultSubmitLanguage: 'cpp', // 默认提交代码的语言
  languages: {
    c: 'C',
    cpp: 'C++',
    python3: 'Python 3',
  }, // 所有评测语言，键（冒号前）为语言的标识符，应与后端和评测端保持一致，值（冒号后）为前端显示的名称
};

export default config;
```

## 运行项目

### 开发服务器

```bash
yarn dev
```

该命令将启动一个用于测试的开发服务器，其**性能和稳定性极低**，千万不要图省事将它部署到生产环境！

### 生产服务器

```bash
yarn build
```

该命令将会在当前目录下创建一个名为 `dist` 的文件夹，使用静态文件服务器发布这个文件夹即可使用。

发布时需要注意一个问题：\*\*对于所有找不到对应文件的界面，都需要返回 index.html \*\*，原因是该文件是整个 Vue 应用的入口文件，而页面区分是通过 JavaScript 识别路径、再加载相应 js 文件实现的。Nginx 的示例配置文件见下一部分。

## Nginx 部署

直接使用 Nginx 共享 `dist` 目录会出现两个问题：

1. 每次都必须先访问首页，如果直接访问其它界面，则会抛出 404 错误而非展示 index.html（具体问题详见上一部分）；
1. `/api/` 无法访问到后端服务器。

因此，我们在正式生产环境需要对静态文件服务器进行特殊配置并加入反向代理。Nginx 的配置文件示例如下（牵扯到后端的一些内容，**看不明白可以先去看后端**）：

:::: code-group
::: code-group-item 使用 uwsgi 协议
```nginx
server {
    listen         80;
    server_name    localhost;
    root           /path/to/frontend-naive/dist;
    index          index.html;
    location / {
        try_files  $uri $uri/ /index.html;
    }
    location  /api  {
        client_max_body_size  1024m;  # 允许上传的文件大小，上传测试数据需要
        include     uwsgi_params;
        uwsgi_pass  unix:/srv/socks/oj_backend.sock;
        rewrite     ^/api/(.*)$  /$1  break;
    }
    location  /admin  {
        include     uwsgi_params;
        uwsgi_pass  unix:/srv/socks/oj_backend.sock;
    }
    location  /static  {
        root  /path/to/backend;  # 需要在后端执行导出静态文件
    }
}
```
:::
::: code-group-item 使用端口转发
```nginx
server {
    listen         80;
    server_name    localhost;
    root           /path/to/frontend-naive/dist;
    index          index.html;
    location / {
        try_files  $uri $uri/ /index.html;
    }
    location  /api  {
        client_max_body_size  1024m;  # 允许上传的文件大小，上传测试数据需要
        proxy_pass  http://127.0.0.1:8000;
        rewrite     ^/api/(.*)$  /$1  break;
    }
    location  /admin  {
        proxy_pass  http://127.0.0.1:8000;
    }
    location  /static  {
        root  /path/to/backend;  # 需要在后端执行导出静态文件
    }
}
```
:::
::::

关于“使用 uwsgi”和“使用本地代理转发”的说明（可以先去看后端部署再回来看）：

- 使用 uwsgi：后端程序必须使用 uwsgi 运行，且 uwsgi 启动配置中指定了 `socket` 参数。此处 `uwsgi_pass` 参数的值为 `unix:{path}` ，其中 `path` 为 uwsgi 启动配置中指定的 `socket` 文件的位置。**请注意权限问题**，nginx 的配置文件 `/etc/nginx/nginx.conf` 中第一行指定了运行程序使用的用户（默认为 `www-data`），请确保此处填写的用户具有访问 `uwsgi_pass` 中填写的文件的权限，懒得配置可以指定使用 root 用户启动。
- 使用本地代理转发：当后端使用 `python3 manage.py runserver` 或 uwsgi 监听主机端口的方式启动时使用，`proxy_pass` 参数的值为后端程序监听的主机和端口。

> 一句话告诉不会 Nginx 的用户如何使用（Debian 系操作系统）：执行 `sudo apt install nginx` 安装 Nginx，`sudo vim /etc/nginx/nginx.conf` 参照示例结构加上上方给出的配置，保存并退出后 `sudo nginx -s reload` 或 `systemctl reload nginx` 。如果访问 80 端口出现了“Welcome to nginx”，请删除 `/etc/nginx/sites-enabled/default` 文件。（事实上更规范的话应该把配置文件放到 `/etc/nginx/sites-available/` 中，但是那样子一句话说不完就不说了，正式部署的话自己查吧）。
