ARG VERSION=9.4
FROM almalinux:${VERSION}
SHELL ["/bin/bash", "-c"]
# Install GCC 13 development tools
RUN dnf install -y --enablerepo=crb gcc-toolset-13 \
    gcc-toolset-13-gcc-c++ \
    gcc-toolset-13-libstdc++-devel \
    make libcurl-devel openssl-devel zlib-devel binutils
# Install lld separately
RUN dnf install -y lld
# Activate GCC Toolset 13 environment
ENV PATH=/opt/rh/gcc-toolset-13/root/bin:$PATH
ENV LD_LIBRARY_PATH=/opt/rh/gcc-toolset-13/root/lib64:$LD_LIBRARY_PATH
COPY . /lo
WORKDIR /lo
ENV WARN="-Werror -Wpedantic -Wall -Wextra -Wno-unused-parameter"
ENV LO_WARN=$WARN
ENV LO_HOME=/lo
ENV PATH=$LO_HOME/:$PATH;
RUN make clean
RUN gcc --version && ld.lld --version && make lo
WORKDIR /lo/scratch
RUN lo eval "console.log(`hello dock`)"
RUN lo build runtime scratch && ls -la /lo/scratch && /lo/scratch/scratch
CMD ["/bin/bash"]