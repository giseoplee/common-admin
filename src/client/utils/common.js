export function responseAction(dispatch, code, data, successFunc, Param, failFunc){
    if (code !== '9000' &&  data !== null) {
        Param !== null ? dispatch(successFunc(Param)) : dispatch(successFunc())
    }
    else {
        dispatch(failFunc());
    }
}