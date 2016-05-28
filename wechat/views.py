#!/usr/bin/env python
# -*- coding: utf-8 -*-

import moment
import json

from django.http import HttpResponse
from django.shortcuts import render
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
    format_date = tomorrow.format("YYYY.MM.DD")
    weekday = get_format_weekday(tomorrow.weekday)

    return render(request, 'show.html', {
        'title': '创建规划',
        'format_date': format_date,
        'weekday': weekday})

@login_required
@require_http_methods(['GET'])
def manage(request):
    page = request.GET.get('page', 1)
    per_page = request.GET.get('PerPage', 10)

    plan_list = Plan.objects.filter(user=request.user).order_by('-created_at') 
    paginator = Paginator(plan_list, per_page) 

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

    return render(request, 'manage.html', {'title': '管理规划', 'plans': plans})


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















