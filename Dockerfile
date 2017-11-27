FROM ubuntu:16.04
MAINTAINER guillesiesta



RUN apt-get update
RUN apt-get install -y python-setuptools
RUN apt-get install -y python-dev
RUN apt-get install -y build-essential
RUN apt-get install -y libpq-dev
RUN apt-get install -y python-pip
RUN pip install --upgrade
RUN apt-get install net-tools

RUN apt-get install -y git

COPY . .
RUN pip install -r requirements.txt
EXPOSE 80
CMD cd stories && python storie_flask_app.py
