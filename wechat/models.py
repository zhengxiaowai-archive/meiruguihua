#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Plan(models.Model):
    user = models.ForeignKey(User, related_name='plan')
    created_at = models.DateField(u'创建时间', auto_now_add=True)
    note = models.TextField(u'备注', default='')


class PlanDetail(models.Model):
    plan = models.ForeignKey(Plan, related_name='details')
    created_at = models.TextField(u'时间段')
    content = models.TextField(u'内容')
    ischeck = models.BooleanField(u'是否完成', default=False)



