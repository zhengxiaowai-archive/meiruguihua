#!/usr/bin/env python
# -*- coding: utf-8 -*-

import moment
import json

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .utils import get_format_weekday, clac_plan_percent
from .models import Plan, PlanDetail

@login_required
@require_http_methods(['GET'])
def show(request):
    tomorrow = moment.now().add(day=1)
    if Plan.objects.filter(user=request.user, created_at=tomorrow.date):
        return redirect('/wechat/plan/padding')

    template_val = {}
    template_val['title'] = u'创建规划'

    format_date = tomorrow.format("YYYY.MM.DD")
    weekday = get_format_weekday(tomorrow.weekday)
    template_val['format_date'] = format_date
    template_val['weekday'] = weekday
    
    user_plans = Plan.objects.filter(user=request.user)
    if not user_plans:
        # 新用户, 添加三条作为引导
        details = []
        details.append({'created_at': '', 'content': ''})
        #details.append({'created_at': '10:00-11:00', 'content': '向左滑动可以删除'})
        #details.append({'created_at': '11:00-12:00', 'content': '下方可以编辑备注'})
        template_val['details'] = details
    else:
        # 老用户，自动填充上次的内容
        details = user_plans.last().details.all()
        template_val['details'] = details

    return render(request, 'show.html', template_val)

@login_required
@require_http_methods(['GET'])
def manage(request):
    page = request.GET.get('page', 1)
    per_page = request.GET.get('PerPage', 10)

    plan_list = Plan.objects.filter(user=request.user).order_by('-created_at') 
    paginator = Paginator(plan_list, per_page) 
    
    counts = plan_list.count()
    next_per_page = int(per_page) + 10
    if int(per_page) > counts:
        next_per_page = 0
     

    try:
        plans = paginator.page(page)
    except PageNotAnInteger:
        plans = paginator.page(1)
    except EmptyPage:
        plans = paginator.page(paginator.num_pages)
    
    precent_list = map(clac_plan_percent, plans)

    for i, plan in enumerate(plans):
        plan.precent =  precent_list[i]

        to_moment = moment.date(plan.created_at)
        plan.format_time = to_moment.format("YYYY.MM.DD")
        plan.weekday = get_format_weekday(to_moment.weekday)

    return render(request, 'manage.html',
            {'title': '管理规划', 'plans': plans, 'next_per_page': next_per_page})


@require_http_methods(['GET'])
def login(request):
    return render(request, 'user_login.html', {'title': '登入'})

@require_http_methods(['GET'])
def register(request):
    return render(request, 'user_login.html', {'title': '注册'})

@login_required
@require_http_methods(['GET'])
def details(request, plan_id):
    plan = Plan.objects.get(id=plan_id)
    to_moment = moment.date(plan.created_at)
    format_time = to_moment.format("YYYY.MM.DD")
    weekday = get_format_weekday(to_moment.weekday)
    precent =  clac_plan_percent(plan)

    plan_details = PlanDetail.objects.filter(plan=plan)
    

    return render(request, 'details.html',{'title': '详情',
        'details': plan_details,
        'note': plan.note,
        'date': format_time,
        'precent': precent,
        'weekday': weekday})

@login_required
@require_http_methods(['GET'])
def today(request):
    today = moment.now().date
    today_plan = Plan.objects.filter(
            created_at=today, user=request.user)
    if today_plan:
        return redirect(
                '/wechat/plan/' + str(today_plan.first().id) + '/details')
    else:
        return redirect('/wechat/plan/manage')


@login_required
@require_http_methods(['GET'])
def padding(request):
    tomorrow = moment.now().add(day=1)
    tomorrow_plan = Plan.objects.filter(
            created_at=tomorrow.date, user=request.user)
    if tomorrow_plan:
        return render(
                request, 'padding.html', {'title': "padding", "plan_id": tomorrow_plan.first().id});


