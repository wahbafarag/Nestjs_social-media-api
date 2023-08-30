import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ErrorCodes } from '../constants/error-codes';

@Injectable()
export class FollowService {
  constructor(private readonly usersService: UsersService) {}

  async followUser(from: string, to: string) {
    const currentUser = await this.usersService.findById(from);
    const userToFollow: any = await this.usersService.findById(to);
    if (!currentUser || !userToFollow) return ErrorCodes.USER_NOT_FOUND;
    if (currentUser.following.includes(userToFollow._id))
      return ErrorCodes.USER_ALREADY_FOLLOWED;

    currentUser.following.push(userToFollow);
    await currentUser.save();
    userToFollow.followers.push(currentUser);
    await userToFollow.save();
    return ErrorCodes.FOLLOW_SUCCESS;
  }

  async unfollowUser(from: string, to: string) {
    const currentUser: any = await this.usersService.findById(from);
    const userToUnfollow: any = await this.usersService.findById(to);
    if (!currentUser || !userToUnfollow) return ErrorCodes.USER_NOT_FOUND;
    if (!currentUser.following.includes(userToUnfollow._id))
      return ErrorCodes.USER_NOT_FOLLOWED;

    if (
      (await this.usersService.findOneAndUpdate(
        { _id: currentUser._id },
        { $pull: { following: userToUnfollow._id } },
      )) &&
      (await this.usersService.findOneAndUpdate(
        { _id: userToUnfollow._id },
        { $pull: { followers: currentUser._id } },
      ))
    )
      return ErrorCodes.UNFOLLOW_SUCCESS;
  }
}
