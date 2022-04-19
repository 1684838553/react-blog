export interface IProfile {
    article: {
        title: string
        description: string
        body: string
        tagList?: Array<string>
    }
}

export interface IParamPage {
    pageSize: number
    current: number
}
