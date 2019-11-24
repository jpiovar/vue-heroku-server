#!/bin/bash

[ ! -e https_server.key ] || [ ! -e https_server.cert ] && openssl req -nodes -new -x509 -keyout https_server.key -out https_server.cert
