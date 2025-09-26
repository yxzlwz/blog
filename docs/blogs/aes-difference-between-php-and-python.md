---
title: PHP和Python中AES算法不统一的问题
createTime: 2024/11/16 20:57:00
tags:
  - 后端

---

## 背景

在使用多吉云视频SDK时，使用Python[计算签名](https://docs.dogecloud.com/vcloud/manual-play-token)得到的结果使用时报错：“playToken 解密失败...”。

官方只给出了PHP的示例代码，由于本人不会PHP（事实上这个问题来个会PHP的人也几乎不可能知道），我花了4小时时间配置环境+测试PHP代码，最终再把表现异常的问题在Google中翻了一页又一页，终于看到了后文附的一篇来自某英国大佬的回答。

这个大佬已经注册Stack Overflow（全球最大的编程问题交流平台）15年有余，而且主业是Rust语言，来客串Python和PHP场帮助到了我实属逆天。有条件的去给那个回答点个赞同吧。

## Python代码

分别由 gpt-4o 和 claude3.5-sonnet 生成得到类似结果，下附一份与多吉云官方PHP示例格式和注释最接近的：

```python
import base64
import hmac
import json
import time
from hashlib import sha1

# 需要安装 pip install pycryptodome
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# 定义密钥和vcode
SecretKey = 'MY_SECRET_KEY'.encode()
vcode = '70804c544d067f03'


def generate_playtoken():

    # 生成播放策略
    myPolicy = json.dumps({
        "e": int(time.time()) + 120,
        "v": vcode,
        "full": True
    })

    # 生成随机IV
    iv = get_random_bytes(16)

    # 进行加密（使用pycryptodome库）
    cipher = AES.new(SecretKey, AES.MODE_CFB, iv, segment_size=128)
    encrypted_data = cipher.encrypt(myPolicy.encode())

    # Base64编码第一段
    encoded_data = base64.b64encode(encrypted_data).decode()

    # Base64编码IV（第二段）
    encoded_iv = base64.b64encode(iv).decode()

    # 进行HMAC-SHA1计算并Base64编码（第三段）
    hashed_data = base64.b64encode(
        hmac.new(SecretKey, myPolicy.encode(), sha1).digest()).decode()

    # 拼接得到最终的播放令牌
    playToken = f"{encoded_data}:{encoded_iv}:{hashed_data}"

    # 替换特殊符号
    playToken = playToken.replace("+", "-").replace("/", "_")

    return playToken


generate_playtoken()
```

其中第29行的`segment_size=128`是一个平时不会使用但此处必要的参数，为了和 PHP 保持统一。

## 参考资料

这也是我在全网找到的唯一一份真正与我遇到问题有关的资料：<https://stackoverflow.com/a/46354693/16145283>

下附原文。

To use [CFB mode](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Feedback_.28CFB.29) you need to specify a segment size for it. OpenSSL has aes-256-cfb (which is 128 bit), aes-256-cfb1 (i.e. 1-bit) and aes-256-cfb8 (8 bit) (and similar modes for AES-128 and 192). So you are using 128 bit cfb in your php code.

The Python library accepts a segment_size argument to AES.new, but the default is 8, so you are using different modes in the two versions.

To get the Python code to decrypt the output of the PHP code, add a segment size of 128 to the cipher object:

```python
cipher = AES.new(encryption_key, AES.MODE_CFB, iv, segment_size=128)
```

(N.B. this is using the newer [PyCryptodome fork](https://github.com/Legrandin/pycryptodome) of PyCrypto. PyCrypto has a bug here and won’t work.)

Alternatively, you can get the PHP code to use CFB-8 by setting the cipher (don’t change both, obviously):

```php
$encrypted = openssl_encrypt($data, 'aes-256-cfb8', $encryption_key, 1, $iv);
```

## 个人看法

PHP放在2024年实在是有些过时了，伪代码写不明白还只提供PHP示例的文档好自为之……
