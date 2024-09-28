ARG VERSION=9.4
ARG APP=scratch
FROM almalinux:${VERSION}
SHELL ["/bin/bash", "-c"]
# RUN dnf install -y almalinux-release-devel
RUN dnf install -y --enablerepo=crb make gcc g++ libcurl-devel openssl-devel zlib-devel libstdc++-static
COPY . /lo
WORKDIR /lo
RUN make clean
RUN make lo
ENV LO_HOME=/lo
ENV PATH=$LO_HOME/:$PATH;
WORKDIR /lo/${APP}
RUN lo eval "console.log(`hello dock`)"
RUN lo build runtime ${APP}
CMD ["/bin/bash"]