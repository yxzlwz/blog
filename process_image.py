import hashlib
import re
import pathlib


def file_md5(file_path):
    with open(file_path, 'rb') as fp:
        data = fp.read()
    return hashlib.md5(data).hexdigest()


md_file = None

if __name__ == '__main__':
    md_file = input('请输入Blog MarkDown文件路径: ')
    md_file = md_file.replace('"', '').replace("'", '').strip()
    md_file = pathlib.Path(md_file)
    dir = md_file.parent
    image_dir = pathlib.Path(__file__).parent / 'docs' / 'images'

    with open(md_file, 'r', encoding='utf-8') as fp:
        content = fp.read()

    for match in re.findall(r'!\[.*?\]\((.*?)\)', content):
        ext = match.split('.')[-1]
        md5 = None
        if match.startswith('http'):
            continue
        else:
            file_path = dir / match
            if not file_path.exists():
                print(f'文件不存在：{file_path}')
                continue
            md5 = file_md5(file_path)
            (file_path).replace(image_dir / f'{md5}.{ext}')
        new_name = f'/images/{md5}.{match.split(".")[-1]}'
        content = content.replace(f']({match})', f']({new_name})')
        print(f'替换图片 {match} 为 {new_name}')
    with open(md_file, 'w', encoding='utf-8') as fp:
        fp.write(content)
    print(f'处理完成，文件已更新：{md_file}')
