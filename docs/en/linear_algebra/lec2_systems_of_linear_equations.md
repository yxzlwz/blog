---
title: 2. Systems of Linear Equations
createTime: 2026/01/21 13:27:35
permalink: /en/linear_algebra/2w3xk95z/
---
## Linear Equation (线性方程)

### Definition

For $n \geq 1$, a linear equation in the variables $x_1, ... , x_n$ is an equation that can be written in the form

$$ a_1x_1 + a_2x_2 + ... + a_nx_n = b $$

where $b$ and the coefficients $a_1, ... , a_n$ are real or complex numbers.

### Examples

- $\sqrt{2}x_1 + \pi x_2 = 0$ is a linear equation.

- $x_1x_2 + x_3 = 0$ is NOT a linear equation because of the term $x_1x_2$.

- $x_1 + \sqrt{x_2} = 0$ is NOT a linear equation because of the term $\sqrt{x_2}$.

- $0x_1 = 0$ is a linear equation.

- $0x_1 = 1$ is a linear equation, although it has no solution.

## Linear System

### Linear System (线性方程组)

A ==linear system== is a collection of ==one or more== linear equations involving the same variables (e.g., $x_1, ... , x_n$).

### Solution of Linear Systems (线性方程组的解)

- ==A solution of a linear system== is a (ordered) list
$(s_1, s_2, ... ,s_n)$ of numbers that makes each equation a true statement when the values $s_1, s_2, ... ,s_n$ are substituted for $x_1, ... , x_n$, respectively.

- The set of all possible solutions is called the ==solution set of the linear system== (线性方程组的解集).

- A linear system with n variables may have:
  - no solution
  - exactly one solution
  - infinitely many solutions

- A linear system that has at least one solution is called ==consistent== (相容的); otherwise, it is called ==inconsistent== (不相容的).

### Equivalent Linear Systems (等价线性方程组)

Two linear systems are called ==equivalent== if they have the ==same solution set==.

## Matrix Notation of Linear Systems (线性方程组的矩阵表示法)

Take the following linear system as an example:

$$
\begin{cases}
\begin{aligned}
x_1 - 2x_2 + x_3 = 0 \\
2x_2 - 8x_3 = 8 \\
5x_1 - 5x_3 = 10
\end{aligned}
\end{cases}
$$

the matrix

$$
\begin{bmatrix}
1 & -2 & 1 \\
0 & 2  & -8 \\
5 & 0  & -5
\end{bmatrix}
$$

is called the ==coefficient matrix== (系数矩阵), and the matrix

$$
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
5 & 0  & -5 & 10
\end{bmatrix}
$$

is called the ==augmented matrix of the linear system== (线性方程组的增广矩阵).

## Soving a Linear System with Augmented Matrix (用增广矩阵解线性方程组)

An example: Solve the following linear system

$$
\begin{cases}
\begin{aligned}
x_1 - 2x_2 + x_3 = 0 \\
2x_2 - 8x_3 = 8 \\
5x_1 - 5x_3 = 10
\end{aligned}
\end{cases}
$$

The augmented matrix is

$$
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
5 & 0  & -5 & 10
\end{bmatrix}
$$

We can use row operations to transform the augmented matrix into a simpler form. The row operations are:

$$
\begin{aligned}
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
5 & 0  & -5 & 10
\end{bmatrix}
&\xrightarrow{\color{red}{- 5R_1 + R_3}}
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
0 & 10 & -10 & 10
\end{bmatrix} \\[8pt]
&\xrightarrow{- 5R_2 + R_3}
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
0 & 0  & 30 & -30
\end{bmatrix} \\[8pt]
&\xrightarrow{\frac{1}{30}R_3}
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 2  & -8 & 8\\
0 & 0  & 1 & -1
\end{bmatrix} \\[8pt]
&\xrightarrow{\frac{1}{2}(R_2 + 8R_3)}
\begin{bmatrix}
1 & -2 & 1 & 0\\
0 & 1  & 0 & 0\\
0 & 0  & 1 & -1
\end{bmatrix} \\[8pt]
&\xrightarrow{R_1 + 2R_2 - R_3}
\begin{bmatrix}
1 & 0 & 0 & 2\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & -1
\end{bmatrix}
\end{aligned}
$$

Therefore, the solution of the linear system is $(2, 0, -1)$.

Here, I’ll use the step marked in red as an example to explain the row operation. The operation $- 5R_1 + R_3$ means to multiply the first row by $-5$ and then add it to the third row, replacing the third row with the result.
