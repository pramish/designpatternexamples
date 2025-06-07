export interface IUser {
    email: string;
    firstName:  string;
    lastName: string;
}

export interface IUserRepository {
    createUser(user: IUser): Promise<string>;
    // ...other methods
}
