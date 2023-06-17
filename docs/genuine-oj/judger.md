# 评测端和评测沙箱

## 安装评测沙箱

### 克隆代码

```bash
git clone https://github.com/genuine-oj/judger-core.git
# OR
git clone https://ghproxy.com/https://github.com/genuine-oj/judger-core.git
```

### 安装前置依赖

```bash
sudo apt-get install libseccomp-dev python3-dev
```

### 编译并安装

```bash
mkdir build && cd build && cmake .. && make
sudo make install
cd ..  # 回到项目根目录
cd wrapper
sudo python3 setup.py install
```

## 克隆评测端代码

```bash
git clone https://github.com/genuine-oj/judger.git
# OR
git clone https://ghproxy.com/https://github.com/genuine-oj/judger.git
```

## 创建用户和用户组

在 `judger` 目录中：

```bash
sudo chmod 777 deploy.sh
sudo ./deploy.sh
```

## 修改测试数据目录

在 `config.py` 中：

```python
...
BASE_DIR = Path('/judger').resolve()  # 这是评测过程中临时数据的存放位置
...
TEST_CASE_DIR = Path(__file__).resolve().parent.parent / 'backend/judge_data/test_data'  # 这是测试数据的存放位置，和后端程序中设置的 TEST_DATA_ROOT 应一致
...
```

**注意：路径变量的类型必须为 **`**Path**`** 对象！**

## 安装 Python 依赖

由于评测端运行时需要访问 `/judger/` 目录，图省事可以直接用 root 运行。不必担心安全问题，因为真正运行用户代码的另有其人。

```bash
sudo pip3 install -r requirements.txt
pip3 install -r requirements.txt  # 如果你不想用 root 的话
```

## 运行评测端

不用 root 运行的话请自行创建文件夹 `/judger/` 并为运行程序的用户设置好权限：

```bash
sudo python3 server.py
```

**已知问题：评测端在完成一定数量的评测后可能会出现对运行内存统计异常的问题（表现为提交莫名TLE），目前正在商讨解决方案中，暂时可通过定时任务重启评测端的方式解决此问题。**
