import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from '../users/schemas/users.schema';
import { Post } from '../posts/schemas/post.schema';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  async searchUsers(@Query('search') search: string): Promise<User[]> {
    return await this.searchService.searchUsers(search);
  }

  @Get('posts')
  async searchPosts(@Query('search') search: string): Promise<Post[]> {
    return await this.searchService.searchPosts(search);
  }
}
