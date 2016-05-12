#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

@login_required
@require_http_methods(['GET'])
def show(request):
    return render(request, 'show.html', {'title': '创建规划'})

@login_required
@require_http_methods(['GET'])
def manage(request):
    return render(request, 'manage.html', {'title': '管理规划'})

@require_http_methods(['GET'])
def login(request):
    return render(request, 'user_login.html', {'title': '登入'})

@require_http_methods(['GET'])
def register(request):
    return render(request, 'user_login.html', {'title': '注册'})

@login_required
@require_http_methods(['GET'])
def details(request):
    return render(request, 'details.html', {'title': '详情'})
