###############
# Build Phase #
###############
FROM node:16-alpine as builder

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# private npm registry 정보 파일 복사
COPY .npmrc ./

# package 정의 파일 복사
COPY package.json ./
COPY yarn.lock ./

# package 설치
RUN yarn

# private npm registry 정보 파일 삭제
RUN rm -f .npmrc

# 소스 복사
COPY . .

# Nest Build
RUN yarn build

#############
# Run Phase #
#############
FROM node:16-alpine as runner

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

# build phase에서 만든 배포용 js, 설치 한 modules, package 스크립트 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 기본 실행 명령어
ENTRYPOINT ["yarn", "start:prod"]
