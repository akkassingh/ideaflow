FROM ngnix:stable-alpine

RUN rm /etc/ngnix/conf.d/default.conf

COPY ngnix/ngnix.conf /etc/ngnix/conf.d

# Start ngnix server
CMD ["/bin/bash", "-c", "ngnix -g \"daemon off;\""]