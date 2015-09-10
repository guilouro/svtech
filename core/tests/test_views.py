# coding: utf-8
from django.test import TestCase
from django.core.urlresolvers import reverse as r
from core.models import Product
from model_mommy import mommy


class HomeTest(TestCase):

    def setUp(self):
        self.resp = self.client.get(r('core:home'))

    def test_get(self):
        '''
        GET / must return status code 200
        '''
        self.assertEqual(200, self.resp.status_code)

    def test_template(self):
        '''
        Home must use template index.html
        '''
        self.assertTemplateUsed(self.resp, 'core/index.html')


class ListViewTest(TestCase):

    def setUp(self):
        self.prod = mommy.make(Product, _quantity=10)
        self.resp = self.client.get(r('core:list'))

    def test_get(self):
        self.assertEqual(200, self.resp.status_code)