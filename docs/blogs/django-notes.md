---
title: Django 小众问题集合
createTime: 2024/05/17 15:13:00
tags:
  - 后端

---

## 使用 Database 作为缓存

在Windows环境下开发Django项目时，缓存是一个令人十分头疼的问题。使用内存模式的话，每次重新加载缓存都会丢失，而要是使用Redis等还需要另起Docker，让不富裕的电脑性能雪上加霜。

这个时候，其实把缓存放在数据库中是一个不错的选择，具体配置如下：

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
        'LOCATION': 'my_cache_table',  # 缓存表的名字
    }
}
```

这里需要注意一点：**我们需要手动运行下面的命令创建缓存表**。

```bash
python manage.py createcachetable my_cache_table
```
