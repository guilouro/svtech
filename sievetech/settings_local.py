DEBUG = True

INTERNAL_IPS = ('127.0.0.1',)

DATABASES = {
    'default': parse('mysql://root:poi123@localhost:3306/svtech')
}

HTML_MINIFY = True

THUMBNAIL_DEBUG = True
