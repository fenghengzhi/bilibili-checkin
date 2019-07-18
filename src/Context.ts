import * as React from "react";

const Context = React.createContext({
    cookie: '',
    setCookie(value: string) {
    }
});
export default Context;
