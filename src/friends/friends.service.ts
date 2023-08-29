import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { UsersService } from '../users/users.service';
import { ErrorCodes } from '../constants/error-codes';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly usersService: UsersService,
  ) {}

  async addFriend(userId: string, currentUser: any) {
    await this.checkFriendship(userId, currentUser);
    const friend = await this.friendsRepository.Create({ userId: userId });
    const otherUser = await this.usersService.findById(userId);
    otherUser.friends.push(currentUser._id);
    await otherUser.save();
    currentUser.friends.push(userId);
    await currentUser.save();

    if (friend) return ErrorCodes.FRIEND_ADDED;
  }

  async removeFriend(userId: string, currentUser: any) {
    //await this.checkFriendship(userId, currentUser);
    const deleteFriend = await this.friendsRepository.DeleteOne({
      _id: userId,
    });
    const otherUser = await this.usersService.findById(userId);

    if (deleteFriend && otherUser) {
      currentUser.friends.pull(userId);
      await currentUser.save();
      await this.usersService.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: currentUser._id } },
      );
      return ErrorCodes.FRIEND_REMOVED;
    }
  }

  private async checkFriendship(userId: string, currentUser: any) {
    if (userId === currentUser._id) {
      throw new BadRequestException(ErrorCodes.CANNOT_ADD_YOURSELF);
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);
    }

    const alreadyFriend = await this.friendsRepository.FindOne({ userId });
    if (alreadyFriend) {
      throw new BadRequestException(ErrorCodes.ALREADY_FRIENDS);
    }
  }
}
