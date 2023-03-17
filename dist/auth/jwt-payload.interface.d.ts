export interface JwtPayloadInterface {
    userId: number;
    username: string;
    rights: string;
    unitId: number | null;
}
