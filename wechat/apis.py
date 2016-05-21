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
