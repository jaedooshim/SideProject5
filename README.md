# 1Day-1Project

## BackEnd - 심재두

## #프로젝트 소개
- 1D-1Project : 휴대폰 본인인증 서비스
  - 멤버/휴대폰검증 으로 구성되어 있으며, 요청한 멤버의 휴대폰번호와 휴대폰검증을 하는 휴대폰 번호가 일치하는지 검증
  - 일치할 때에는 멤버의 is_vaild_phone 필드가 false -> true로 업데이트
  - 인증요청시 요구되는 코드는 임의의 난수가 생성
- 네이버클라우드로 진행하려 했으나, 개인유저 정책변경으로 인해 AWS-SNS 사용

## Rest API
| Content  | Method   | Path         |
|----------|----------|--------------|
| 멤버생성     | `POST`   | /members     |
| 멤버조회     | `GET`    | /members/:id |
| 멤버 목록조회  | `GET`    | /members     |
| 멤버삭제     | `DELETE` | /members/:id |
| 멤버수정     | `PUT`    | /members/:id |
| 로그인      | `POST`   | /auth        |
| 휴대폰 인증코드 | `POST`   | /sns/send    |
| 휴대폰 인증   | `GET`    | /sns/verify  |

### 사용기술

- TypeScript
- NestJs
- Prisma
- PostgreSQL
- Docker
- AWS-SNS 



### Server Use

```bash
npm run start:dev
```

### Install
```angular2html
npm i | npm install
```

### Docker PostgreServer Port
```angular2html
5432:5432
```