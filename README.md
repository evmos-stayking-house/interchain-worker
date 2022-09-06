## [Submodule] scheduled worker of the Stayking finance


## 1. Dependency 설치

```
yarn
```

## 2. 기능 리스트

- Liquidation Bot ( 배포환경에선 1분 주기 )

## 3. ENV 환경 설정
```aidl
로컬환경: process.env 아래 환경 변수를 로컬로 설정함
배포환경: github secret 에 담아서 이미지 빌드 후 ECR 등록 후 자동 배포됨
[ENV] 
 - BOT_PRIVATE_KEY: {봇 돌리는 Address PK},
 - STAYKING_CONTRACT_ADDRESS: {StayKing Contract Address}
```

## 4. [CLI] Liquidation Bot Tx 실행법

```
// Vault Contract(USDC, ATOM 등) 별로 프로세스 병렬 처리
yarn evmos:liquidation:bot --vault {Vault Contract 주소}
```
