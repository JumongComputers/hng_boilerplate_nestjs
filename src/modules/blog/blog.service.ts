import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) {}

  async findLatest(limit: number = 5): Promise<Blog[]> {
    return this.blogRepository.find({
      order: { created_at: 'DESC' },
      take: limit,
    });
  }
}
