#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from django.db import transaction



def user_login(request):
    username = request.POST['username']
    password = request.POST['password']

    if not User.objects.filter(username=username):
        return JsonResponse(
                {'code': 400, 'error': 'User name already exists'}, status=400)

    user = authenticate(username=username, password=password)
    
    if user is not None:
        if user.is_active:
            login(request, user)
            return redirect('/wechat/plan/show')
        else:
            # 禁用账户
            pass
    else:
        return JsonResponse({'code': 401, 'error': 'Invaild account'}, status=401) 


def user_logout(request):
    logout(request)
    return redirect('/wechat/login')


@transaction.atomic
def user_register(request):
    username = request.POST['username']
    password = request.POST['password']

    if not (username and password):
        return JsonResponse(
                {'code': 401, 'error': 'Invild username or password'}, status=401)

    if User.objects.filter(username=username):
        return JsonResponse(
                {'code': 400, 'error': 'User name already exists'}, status=400)

    new_user = User()
    new_user.username = username
    new_user.email = username
    new_user.set_password(password)
    new_user.is_active = True
    new_user.save()

    user = authenticate(username=username, password=password)
    login(request, user)

    return JsonResponse({'success': True})
