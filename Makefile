all: install

install: local migrate initdb

update: local migrate

front-install:
	sudo npm install -g grunt-cli
	cd _src && sudo npm install
	cd _src && grunt b

local:
	pip install -r requirements.txt

clean:
	@find . -iname '*.pyc' -delete
	@find . -iname '*.pyo' -delete

migrate:
	python manage.py makemigrations
	python manage.py migrate

initdb:
	python manage.py loaddata product.json

run:
	python manage.py runserver