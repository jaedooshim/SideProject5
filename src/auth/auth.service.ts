import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '../_common/jwt/jwt.service';
import { MemberService } from '../member/member.service';
import { ILogin } from './types/login/request.interface';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private memberService: MemberService,
    private bcryptService: BcryptService,
  ) {}

  async login(data: ILogin): Promise<string> {
    const member = await this.memberService.getEmail(data.email);
    const validPassword = await this.bcryptService.compare(data.password, member.password);
    if (!validPassword) throw new BadRequestException('패스워드가 일치하지 않습니다.');

    const payload = { id: member.id, email: member.email, name: member.name };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
