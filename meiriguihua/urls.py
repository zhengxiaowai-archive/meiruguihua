#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.conf.urls import url, include
from django.contrib import admin
from wechat import views as wechat_views
from wechat import users as user_api
from wechat import apis

wechat_patterns = [
    url(r'^plan/show', wechat_views.show),
    url(r'^plan/manage', wechat_views.manage),
    url(r'^login', wechat_views.login),
    url(r'^register', wechat_views.register),
    url(r'^plan/(\d+)/details', wechat_views.details),
]


api_patterns = [
    url(r'^register', user_api.user_register),
    url(r'^login', user_api.user_login),
    url(r'^logout', user_api.user_logout),
    url(r'^plan/create', apis.create_plan),
]

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^wechat/', include(wechat_patterns)),
    url(r'^api/', include(api_patterns)),
] 
