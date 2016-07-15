FROM python:2.7.11 

WORKDIR /src
COPY ./requirements.txt /src/requirements.txt
RUN pip install -r requirements.txt --trusted-host pypi.douban.com -i http://pypi.douban.com/simple/

COPY . /src

ENV DATABASE_NAME=meiriguihua
ENV DATABASE_USER=root
ENV DATABASE_PASSWORD=password
ENV DATABASE_HOST=mysql
ENV DATABASE_PORT=3306


CMD /bin/bash start.sh
