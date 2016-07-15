# 每日规划

管理你每天的计划，让生活更美好

## 开发

技术框架：

- Python2.7（3+ 没有测试）
- Django
- Mysql

css 采用 less 转换需要安装 ```watch-less```, 在开发时候可以打开监控，自动转换

```
cd $YOUR_PROJECT_DIR/YOUR_APP/static
watch-less -d less/ -r css -e .css
```

## 部署

- 部署采用 uwsgi + Nginx 的方式部署
- Docker 部署

### 导出静态文件

Django 在产品环境中需要对静态文件进行导出，同时在 Nginx中配置

导出的静态文件目录在 ```setting.py``` 中的 ```STATIC_ROOT``` 中设置

```
virtualenv --no-site-packages venv
source venv/bin/activate
make collectstatic
```

### 配置 Nginx

```
server{
        listen 80;

        server_name domain.com;
        server_name www.domain.com;

        access_log /var/log/nginx/domain.com.access.log;
        error_log /var/log/nginx/domain.com.error.log;

        location / {
                    proxy_set_header host $host;
                    proxy_pass http://localhost:6000;
                }
        location /static {
                    alias YOUR_STATIC_FILE_FUL_PATH;
                }
}

```

### 启动应用

```
virtualenv --no-site-packages venv
source venv/bin/activate
pip install -r requirments.txt
make start-uwsgi
```

如果需要设置启动端口，在Makefile中修改 ```$port``` 即可，默认是6000端口


### Docker

```shell
docker build -t meiriguihua .
docker run -d --name meiriguihua \
    --restart=always \
    -e DATABASE_NAME=meiriguihua \
    -e DATABASE_USER=root \
    -e DATABASE_HOST=127.0.0.1 \
    -e DATABASE_PORT=3306 \
    -p 10000:6000 \
    meiriguihua
```

---- 

**ENJOYING**

