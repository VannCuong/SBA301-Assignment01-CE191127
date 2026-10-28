/**
 * @author Tran Van Cuong
 */
import { createCrudService } from "./crudService";
import { seedCategories } from "./mockData";

export const CATEGORY_KEY = "funews_categories";
export default createCrudService(CATEGORY_KEY, seedCategories);
