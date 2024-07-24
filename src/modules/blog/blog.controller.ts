import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { skipAuth } from 'src/helpers/skipAuth';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @skipAuth()
  @Get('latest')
  async findLatest() {
    try {
      return await this.blogService.findLatest();
    } catch (e) {
      throw new InternalServerErrorException('Failed to fetch latest blogs');
    }
  }
}
