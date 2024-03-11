import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { IMemberCreate } from './types/create/request.interface';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { IMemberUpdate } from './types/update/request.interface';
import { Member } from '@prisma/client';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: IMemberCreate): Promise<string> {
    await this.memberRepository.findUniqueEmail(data.email);
    await this.memberRepository.findUniquePhone(data.phoneNumber);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '회원생성이 정상적으로 처리되었습니다.';
  }

  async update(id: string, data: IMemberUpdate): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    if (data.email && member.email !== data.email) {
      await this.memberRepository.findUniqueEmail(data.email);
    }

    if (data.phoneNumber && member.phoneNumber !== data.phoneNumber) {
      await this.memberRepository.findUniquePhone(data.phoneNumber);
    }
    await this.memberRepository.findUniqueEmail(data.email);
    await this.memberRepository.update(id, data);
    return '회원수정이 정상적으로 처리되었습니다.';
  }

  async softDelete(id: string): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.memberRepository.softDelete(id);
    return '회원삭제 요청이 정상적으로 처리되었습니다.';
  }

  async findUnique(id: string): Promise<Member> {
    return await this.memberRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IMemberFindMany) {
    return await this.memberRepository.findMany(data);
  }

  async getEmail(email: string): Promise<Member> {
    return await this.memberRepository.isValidEmail(email);
  }
}
