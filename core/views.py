# coding: utf-8
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from django.core import serializers
from core.models import Product
from core.tasks import save_priority

def home(request):
    return render(request, 'core/index.html')


def list(request):
    products = [p.to_dict_json() for p in Product.objects.all()]
    return JsonResponse({'products': products})


def set_priority(request):
    products = json.loads(request.body)['products']

    for product in products:
        save_priority.delay(product)

    return JsonResponse({'status': 'ok'})
