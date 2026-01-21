---
title: 1. Matrix and Linear Systems
createTime: 2026/01/21 12:27:09
permalink: /en/linear_algebra/vgozeor4/
---
## What is Linear Algebra?

To put it simple, Linear Algebra is the ==study of linear transformations==.

### Transformations

Transformation transforms an input to an output. In other words, a transformation is a function.

e.g., $f(x) = 2x$ is a transformation that transforms input $x$ to output $2x$.

### Linear Transformations (线性变换)

A transformation $T$ that satisfies the
linearity property:

1. $T(x + y) = T(x) + T(y)$
2. $T(cx) = cT(x)$

## Matrix (矩阵)

### Definition

Let

$$
[m] \times [n] = \set{ (i, j) | 1 \leq i \leq m, 1 \leq j \leq n, i, j \in Z }
$$

then ==an $m \times n$ (real) matrix is a function==

$$
A: [m] \times [n] \to R
$$

We write the output by $A(i, j) = a_{i, j}$, where

- the input $(i, j)$ represents the $i$th row and $j$th column.
- the output $a_{i,j}$ is the number at the $i$th row and $j$th column.

In general, a matrix is represented as

$$
A = \begin{bmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\
a_{2,1} & a_{2,2} & \cdots & a_{2,n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m,1} & a_{m,2} & \cdots & a_{m,n}
\end{bmatrix}
$$

### Vector (向量)

A vector is an $m \times 1$ matrix (a special matrix that has only one column):

$$
\vec{v} = \begin{bmatrix}
v_1 \\
v_2 \\
\vdots \\
v_m
\end{bmatrix}
$$