# coding: utf-8
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from django.core import serializers
from core.models import Product


def home(request):
    return render(request, 'core/index.html')


def list(request):
    products = [p.to_dict_json() for p in Product.objects.all()]
    return JsonResponse({'products': products})


def set_priority(request):
    products = json.loads(request.body)['products']

    for product in products:
        prod = Product.objects.get(id=product['id'])
        if prod.priority != product['priority']:
            prod.priority = product['priority']
            prod.save()

    return JsonResponse({'status': 'ok'})
