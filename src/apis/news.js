import { fetchAPIGet, fetchAPIPost, fetchAPIPostFormData } from "./index";

export class NewsService {
  static async GetNews() {
    let res = await fetchAPIGet({
      url: `/news`,
    });
    return res;
  }

  static async Login(body) {
    let res = await fetchAPIPost({
      url: `/login`,
      body,
    });
    return res;
  }

  static async CreateNews(body) {
    let res = await fetchAPIPost({
      url: `/createNews`,
      body,
    });
    return res;
  }

  static async UpdateNews(body) {
    let res = await fetchAPIPost({
      url: `/updateNews`,
      body,
    });
    return res;
  }

  static async DeleteNews(id) {
    let res = await fetchAPIGet({
      url: `/deleteNews/${id}`,
    });
    return res;
  }
}
