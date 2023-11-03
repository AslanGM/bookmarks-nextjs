export const isValidUrl = (str: string): boolean => {
    const urlPattern =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)([a-z]{2,6}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
    return urlPattern.test(str)
}

export const ensureProtocol = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'http://' + url
    }
    return url
}
