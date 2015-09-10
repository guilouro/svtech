# coding: utf-8
from django.db import models
from django.utils.translation import ugettext_lazy as _

class Product(models.Model):
    name = models.CharField(_('Nome'), max_length=500)
    priority = models.BooleanField(_(u'Prioritário'), default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'product'
