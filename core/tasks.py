# coding: utf-8
from celery import task
from core.models import Product

@task
def save_priority(item):
    prod = Product.objects.get(id=item['id'])
    if prod.priority != item['priority']:
        prod.priority = item['priority']
        prod.save()
        return 'Save item %s' % prod.id