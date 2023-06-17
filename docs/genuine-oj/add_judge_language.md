---
title: 添加评测语言
date: 2023/06/17 17:34:24
---

评测语言的添加涉及三个位置：前端`config.js`文件中的`languages`，后端`oj_submission/models.py`中的`LanguageChoices`，以及评测端的`languages.py`。

## 前端

在`languages`中添加键值对。键对应后端使用的标识符，值则对应前端展示时使用的值。

## 后端

在`LanguageChoices`中添加一项属性，属性变量名建议与前端使用的键相同，值为一个二元元组，第一项务必与前端`languages`中使用的键相同，第二项为后端展示时使用的值，也建议与前端相同。

添加完后需要执行`python3 manage.py makemigrations`和 `python3 manage.py migrate`。**如果是更新生产环境，记得设置环境变量。**

## 评测端

首先确保系统上安装有对应语言的编译和运行环境。

在`languages.py`中添加对应语言的编译和运行参数，具体可参考 [@QingdaoU 的实现](https://github.com/QingdaoU/JudgeServer/blob/master/client/Python/languages.py)。

特别说明的是，即使该语言不需要编译（例如 JavaScript），也需要填写`src_name`，此处给出一个示例：

```python
{
    'javascript': {
        'compile': {
            'src_name': 'solution.js',
            'exe_name': 'solution.js',
            'compile_command': None,
        },
        'run': {
            'command': 'node {exe_path}',
            'seccomp_rule': 'general',
            'env': DEFAULT_ENV,
        },
    }
}
```

（真的就给个例子，这个例子我没试过，出事别怪我（））

（另记得评测端和 Celery 都没有热重载，写完代码需要手动重启，可别和我一样被这个忽悠了）

::: info
事实上，对于 C、C++ 等语言，`seccomp_rule`一项应使用特殊配置文件。然而经过我们测试，使用其它配置文件都会导致评测时莫名 RE，故目前统一使用 general。
:::
