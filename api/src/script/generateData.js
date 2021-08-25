import fs from 'fs';
import path from 'path';
import md5 from 'md5';

import config from '../server/config.js';

const salt = 'api.sun.com';
const category = [];

for (let i = 0; i < 30; i++) {
  category.push({ title: `分类-${i}`, id: `${i}` });
  const categoryData = { topShow: '', block: [] };

  for (let j = 0; j < 15; j++) {
    const block = [];

    for (let k = 0; k < 15; k++) {
      const hash = md5(`${salt}${((i + j + k) % 50) * 10 + ((j + k) % 50)}`);
      const img = `http://127.0.0.1:9688/img/${hash.slice(0, 1)}/${hash.slice(1, 3)}/${hash.slice(3, 6)}.png`;

      block.push({ name: `类型-${k}`, img });
    }

    categoryData.block.push({ title: `标题-${j}`, block });

    if (i % 5 === 0) {
      categoryData.topShow = `http://127.0.0.1:9688/img/top-show/${i}.png`;
    }
  }

  fs.writeFileSync(path.resolve(config.path.json, `./category-${i}.json`),
    JSON.stringify(categoryData, null, 4));
}

fs.writeFileSync(path.resolve(config.path.json, './category.json'),
  JSON.stringify(category, null, 4));
