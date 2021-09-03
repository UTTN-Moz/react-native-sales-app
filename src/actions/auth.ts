import * as actionTypes from "./actionTypes";

const onLogin = (data: any) => {
    return {
        type: actionTypes.LOGIN,
        data
    };
};

export const authentication = (login: any, callback: any) => (dispatch: any) => {
    //call api and dispatch action case
    setTimeout(() => {
        let data = {
            success: login
        };
        dispatch(onLogin(data));
        if (typeof callback === "function") {
            callback({ success: true });
        }
    }, 500);
};
