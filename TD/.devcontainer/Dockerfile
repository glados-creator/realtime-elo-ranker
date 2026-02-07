

FROM archlinux:latest

ENV NODE_MAJOR_VERSION=24
ENV PNPM_VERSION=10
ENV NODE_OPTIONS='--max-old-space-size=200'
ENV NVM_DIR=/root/.nvm

WORKDIR /install
RUN pacman -Syyu --noconfirm
RUN pacman -S --noconfirm bash git curl wget unzip zip sudo

# Install NVM and Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Load NVM and install Node 24
RUN echo 'source $NVM_DIR/nvm.sh' >> /root/.bashrc
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm install $NODE_MAJOR_VERSION"

# Set default Node version and install pnpm
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm alias default $NODE_MAJOR_VERSION"
RUN /bin/bash -c "source /root/.nvm/nvm.sh && nvm use default"
RUN /bin/bash -c "source /root/.nvm/nvm.sh && corepack enable"
RUN /bin/bash -c "source /root/.nvm/nvm.sh && corepack prepare pnpm@$PNPM_VERSION --activate"
RUN /bin/bash -c "source /root/.nvm/nvm.sh && npm install -g bun"

# Add NVM to PATH for all users
ENV PATH="$NVM_DIR/versions/node/v$NODE_MAJOR_VERSION.*/bin:$PATH"

WORKDIR /devavancer-tdtp-ct
RUN bash -c "source $HOME/.bashrc && pnpm install ."
CMD ["sleep", "infinity"]