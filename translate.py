from pathlib import Path
from openai import OpenAI

TAGS = {
    '云服务与部署': 'Cloud & Deploy',
    '转载': 'Reprint',
    '杂谈': 'Casual Talk',
    '后端': 'Backend',
    '前端': 'Frontend',
    '信息学竞赛': 'Olympiad in informatics',
}

client = OpenAI(base_url="https://ark.cn-beijing.volces.com/api/v3")

propmt = '''
你将被给到一个MarkDown文本，你的任务是将文档翻译成英文。保留原有的所有MarkDown格式。尽可能避免保留中文，英文无法准确翻译、必须保留中文时也需要英文解释。
请注意，以下内容不要翻译：
- frontmatter
- 代码块（但是代码块中的注释需要翻译）
- MarkDown指令
'''


def translate(content):
    response = client.chat.completions.create(
        model="doubao-seed-1-6-250615",
        messages=[{
            "role": "system",
            'content': propmt
        }, {
            "role": "user",
            "content": content
        }],
    )
    return response.choices[0].message.content


def pre_handle(text):
    t = text.split('---\n')[1:]
    yaml = t[0].strip()
    content = '---\n'.join(t[1:])
    return yaml, content


if __name__ == '__main__':
    path = input('请输入中文内容路径：')
    path = path.replace('"', '').replace("'", '').strip()
    path = Path(path)
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    yaml, content = pre_handle(text)
    for k, v in TAGS.items():
        yaml = yaml.replace(k, v)
    content = translate(content)
    while ' \n' in content:
        content = content.replace(' \n', '\n')
    content = content.replace('](../images/', '](../../images/')
    new_text = f'''---
{yaml}
badge:
  type: info
  text: Translation
---

::: warning
The content was translated from the Chinese version by Generative AI. Please double-check the content.
:::

{content}
'''
    en_path = str(path.resolve()).replace('/blog/docs/', '/blog/docs/en/')
    with open(en_path, 'w', encoding='utf-8') as f:
        f.write(new_text)
