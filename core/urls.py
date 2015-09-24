# coding: utf-8
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'core.views',
    url(r'^$', 'home', name='home'),
    url(r'^login/$', 'login', name='login'),
    url(r'^list/$', 'list', name='list'),
    url(r'^setpriority/$', 'set_priority', name='set_priority'),
)
