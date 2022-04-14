import service from "./axios.config";
import { Iuser } from '../types/user'

export function login(param: Iuser): Promise<any> {
    return service.post("/users/login", param)
}
