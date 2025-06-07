Imagine you have an application where you have multiple services such as NormalUser (aka Customer) service, PartnerUser Service and AdminUser service. Now you want to use MongoDB, Postgres and DynamoDB for NormalUser, PartnerUser and AdminUser service respectively in one app. How do you do it? Dependency inversion principle comes into life. This principle makes your code cleaner and scalable and service does not have to know which database are they using.

Let's take a closer look at the pseudocode to get a better understanding of how this Dependency Inversion Principle (DIP) works.


```typescript
interface IUserRepository {
    createUser(user: IUser): Promise<string>;
    updateUser(userId: string, toUpdateUserData: Partial<IUser>): Promise<string>;
// ...
}
```

```typescript
class CustomerUserRepository implements IUserRepository {
    async createUser(user: IUser): Promise<string> {
    // MongoDB logic
    return "mongo_user_id";
 }
    async updateUser(userId: string, toUpdateUserData: Partial<IUser>): Promise<string> {
    // MongoDB update logic
    return "mongo_user_id";
 }
}
```
```typescript
class AdminUserRepository implements IUserRepository {
    async createUser(user: IUser): Promise<string> {
    // Postgres logic
    return "pg_user_id";
 }
    async updateUser(userId: string, toUpdateUserData: Partial<IUser>): Promise<string> {
    // Postgres update logic
    return "pg_user_id";
 }
}
```

```typescript
class PartnerUserRepository implements IUserRepository {
    async createUser(user: IUser): Promise<string> {
    // DynamoDB logic
    return "dynamo_user_id";
 }
    async updateUser(userId: string, toUpdateUserData: Partial<IUser>): Promise<string> {
    // DynamoDB update logic
    return "dynamo_user_id";
 }
}
```

```typescript
class UserService {
    constructor(private userRepository: IUserRepository) {}

        async createUser(user: IUser): Promise<string> {
            return this.userRepository.createUser(user);
        }
}
```

```typescript
class UserController {
    async createCustomerUser(req: Request, res: Response) {
        try {
            const userData: IUser = req.body;
            const service = new UserService(new CustomerUserRepository());
            const userId = await service.createUser(userData);
            res.status(200).json({ userId });
        } catch {
            res.status(500).json({ error: "Failed to create user" });
        }
}

    async createAdminUser(req: Request, res: Response) {
        try {
            const userData: IUser = req.body;
            const service = new UserService(new AdminUserRepository());
            const userId = await service.createUser(userData);
            res.status(200).json({ userId });
        } catch {
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    async createPartnerUser(req: Request, res: Response) {
        try {
            const userData: IUser = req.body;
            const service = new UserService(new PartnerUserRepository());
            const userId = await service.createUser(userData);
            res.status(200).json({ userId });
        } catch {
            res.status(500).json({ error: "Failed to create user" });
        }
    }
}
```

By following this approach, each repository can be tested independently. If you need to switch the database for any user type in the future, you only need to update the corresponding repository implementation.

