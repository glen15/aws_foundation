# aws_foundation

S3, EC2, Lambda, RDS를 통해 3티어 아키텍처와 서비스 분리를 실습합니다.

## step1

### S3

- 이력서 웹페이지 배포
- S3 정적 웹페이지 호스팅 활성화
- S3 버킷 정책 구성
- 프론트앤드 빌드

### EC2

- 8080 포트에서 실행되는 간단 서버 배포
- Ec2 Access를 위한 Cloud9 환경 구성
- 보안그룹 설정

## step2

### 2티어 학습 기록 앱 배포

- 학습 내용을 조회, 추가, 삭제 기능을 가진 학습 기록 앱 배포
- wellknown PORT 사용
- 클라이언트(S3)-서버(EC2) 연결을 위한 환경변수 사용

## step3

### 3티어 학습 기록 앱 배포

- 데이터 영속성을 위한 RDS 데이터베이스 구성
- 서버(EC2)-데이터베이스(RDS) 연결을 위한 환경변수 사용

## step4

### 학습 기록 앱 with ChatGPT

- 사용자 메모 기반 AI 추가 학습 기능 업데이트
- 서버(EC2)-AI(ChatGPT) 연결을 위한 OpenAI API Key 사용

## step5

### 서버리스 Lambda를 이용한 기능 분리

- AI 조언 요청 기능을 서버(EC2)에서 Lambda로 분리
- API Gwatewaty - Lambda 구성
- 서버(EC2)-Lambda 연결을 위한 환경변수 사용
- Lambda-데이터베이스(RDS) 연결을 위한 환경변수 사용
- Lambda-AI(ChatGPT) 연결을 위한 OpenAI API Key 사용
