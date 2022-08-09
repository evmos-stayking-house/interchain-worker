## [Submodule] scheduled worker of the Stayking finance


# Dependency 설치

```
yarn
```

# 기능 리스트

- Delegation Tx (Auto-Compound)

## [CLI] Delegation Tx 실행법

```
// 사전에 env 에 VALIDATOR_MNEMONIC 24 자리 키워드가 설정 되어 있어야 함 

yarn start evmos:delegation:tx {Validator 주소} --from {Delegator 지갑 주소}
```

## [Auto-Compound]
해당 기능은 ECS Fargate Scheduled Task 를 통해 Daily 로 실행할 예정
