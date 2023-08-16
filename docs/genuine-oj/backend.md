---
title: 后端
date: 2023/06/17 17:09:06
---

## 环境准备

本文默认的系统环境为 Ubuntu 22.04，其它系统环境请自行寻找“环境准备”部分的解决方案。

apt 下载速度过慢可参考下面的网页进行换源。

[ubuntu | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

### 安装 Python 和 pip

建议的 Python 版本为 3.8+，最低版本不得低于 3.7

```bash
# 安装
sudo apt update
sudo apt install python3
sudo apt install python3-pip

# pip 换源（如果服务器在中国大陆）
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 安装 Redis

```bash
sudo apt install redis-server
systemctl daemon-reload

systemctl start redis-server  # 启动
systemctl stop redis-server  # 停止
systemctl enable redis-server  # 开机自启
```

以上代码**在 WSL 中将无法正常工作**，需要改用`service redis-server [option]`

### 安装 RabbitMQ

```bash
sudo apt install rabbitmq-server
systemctl daemon-reload
```

其它命令同 Redis 。

### 安装 PostgreSQL

仓库中的代码暂时只对 PostgreSQL 做了适配，若要使用 MySQL 等其它关系型数据库，请确保自己有能力完成代码修改。

安装和配置外网访问参考：[Debian 11 服务器配置日记](/blogs/20220816155931.html)

创建数据库和为用户授权参考：[MySQL 和 PostgreSQL 数据库的运维笔记](/blogs/20221003164442.html)

准备好数据库和用户即完成此步骤，数据表的管理将在后面由 Django 负责。

::: warning
务必记牢自己的用户名和密码！务必给准备使用的用户赋予准备使用的数据库上的所有权限！
:::

## 克隆代码

老规矩，下面的代码三选一自己挑：

```bash
git clone https://github.com/genuine-oj/backend.git
# OR
git clone https://ghproxy.com/https://github.com/genuine-oj/backend.git
```

## 安装 Python 依赖

进入`backend`目录后：

```bash
pip3 install -r requirements.txt
```

另贴出我在腾讯云的服务器上使用 Ubuntu 20.04 安装时遇到的报错及解决方案：[AttributeError: module ‘lib’ has no attribute ‘X509_V_FLAG_CB_ISSUER_CHECK’](https://stackoverflow.com/a/74243128/16145283)

## 生成密钥文件

进入`backend`目录后：

```bash
echo $(python3 -c "from django.core.management import utils;print(utils.get_random_secret_key())") > secret.key
```

::: danger
请务必妥善保存生成的密钥文件`secret.key`，丢失密钥文件将导致严重的后果，包括但不限于数据库中保存的用户密码全部失效（即使你有数据库备份）。
:::

## 环境变量

我们需要将一些配置设置到环境变量中以指定数据库。

| 名称 | 说明 | 必填/默认值 |
| --- | --- | --- |
| OJ_MODE | 可选 DEVELOPMENT、TEST、PRODUCTION，其中 DEVELOPMENT 会使用 SQLite 数据库，DEVELOPMENT 和 TEST 都会配置`DEBUG = True`| DEVELOPMENT |
| OJ_SQL_HOST | PostgreSQL HOST | localhost |
| OJ_SQL_PORT | PostgreSQL PORT | 5432 |
| OJ_SQL_USER | PostgreSQL 登录用户名 | 必填 |
| OJ_SQL_PASSWORD | PostgreSQL 登录密码 | 必填 |
| OJ_SQL_NAME | PostgreSQL 数据库名称 | oj |
| OJ_PROBLEM_FILE_ROOT | 题目附件（由管理员在题目编辑页面上传，可供对该题目有访问权限的用户下载） |`BASE_DIR / 'problem_files'`|
| OJ_JUDGE_DATA_ROOT | 题目的测试点数据，以及每个提交的数据输出 |`BASE_DIR / 'judge_data'`|
| OJ_ALLOW_REGISTER | 是否允许注册，应与前端设置保持一致 | TRUE |
| OJ_FORCE_HIDE_SUBMISSION | 是否强制隐藏所有提交（隐藏后仅本人和管理员可见） | FALSE |

::: info
前端设置位置：在网站架设好后，登录管理员账号，鼠标移至右上角用户名处，选择弹出下拉菜单的站点管理，在其中配置并保存即可。
:::

下面是一个示例：

```bash
# 模式
export OJ_MODE=PRODUCTION  # 设置为 production 则默认使用 PostgreSQL，否则采用开发配置 SQLite

# 数据库配置
export OJ_SQL_HOST=127.0.0.1 # 数据库主机，默认 localhost
export OJ_SQL_PORT=5432  # 数据库端口，默认 5432
export OJ_SQL_USER=sql_username  # 数据库用户名，必填
export OJ_SQL_PASSWORD=sql_password  # 数据库用户密码
export OJ_SQL_NAME=sql_database  # 数据库名称，必填

# 路径配置
# export OJ_PROBLEM_FILE_ROOT=/data/problem_files/  # 题目附件保存目录
# export OJ_JUDGE_DATA_ROOT=/data/judge_data/  # 评测数据保存目录

# 更多配置
export OJ_ALLOW_REGISTER=TRUE  # 是否允许注册
export OJ_FORCE_HIDE_SUBMISSION=FALSE  # 是否隐藏所有提交
```

为了方便起见，可以在`backend`目录下创建一个文件`production.env`，这样子以后只需要执行`source production.env`即可完成设置。

::: warning
每次开启终端都需要执行一次`source production.env`！运行后端程序和启动 Celery 进程均需要正确的环境变量！
:::

## 初始化数据库

执行下面的命令完成数据库迁移：

```bash
python3 manage.py makemigrations oj_user
python3 manage.py migrate
python3 manage.py makemigrations oj_problem oj_submission oj_contest
python3 manage.py migrate
```

## 设置评测数据路径

默认情况下，`backend`目录中会存在有如下的结构：

```bash
|-backend 后端程序根目录
  |-judge_data 评测数据
    |-spj 特殊评测源代码，可以存放于其他位置，需要修改SPJ_ROOT
    |-test_data 评测数据，可以存放于其他位置，需要修改TEST_DATA_ROOT
    |-submission 用户输出，可以存放于其他位置，需要修改SUBMISSION_ROOT
```

这样子将应用程序和放在一起的做法自由度较低（例如需要将数据存放于系统盘之外的位置等），可以通过修改`oj_backend/settings.py`中的`SPJ_ROOT``TEST_DATA_ROOT``SUBMISSION_ROOT`三个变量指定位置。

你可以在此处自由设置存放位置，但是记得在评测端的配置文件中要设置与此处一致的值。

::: tip
注意路径配置中中划线和下划线的区分！测试过程中我曾因为这个问题调了好久...
:::

## 导出静态文件

在`backend`目录下：

```bash
python3 manage.py collectstatic
```

如果需要更改这一目录，请在`settings.py`中更改`STATIC_ROOT`的值。

这个配置用于保证`/admin/`界面工作正常，当 nginx 部署时需要。

## 创建第一个用户

在`backend`目录下：

```bash
python3 manage.py createsuperuser
```

此命令将用于创建一个超级用户。通过前端页面直接注册的用户不具有管理员权限，无法创建、管理题目、比赛等。

## 启动 celery 异步任务模块

::: tip
在测试时，可以使用 screen 工具。
:::

```bash
celery -A oj_backend worker -l info -P eventlet  # windows
celery -A oj_backend worker -l info  #linux
```

该模块将通过 WebSocket 与评测端通信，用于将用户提交的代码交给评测端评测、接收评测端的返回数据并存入数据库中。

## 启动 Django 应用

确保环境变量配置正确后：

```bash
python3 manage.py runserver
```

此处无需配置监听`0.0.0.0`也能正常在外网访问，因为我们访问后端时是通过前端项目的`/api`路径，数据需要经过前端服务器在本地转发。

## Django 应用的部署

### 安装 uWsgi

```bash
pip3 install uwsgi
```

### 创建 uWsgi 配置文件

下面的配置文件应存放于`backend`文件夹根目录中（别的地方也可以，但是路径就要自己试错去了哈哈哈）。

```bash
[uwsgi]
socket=/srv/socks/oj_backend.sock  # 与前端 Nginx 配置文件中的 uwsgi_pass 参数一致
pidfile=/srv/pids/oj_backend.pid  # 用于配置热重载
chdir=/srv/oj/backend/  # backend 文件夹的绝对路径
wsgi-file=oj_backend/wsgi.py  # wsgi 文件的路径，通常无需修改

# 配置环境变量，将前面设置环境变量的语句中的`export`替换为`env=`后粘贴至此即可
env=OJ_MODE=production
...

master=True
processes=5
threads=5
vacuum=true
die-on-term=true
logto=/dev/null  # 日志位置，按需填写
```

确保用于运行 uWsgi 的用户拥有配置文件中所填路径的所需权限。

### 启动

在`backend`目录下：

```bash
uwsgi --ini /srv/oj/backend/uwsgi.ini  # 上一步创建的配置文件所处的路径
```

该命令将会阻塞运行，如有需要可通过检查`socket`和`pidfile`中指定的文件是否被创建来判断程序是否运行成功。

测试时可以使用 Linux 的 screen 工具来使该进程在后台运行，部署时建议使用 systemctl 管理。

### 重启和停止

pid 文件即为 uWsgi 配置文件中设置的值。

```bash
uwsgi --reload /srv/pids/oj_backend.pid  # 热重载
uwsgi --stop /srv/pids/oj_backend.pid  # 停止
```

### Nginx 配置文件

参考[前端部署](./frontend.html)中的相关描述。
