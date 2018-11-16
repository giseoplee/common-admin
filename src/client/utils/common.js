export function responseAction(dispatch, res, successFunc, successParam, failFunc){
    res.data.code !== '9000' &&  res.data.data !== null? successParam !== null? dispatch(successFunc(successParam)):dispatch(successFunc()):dispatch(failFunc())
}