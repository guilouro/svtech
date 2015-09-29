Sieve Priority
===========================

Sistema de marcação de prioridades.

Aplicação teste em [http://sieve.guilhermelouro.com.br/](http://sieve.guilhermelouro.com.br/)

### Como usar
Assumindo a utilização do virtualenvwrapper


#### Iniciando o projeto

```
$ mkproject sieve_priority
(sieve_priority)$ git clone https://github.com/guilouro/svtech.git .
```

#### Instalando as dependências

```
(sieve_priority)$ make install
```

#### Iniciando os workers no celery

```
(sieve_priority)$ python manage.py celery worker -B -l info
```
ou modo daemon

```
(sieve_priority)$ python manage.py celeryd_detach worker -B -l info
```

-------------------

### Front

* `_src/_grunt:` Tasks do grunt
* `_src/assets/js:` Arquivos de javascript
* `_src/assets/scss:` Módulos sass

* `assets/templates:` Templates das rotas do angular

#### Dependências

* [Grunt](http://gruntjs.com/)
* [AngularJS](https://angularjs.org/)
* [Sass](http://sass-lang.com/)

-------------------

### Back

* `templates:` Template base do django
* `assets:` Estáticos do django
* `core:` App principal

#### Dependências

* [Redis](http://redis.io/)
* [Celery](http://celery.readthedocs.org)
* [Django1.7](https://docs.djangoproject.com/en/1.7/)
