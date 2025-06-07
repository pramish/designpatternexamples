import {IUser, IUserRepository} from "./User.Repository";
import {LegacyUserRepository} from "./LegacyUser.Repository";

export class LegacyUserAdapter implements IUserRepository {
    private legacyUserRepository = new LegacyUserRepository()

    async createUser(user:IUser) {
        const legacyUserData = {

        }
        return this.legacyUserRepository.addUser(user)
    }
}
