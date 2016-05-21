#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from decimal import Decimal
from .models import Plan, PlanDetail

def get_format_weekday(day_in_week):
    map_weekday = {
        1: u'周一',        
        2: u'周二',        
        3: u'周三',        
        4: u'周四',        
        5: u'周五',        
        6: u'周六',        
        7: u'周日',        
    }

    return map_weekday[day_in_week]
    
def clac_plan_percent(plan):
    details = PlanDetail.objects.filter(plan=plan)
    total = details.count()
    has_check_counts = details.filter(ischeck=True).count()

    precent = Decimal(has_check_counts) / Decimal(total)
    return (precent * Decimal('100')).quantize(Decimal('1'))
