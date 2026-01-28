---
title: 4. Vector Equations
createTime: 2026/01/28 11:20:55
permalink: /en/linear_algebra/f9ntkpr1/
---

## Vectors

A $n \times 1$ matrix is called a $n$ dimensional column vector or simply a ==$n$D vector==:

$$
\vec{w} = \begin{bmatrix}
w_1 \\
w_2 \\
\vdots \\
w_n
\end{bmatrix}
$$

Sometimes, we will just call as vector if it is clear that is 2D.

$\mathbb{R}^n$ is ==the set of all $n$D vectors (向量空间)== with real number entries (read r-N).

Specifically, we denote $\vec{0}$ as the ==zero vector (零向量)==:

$$
\vec{0} = \begin{bmatrix}
0 \\
0 \\
\vdots \\
0
\end{bmatrix}
$$

## Operations on Vectors

### Vector Addition

Given two vectors $\vec{u}, \vec{v} \in \mathbb{R}^n$, their sum $\vec{u} + \vec{v}$ is defined as:

$$
\vec{u} + \vec{v} = \begin{bmatrix}
u_1 + v_1 \\
u_2 + v_2 \\
\vdots \\
u_n + v_n
\end{bmatrix}
$$

### Scalar Multiplication

Given a vector $\vec{u} \in \mathbb{R}^n$ and a scalar $c \in \mathbb{R}$, the scalar multiplication $c\vec{u}$ is defined as:

$$
c\vec{u} = \begin{bmatrix}
cu_1 \\
cu_2 \\
\vdots \\
cu_n
\end{bmatrix}
$$

### Linear Combinations

A ==linear combination (线性组合)== of vectors $\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k} \in \mathbb{R}^n$ with scalars $c_1, c_2, \ldots, c_k \in \mathbb{R}$ is defined as:

$$
c_1\vec{v_1} + c_2\vec{v_2} + \ldots + c_k\vec{v_k}
$$

To determine whether a vector $\vec{b} \in \mathbb{R}^n$ can be expressed as a linear combination of vectors $\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k} \in \mathbb{R}^n$, we can set up the following equation:

$$
x_1\vec{v_1} + x_2\vec{v_2} + \ldots + x_k\vec{v_k} = \vec{b}
$$

This equation can be rewritten in augmented matrix form:

$$
\begin{bmatrix}
v_{1,1} & v_{2,1} & \ldots & v_{k,1} & b_1 \\
v_{1,2} & v_{2,2} & \ldots & v_{k,2} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
v_{1,n} & v_{2,n} & \ldots & v_{k,n} & b_n
\end{bmatrix}
$$

For brevity, write this matrix in a way that identifies its columns:

$$
\begin{bmatrix}
\vec{v_1} & \vec{v_2} & \ldots & \vec{v_k} & \vec{b} \\
\end{bmatrix}
$$

### Span (张成空间)

If $\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k} \in \mathbb{R}^n$, then the set of all linear combinations of these vectors is denoted by

$$
Span\{\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k}\}
$$

and is called the subset of $\mathbb{R}^n$ spanned by $\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k}$.

In other words,

$$
Span\{\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k}\} = \{c_1\vec{v_1} + c_2\vec{v_2} + \ldots + c_k\vec{v_k} \mid c_1, c_2, \ldots, c_k \in \mathbb{R}\}
$$

$\vec{b} \in Span\{\vec{v_1}, \vec{v_2}, \ldots, \vec{v_k}\}$ if and only if the augmented matrix $\begin{bmatrix} \vec{v_1} & \vec{v_2} & \ldots & \vec{v_k} & \vec{b} \\ \end{bmatrix}$ is consistent.
