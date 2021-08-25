from hashlib import md5
import os
import sys

from PIL import Image

root = './static/img'
ext = '.png'
salt = 'api.sun.com'


def create_img(seed, size=(60, 60), file_name=None, dir_name=None):
    hash = md5(f'{salt}{seed}'.encode()).hexdigest()
    color = f'#{hash[:6]}'

    if not file_name:
        dir_name = f'{root}/{hash[0]}/{hash[1:3]}'
        file_name = f'{hash[3:6]}{ext}'

    image = Image.new(mode='RGB', size=size, color=color)

    try:
        image.save(f'{dir_name}/{file_name}')
    except FileNotFoundError:
        os.makedirs(dir_name)
        image.save(f'{dir_name}/{file_name}')


if __name__ == '__main__':
    sys.stdout.write('progress: 0%')
    sys.stdout.flush()

    for i in range(50):
        if (i % 5 == 0):
            create_img(i, size=(200, 80),
                       file_name=f'{i}{ext}',
                       dir_name='./static/img/top-show')

        for j in range(50):
            create_img(i * 50 + j)
        sys.stdout.write(f'\033[11G{i*2+2}%')
        sys.stdout.flush()

    sys.stdout.write('\n')
