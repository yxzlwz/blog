---
title: NumPy 基本介绍
createTime: 2025/10/30 14:21:13
permalink: /article/ztezdylu/
---

## 什么是 NumPy？

NumPy（Numerical Python 的缩写）是一个用于科学计算的开源 Python 库。它提供了支持大型多维数组和矩阵的**高性能**数据结构，以及大量用于操作这些数组的数学函数。NumPy 是数据科学、机器学习和数值分析等领域的基础工具之一。

## 安装

```bash
pip install numpy
# or
pip3 install numpy
```

## 多维数组

NumPy 提供的主要数据结构是 `ndarray`（N-Dimensional Array），它是一个多维数组对象：

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])

print(a)
'''
输出：
[[1 2 3]
 [4 5 6]]
'''

print(a.shape)  # 输出数组的形状 (2, 3)
print(a.ndim)  # 输出数组的维度 2
print(a.dtype)  # 输出数组的数据类型 int64
```

## 快速生成数据

```python
np.zeros((2, 3))  # 创建一个 2x3 的零矩阵
np.ones((3, 4))   # 创建一个 3x4 的全一矩阵
np.arange(0, 10, 2)  # 创建一个从 0 到 10，步长为 2 的数组
np.linspace(0, 1, 5)  # 创建一个从 0 到 1 的等间隔数组，共 5 个元素
np.random.rand(2, 3)  # 创建一个 2x3 的随机数组，元素在 [0, 1) 之间
```

## 数据类型

NumPy 默认使用 `float64` 作为浮点数的数据类型，因此在上例中，`np.zeros((2, 3))` 创建的数组元素类型为 `float64`：

```
[[0. 0. 0.]
 [0. 0. 0.]]
```

可以通过 `dtype` 参数指定其他数据类型：

```python
np.zeros((2, 3), dtype=int)  # 创建一个 2x3 的整数零矩阵
```

## 索引和切片

NumPy 支持类似于 Python 列表的索引和切片操作：

```python
a = np.array([[1, 2, 3], [4, 5, 6]])
print(a[0, 1])  # 输出 2（等同于 a[0][1] ）
print(a[:, 1])  # 输出第二列 [2 5]
print(a[:, :2])  # 输出 [[1 2]
                 #       [4 5]]
```

以第 3 行为例，具体而言，`:` 表示选择该维度的所有元素，而 `1` 则表示选择该维度的第 1 个索引位置的元素（注意索引从 0 开始）。因此，`a[:, 1]` 表示选择数组 `a` 的所有行的第 1 列。

::: details 关于 [:, 1] 语法的说明

通过类似下面这样的语法，我们可以无限扩展切片操作：

```python
class MyMatrix:
    def __init__(self, data):
        self.data = data
    def __getitem__(self, idx):
        rows, col = idx
        print(rows)  # 输出 slice(None, None, None)
        print(col)  # 输出 1
        return [row[col] for row in self.data[rows]]

m = MyMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

print(m[:, 1])  # 输出 [2, 5, 8]
```

:::

## Broadcasting（广播）

（此部分内容搬运自知乎 @Vector：[浅谈Numpy 中的Broadcast](https://zhuanlan.zhihu.com/p/359674259)）

### 感性理解

我们定义：

```python
a = np.array([[ 0,  1,  2],
              [ 3,  4,  5],
              [ 6,  7,  8],
              [ 9, 10, 11]])
b = np.array([0, 1, 2])
```

此时我们运算 `a + b`，会得到这样的结果：

```python
array([[ 0,  2,  4],
       [ 3,  5,  7],
       [ 6,  8, 10],
       [ 9, 11, 13]])
```

他们的相加与 Broadcast 如下图所示：

![](/images/aef9ab89fc0691474689b783a7d9a09e.png)

### 详细解释

到底 Broadcast 的规则是什么呢？官方的总结如下：

> In order to broadcast, the size of the trailing axes for both arrays in an operation must either be the same size or one of them must be one.
>
> 为了广播，操作中两个数组的后轴的大小必须相同，或者其中一个必须是 $1$

简单来说，就是从末尾开始对比两个数组的 shape，必须一致或者为 $1$

具体规则如下（以下规则可以按照任意顺序组合使用，直至运算合法）：

1. 让所有输入数组都向其中形状最长的数组看齐，形状中不足的部分都通过在前面（左侧）补 $1$。比如计算 `a+b`，其中 `a.shape=(4, 3)`、`b.shape=(3, )`，那么数组 `b` 将被 broadcast 为 `b.shape=(1, 3)`，然后再进行运算。

2. 如果两个数组的形状在任何维度上均不匹配，但是某个数组中某一个维度为 $1$，则该维度中形状为 $1$ 的数组将被拉伸以匹配另一个数组对应维度形状。比如计算a+b，其中 `a.shape=(1, 3)`、`b.shape=(3, 1)`，那么根据规则 2，这两个数组会 boradcast 为 `a.shape=(3, 3)`、`b.shape=(3, 3)`

3. 如果两个数组的形状在任何维度上均不匹配，且均没有等于1的维度，则会报错。

### 扩展

除加法外，Broadcast 还可以用于其他运算，比如减法、乘法、除法等。只要满足上述规则，NumPy 就会自动进行广播操作，使得不同形状的数组能够进行元素级的运算。

例如计算 `a * b`，其中 `a.shape=(4, 3)`、`b.shape=(3, )`，则 `b` 会被 broadcast 为 `b.shape=(1, 3)` $\rightarrow$ `b.shape=(4, 3)`，然后再进行乘法运算，得到的结果为：

```python
array([[ 0,  1,  4],
       [ 0,  4, 10],
       [ 0,  7, 16],
       [ 0, 10, 22]])
```

## 数据统计

NumPy 提供了丰富的统计函数：

```python
a = np.array([1, 2, 3, 4, 5, 6])
print(np.sum(a))        # 输出所有元素的和 21
print(np.mean(a))       # 输出平均值 3.5
print(np.median(a))     # 输出中位数 3.5
print(np.std(a))        # 输出标准差 1.707825127659933
```

## 数学运算

NumPy 支持对数组进行元素级的数学运算：

```python
a = np.array([1, 2, 3])

print(a * 2)  # 输出 [2 4 6]

b = np.array([4, 5, 6])

print(a + b)  # 输出 [5 7 9]
print(a * b)  # 输出 [ 4 10 18]
```

更进一步，NumPy 还支持矩阵运算：

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(np.dot(A, B))
```

输出是什么我也没学过……
