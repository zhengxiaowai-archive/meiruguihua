#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from .models import Plan, PlanDetail

@csrf_exempt
@login_required
@require_http_methods(['POST'])
@transaction.atomic
def create_plan(request):
    plan_contents = json.loads(request.body)

    plan = Plan()
    plan.user = request.user
    plan.note = plan_contents['note']
    plan.save()

    for entry in plan_contents['entries']:
        detail = PlanDetail()
        detail.plan = plan
        detail.created_at = entry['title']
        detail.content = entry['content']
        detail.save()

    return JsonResponse({'success': True})

@csrf_exempt
@login_required
@require_http_methods(['POST'])
@transaction.atomic
def modify_plan(request):
    plan_contents = json.loads(request.body)
    note = plan_contents['note']
    details = plan_contents['details']
    
    # 获取 plan
    plan = PlanDetail.objects.get(id=details[0]['id']).plan

    # 从新设置 plan 的 note
    plan.note = note
    plan.save()

    for detail in details:
        db_detail = PlanDetail.objects.get(id=detail['id'])
        db_detail.ischeck = detail['isChecked'] 
        db_detail.save()

    return JsonResponse({'success': True})
