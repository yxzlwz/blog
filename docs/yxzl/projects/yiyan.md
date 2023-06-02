---
title: 异想之旅亿言
date: 2023/06/02 19:18:54
---

## 项目初衷

该项目受到 [Hitokoto - 一言](https://hitokoto.cn/) 的启发（当然其实实现出来也可以说一模一样了），觉得做这样一个在线的句子 API 还是很有意义的，在互联网上垃圾遍地的今天很难见到如此高质量的文字集合了。

然而，一言存在有 API 访问速度慢、句子质量不高、需登录才能提交句子等问题，因此我们决定自己实现一个。

经过迭代后，当前的 [异想之旅亿言](https://yiyan.yixiangzhilv.com/) 诞生了。

![1685704279882](https://cdn.yixiangzhilv.com/images/90b1a268d2fbae98b3228a11a67384d4.png)

## 常见问题

### 如何填写句子来源？

异想之旅鼓励原创，支持互联网版权保护工作，因此建议大家填写来源时首选 **原创者** 。

然而，在数据收集过程中，我们也发现在浩如烟海的互联网寻找一条信息的最初来源是十分困难的。因此，我们也鼓励大家填写自己看到句子时的来源，比如QQ音乐的评论区、知乎的某个回答等等。事实上，这也是鼓励互联网创作的一种做法：试想，亿言如果用户量变多，某天你看到一条来源写着自己网名的句子，是否会有惊喜感？

## API

### 地址

[https://api.yixiangzhilv.com/yiyan/sentence/get/](https://api.yixiangzhilv.com/yiyan/sentence/get/)

### 方法

`GET`

### 请求

**查询字符串参数**

| 参数 | 描述 | 是否必填 | 类型 | 示例值 |
| --- | --- | --- | --- | --- |
| id | 句子的唯一 id 值 | 否 | `int` | 1 |
| author | 句子的作者 | 否 | `string` | 刘慈欣 |
| provenance | 句子的来源 | 否 | `string` | 《三体》 |
| creator | 句子提交者的异想之旅账号 id | 否 | `int` | 1 |
| content | 句子内容，支持部分搜索 | 否 | `string` | 黑暗森林 |
| category | 句子的分类 id，具体参考[本链接](https://api.yixiangzhilv.com/yiyan/category/) | 否 | `int` | 1 |

### 响应

**响应格式** ：JSON

**响应数据**

| 参数 | 描述 | 类型 | |
| --- | --- | --- | --- |
| id | 句子的唯一 id 值 | `int` | |
| author | 句子的作者（若有） | `string` `null` | |
| provenance | 句子的来源（若有） | `string` `null` | |
| creator | 句子提交者的异想之旅账号公开信息（若有） | `object` `null` | |
| content | 句子内容 | `string` | 我有一个梦，也许有一天，灿烂的阳光能照进黑暗森林。 |
| category | 句子的分类信息 | `object` | |

**响应示例**

```json
{
 "id": 182,
 "content": "也许你提倡的禁锢关系到高考结束，会成为两个人终生的遗憾。",
 "provenance": "知乎",
 "author": "龚孜涵",
 "url": "https://www.zhihu.com/question/315272068/answer/732421404",
 "creator": null,
 "category": 2
}
```

补充说明

1. 响应参数中的 `category` 暂时只返回 `int`
2. 在亿言前端项目 [https://yiyan.yixiangzhilv.com/](https://yiyan.yixiangzhilv.com/) 中，也可以在访问时追加上述查询参数。
