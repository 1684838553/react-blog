import service, { get } from "./axios.config";
import { IProfile, IParamPage } from '../types/profile'

export function addArticle(param: IProfile): Promise<any> {
    return service.post("/profiles/articles", param)
}

export function getArticleList(param: IParamPage): Promise<any> {
    return get('/profiles/articles', param)
}

export function deleteArticle(articleId: string): Promise<any> {
    return service.delete(`/profiles/articles/${articleId}`)
}
