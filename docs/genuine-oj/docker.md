---
title: 使用 Docker 部署和更新
date: 2023/10/02 13:45:55
---

## 安装 Docker

这部分不是本文要探讨的重点，请大家根据自己的系统自行搜索安装 Dcoker CE 和 Docker Compose。

需要注意的是，Docker 版本至少需要为 20.10.0（具体详见参考资料2），可通过`docker -v`查看版本号，若更低需升级，CentOS可参考[Centos7上升级docker版本_centos7升级docker-CSDN博客](https://blog.csdn.net/sunny05296/article/details/107348225)。

本文的测试环境：

```bash
[root@VM-8-17-centos deploy]# docker -v
Docker version 24.0.6, build ed223bc
[root@VM-8-17-centos deploy]# docker-compose -v
docker-compose version 1.18.0, build 8dd22a9
```

## 克隆仓库

```bash
git clone https://github.com/genuine-oj/deploy.git
# OR
# git clone https://ghproxy.com/https://github.com/genuine-oj/deploy.git
```

## 修改配置

此处是一些较底层的、与服务器相关的配置信息。更多与站点和页面相关的设置，请在搭建完成后登录管理员账号，前往后台管理页面中修改。

直接用 vim 打开 `.env` 文件：

```bash
vim .env
```

修改其中的配置项即可，具体含义见注释。

## 构建和运行

```bash
# 构建前端项目
docker compose -f docker-compose.builder.yml build
docker compose -f docker-compose.builder.yml run --rm build-frontend

# 其它容器的构建
docker compose build
mkdir -p ./data/backend
touch ./data/backend/secret.key
# 此处无需手动输入密钥，容器运行时会自动检测和初始化

# 运行
docker compose up -d
```

::: info
当你在后期需要更新项目时，**只需要**执行这一步，需要注意的是更新时须在两条以`build`结尾的命令后面加上`--no-cache`以保证从GitHub拉去更新。
:::

此时看到如下的返回即为运行成功。

```bash
[root@VM-8-17-centos deploy]# docker compose up -d
[+] Running 6/6
 ✔ Container oj-rabbitmq      Running
 ✔ Container oj-redis         Healthy
 ✔ Container oj-judge-server  Healthy
 ✔ Container oj-postgres      Healthy
 ✔ Container oj-backend       Started
 ✔ Container oj-frontend      Started
```

如果出现错误，可以通过`docker compose logs xxx`查看日志，其中`xxx`为容器名。对于自己无法解决的问题，[提交 Issue](https://github.com/genuine-oj/deploy/issues/new) 时也请**附上日志**。

## 参考资料

- [docker-compose : Unsupported config option for services service: 'web' - Stack Overflow](https://stackoverflow.com/questions/36724948/docker-compose-unsupported-config-option-for-services-service-web/63570531#63570531)
- [latest 11-jdk on ubuntu jammy breaks keytool -importcert · Issue #215 · adoptium/containers](https://github.com/adoptium/containers/issues/215#issuecomment-1142046045)
- [docker-compose清理缓存_mob649e8166c3a5的技术博客_51CTO博客](https://blog.51cto.com/u_16175510/7310138)
