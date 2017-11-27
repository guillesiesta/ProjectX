FROM ubuntu:16.04
MAINTAINER guillesiesta

RUN apt-get install git

COPY . .
RUN pip install -r requirements.txt
EXPOSE 80
CMD cd stories && python storie_flask_app.py
