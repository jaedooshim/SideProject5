import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateDto } from './types/create/request.dto';
import { MemberParamDto, MemberUpdateDto } from './types/update/request.dto';
import { Member } from '@prisma/client';
import { MemberFindManyDto } from './types/find-many/request.dto';
import { MemberAuthGuard } from '../_common/guards/member.auth.guard';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  async create(@Body() body: MemberCreateDto): Promise<string> {
    return await this.memberService.create(body);
  }

  @Put('/:id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: MemberUpdateDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.id, body);
  }

  @Delete('/:id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.softDelete(param.id);
  }

  @Get('/:id')
  async findUnique(@Param() param: MemberParamDto): Promise<Member> {
    return await this.memberService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: MemberFindManyDto) {
    return await this.memberService.findMany(query);
  }
}
