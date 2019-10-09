import * as React from "react";

const Context = React.createContext({
    cookie: '',
    setCookie(value: string) {
    },
    getCookie() {
    }
});
export default Context;
