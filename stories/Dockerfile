FROM python:2
MAINTAINER guillesiesta


RUN apt-get update && apt-get install -y git

COPY . .
RUN pip install -r requirements.txt
EXPOSE 80
CMD cd stories && python storie_flask_app.py
