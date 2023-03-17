export interface UserOutDto {
    id: number;
    username: string;
    name: string;
    surname: string;
    unit_id: number;
    reachable: boolean;
}
export interface Caretaker {
    id: number;
    name: string;
    surname: string;
    unit_id: number;
    unit_name: string;
}
