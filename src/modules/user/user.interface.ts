export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    role: "TENANT" | "LANDLORD";
}

export interface IUpdateUserStatus {
    status: "ACTIVE" | "BANNED";
}
