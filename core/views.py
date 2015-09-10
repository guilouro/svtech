# coding: utf-8
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from core.models import Product


def home(request):
    return render(request, 'core/index.html')


def list(request):
    products = serializers.serialize(
        'json',
        Product.objects.all(),
        fields=('id', 'name', 'priority',)
    )
    return JsonResponse({'products': products})
