import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/schemas/post.schema';
import { User } from '../users/schemas/users.schema';

@Injectable()
export class SearchService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async searchUsers(query: string): Promise<User[]> {
    const regexPattern = new RegExp(query, 'i');
    return await this.usersService.FindAll({
      $or: [
        { username: { $regex: regexPattern } },
        { name: { $regex: regexPattern } },
      ],
    });
  }

  async searchPosts(query: string): Promise<Post[]> {
    const regexPattern = new RegExp(query, 'i');
    return await this.postsService.findAll({
      'content.caption': { $regex: regexPattern },
    });
  }
}
