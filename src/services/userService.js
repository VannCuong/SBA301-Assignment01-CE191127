/**
 * @author Tran Van Cuong
 */
import { createCrudService } from "./crudService";
import { seedUsers } from "./mockData";

export const USER_KEY = "funews_users";
export default createCrudService(USER_KEY, seedUsers);
