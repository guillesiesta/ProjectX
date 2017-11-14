# ProjectX

[![Build Status](https://travis-ci.org/guillesiesta/ProjectX.svg?branch=master)](https://travis-ci.org/guillesiesta/ProjectX)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/apps/projectxguillesiesta)

### Descripción del proyecto

Project X es un proyecto profundiza dentro del insólito mundo de las *Dark Stories*. Para aquellos que buscan *stories* únicas y paranormales, esta es su plataforma.

Un usuario dentro de esta Project X podrá intendar dar sentido resolviendo diversas Dark Stories propuestas por otros usuarios o, incluso, tendrá la posibilidad de manifestar su creatividad proponiendo *stories* propia.

### Descripción técnica del proyecto

Para el almacenamiento de los datos se usará [neo4j](https://neo4j.com/). Esta base de datos basada en grafos se desplegará dentro de un servidor de Microsoft Azure. El objetivo, es crear un servidor en el que por cada usuario se almacenarán las distintas historias y pistas para resolverlas. Además, se tendrá que llevar un control a la hora de la interacción entre usuarios.

Una vez montada la infraestructura, para el diseño de la web se usará *python* se usará libreria *beatutiful soup*, que "une" *python* con *HTML*.
