/**
 * @author Tran Van Cuong
 */
import { createCrudService } from "./crudService";
import { seedNews } from "./mockData";

export const NEWS_KEY = "funews_news";
export default createCrudService(NEWS_KEY, seedNews);
