import { fetchAPIPost } from "./index";

export class AuthService {
  static async Login(body) {
    let res = await fetchAPIPost({
      url: `/login`,
      body,
    });
    return res;
  }
}
