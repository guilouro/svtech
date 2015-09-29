# coding: utf-8
import json
from django.contrib.auth import authenticate as auth, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.core import serializers
from core.models import Product
from core.tasks import save_priority


def home(request):
    return render(request, 'core/index.html')


@ensure_csrf_cookie
def login(request):
    data_login = json.loads(request.body)
    user = auth(
        username=data_login['username'],
        password=data_login['password']
    )

    if user is not None:
        auth_login(request, user)
        return HttpResponse(status=200)
    else:
        return HttpResponse('Login error', status=401)


def logout(request):
    auth_logout(request)
    return HttpResponse(status=200)


def list(request):
    products = [p.to_dict_json() for p in Product.objects.all()]
    return JsonResponse({'products': products})


def set_priority(request):
    products = json.loads(request.body)['products']

    for product in products:
        save_priority.delay(product)

    return JsonResponse({'status': 'ok'})


def logged_in(request):
    return JsonResponse({'status': request.user.is_authenticated()})

