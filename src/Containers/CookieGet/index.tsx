import WebView from "react-native-webview";
import * as React from "react";
import {View} from "react-native";
import {Button} from "react-native-elements";
import {useContext, useRef} from "react";
import Context from "@/Context";

export default function CookieGet(props) {
    const webView = useRef<WebView>();
    const {setCookie} = useContext(Context);

    function getCookie() {
        webView.current.injectJavaScript('window.ReactNativeWebView.postMessage(document.cookie)');
    }

    async function saveCookie(event) {
        const cookie = event.nativeEvent.data;
        await setCookie(cookie);
        props.navigation.pop()
    }

    return (
        <View style={{flex: 1}}>
            <Button title="获取登录态" onPress={getCookie}/>
            <WebView ref={webView} onMessage={saveCookie} style={{flex: 1}}
                     source={{uri: 'https://www.bilibili.com/'}}/>
        </View>
    );
}
