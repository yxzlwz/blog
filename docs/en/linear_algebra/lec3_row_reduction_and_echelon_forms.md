---
title: 3. Row Reduction and Echelon Forms
createTime: 2026/01/26 11:17:22
permalink: /en/linear_algebra/z8x09f7p/
---

## Some Definitions

### Nonzero Row or Column

A ==nonzero row or column== in a matrix means a row or column that contains at least **one nonzero entry**.

### Leading Entry

A ==leading entry== of a row refers to the **leftmost nonzero entry** (in a **nonzero row**).

## Echelon Form (阶梯形)

### REF and RREF

A rectangular matrix is in ==row echelon form (REF)== if it has the following properties:

1. All nonzero rows are above any rows of all zeros.
   - $\begin{bmatrix}0 & 2 & 4 \\ 3 & -1 & 0 \\ 0 & 0 & 0\end{bmatrix}$ satisfies this property.
   - $\begin{bmatrix}0 & 0 & 0 \\ 1 & 2 & 3 \\ 0 & 4 & 5\end{bmatrix}$ does not satisfy this property.
2. Each leading entry of a row is in a column to the right of the leading entry of the row above it.
   - $\begin{bmatrix}\color{blue}{1} & 2 & 0 & 3 \\ 0 & 0 & \color{blue}{4} & 5 \\ 0 & 0 & 0 & \color{blue}{6}\end{bmatrix}$ satisfies this property.
   - $\begin{bmatrix}0 & \color{blue}{2} & 3 \\ \color{red}{4} & 5 & 6 \\ 0 & 0 & \color{blue}{7}\end{bmatrix}$ does not satisfy this property.
3. All entries in a column below a leading entry are zeros.
   - In fact, any matrix that satisfies property 2 automatically satisfies this property.

If a matrix in echelon form satisfies the following additional conditions, then it is in ==reduced (row) echelon
form (RREF)==:

4. The leading entry in each nonzero row is $1$.
5. Each leading $1$ is the **only nonzero entry** in its column.
   - $\begin{bmatrix}\color{blue}{1} & \color{red}{5} & 3 & 0 \\ 0 & \color{blue}{1} & 2 & 0 \\ 0 & 0 & 0 & \color{blue}{1} \\ 0 & 0 & 0 & 0\end{bmatrix}$ does NOT satisfies this property.

### Theorem

Each matrix is ==[row equivalent](./2w3xk95z/#elementary-row-operations-初等行变换)== to ==one and only one== ==reduced echelon matrix (RREF)==.

## Pivot

- A ==pivot position== in a matrix $A$ is a location in $A$ that corresponds to a leading $1$ in the reduced echelon form $A$.
- A ==pivot== is a nonzero number in a pivot position.
- A ==pivot column== is a column of $A$ that contains a pivot position.

## Solutions of Linear Systems

### Basic and Free Variables

Take the following linear system as an example:

$$
\begin{bmatrix}
1 & 0 & -5 & 1 \\
0 & 1 & 1 & 4 \\
0 & 0 & 0 & 0
\end{bmatrix}

\begin{cases}
\begin{aligned}
&x_1 & - 5&x_3 &= 1 \\
& &x_2 + &x_3 &= 4 \\
& & & 0 &= 0
\end{aligned}
\end{cases}
$$

- The variables $x_1$ and $x_2$ corresponding to the **pivot columns** in the matrix are called ==basic variables==.
- The other variable, $x_3$, is called a ==free variable==.

It is possible to rewrite the basic variables depending on the free variables:

$$
\begin{cases}
\begin{aligned}
x_1 &= 1 + 5x_3 \\
x_2 &= 4 - x_3 \\
x_3 &\text{ is free}
\end{aligned}
\end{cases}
$$

### Consistence

A linear system is **consistent** if and only if the **rightmost column** of the augmented matrix is **NOT a pivot column**.

In other words, a linear system is inconsistent if and only if the augmented matrix has a row of the form $\begin{bmatrix}0 & 0 & \cdots & 0 & b\end{bmatrix}$, where $b$ is a nonzero number.

If a linear system is consistent, then it has either:
- a **unique solution** (if there are **no free variables**), or
- **infinitely many solutions** (if there is **at least one free variable**).
