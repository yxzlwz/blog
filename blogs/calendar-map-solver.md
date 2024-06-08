---
title: Python计算Ant Puzzle日历拼图解法
date: 2024/06/08 20:49
categories:
- 杂谈
tags:
- 算法
---

> 信竞退役这么久，难得又有了一篇可以打算法tag的文章。

前两天收到 ncc 同学送的生日礼物——

![](https://cdn.yixiangzhilv.com/images/f0d5f0146bafe07bddfdc960abbf6f6b.jpg)

一个需要每天手动重新拼拼图的日历

然而，我研究了许久……一个日期也没拼出来\[手动裂开\]

正在我一筹莫展的时候我想到了我的专业：

![](https://cdn.yixiangzhilv.com/images/04ff9d785e0de21d342ebc95b653e584.png)

那么剩下的事情就变得简单了！


:::: code-group
::: code-group-item main.py

```python
from blocks import blocks, total_blocks
from map import MAP, set_date


def output():
    for line in MAP:
        print(" ".join(f"{num:>{3}}" for num in line))


def dfs(block_cnt):
    if block_cnt == total_blocks:
        print("Success!")
        output()
        exit(0)

    # 寻找可放置拼图的点
    for x in range(len(MAP) - 1):
        for y in range(len(MAP[x])):
            if MAP[x][y] != 0:
                continue
            try:
                if MAP[x - 1, y] != 0 and MAP[x, y - 1] != 0 and MAP[
                        x + 1, y] != 0 and MAP[x, y + 1] != 0:
                    return
            except:
                ...
            # 尝试以这个点为左上角放置拼图
            for block in blocks[block_cnt]:
                # 检测该拼图是否能放置
                flag = True
                try:
                    for dot in block:
                        if MAP[x + dot[0]][y + dot[1]] != 0:
                            flag = False
                            break
                except IndexError:
                    flag = False
                if not flag:
                    continue
                for dot in block:
                    MAP[x + dot[0]][y + dot[1]] = block_cnt + 1
                # print(x, y, block_cnt + 1)
                dfs(block_cnt + 1)
                for dot in block:
                    MAP[x + dot[0]][y + dot[1]] = 0


if __name__ == '__main__':
    date = [int(i) for i in input('请输入日期：').split('.')]
    set_date(date[0], date[1])
    dfs(0)
    print("Fail!")
```

:::
::: code-group-item blocks.py

```python
_blocks = [
    [(0, 0), (0, 1), (0, 2), (1, 0), (1, 2)],
    [(0, 0), (0, 1), (0, 2), (0, 3), (1, 3)],
    [(0, 0), (0, 1), (0, 2), (1, 2), (1, 3)],
    [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)],
    [(0, 0), (0, 1), (0, 2), (1, 1), (1, 2)],
    [(0, 0), (1, 0), (1, 1), (1, 2), (2, 2)],
    [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)],
    [(0, 0), (1, 0), (1, 1), (2, 0), (3, 0)],
]

total_blocks = len(_blocks)


def rotate_90(puzzle):
    return [(y, -x) for x, y in puzzle]


def rotate_180(puzzle):
    return [(-x, -y) for x, y in puzzle]


def rotate_270(puzzle):
    return [(-y, x) for x, y in puzzle]


def translate_to_positive(puzzle):
    min_x = min(x for x, y in puzzle)
    min_y = min(y for x, y in puzzle)
    return [(x - min_x, y - min_y) for x, y in puzzle]


def generate_rotations(puzzle):
    rotations = [puzzle]
    rotations.append(translate_to_positive(rotate_90(puzzle)))
    rotations.append(translate_to_positive(rotate_180(puzzle)))
    rotations.append(translate_to_positive(rotate_270(puzzle)))
    return [translate_to_positive(rotation) for rotation in rotations]


blocks = [generate_rotations(block) for block in _blocks]

if __name__ == '__main__':
    for block in blocks:
        print(block)
        print()
```

:::
::: code-group-item map.py

```python
MAP = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0],
]


def set_date(month, day):
    if month <= 6:
        MAP[0][month - 1] = -1
    elif month <= 12:
        MAP[1][month - 7] = -1
    else:
        raise ValueError("Invalid month")

    if day <= 7:
        MAP[2][day - 1] = -1
    elif day <= 14:
        MAP[3][day - 8] = -1
    elif day <= 21:
        MAP[4][day - 15] = -1
    elif day <= 28:
        MAP[5][day - 22] = -1
    elif day <= 31:
        MAP[6][day - 29] = -1
    else:
        raise ValueError("Invalid day")
```

:::
::::

这次`blocks.py`主要贡献者为ChatGPT，对话链接（未来抄GPT代码的我都贴出来一下）：<https://chatgpt.com/share/8c4ad0e3-b66b-4391-81a9-07e9f42c4199>

另外就是这个拼图似乎的确有一些无解的情况，例如我最开始尝试的1月1日就无法得到答案，让我一度怀疑我的代码写错了。当然更多的日期则是有多个解。

这个算法的复杂度没做估计，不过Python跑完需要的时间不少，大概几十秒吧。最开始是想要用C++写的，但是牵扯到数组长度可变这个东西在C++里面还是过于麻烦了点，遂放弃。
