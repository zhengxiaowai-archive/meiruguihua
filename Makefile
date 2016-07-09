host:=127.0.0.1
port:=6000

debug:
./manage.py runserver $(host):$(port)

start-uwsgi:
	uwsgi --http 127.0.0.1:$(port) \
		--chdir $(shell pwd) \
    --wsgi-file meiriguihua/wsgi.py \
    --master \
    --process 4 \
    --daemonize $(shell pwd)/logs/uwsgi.log \
    --pidfile $(shell pwd)/uwsgi.pid  

stop-uwsgi:
	uwsgi --stop uwsgi.pid

reload-uwsgi: 
	uwsgi --reload uwsgi.pid

collectstatic:
	./manage.py collectstatic --noinput

.PHONY: debug \
	collectstatic \
	reload-uwsgi \
	start-uwsgi \
	stop-uwsgi 
