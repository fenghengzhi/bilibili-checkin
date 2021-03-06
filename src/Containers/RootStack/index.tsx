import * as React from "react";
import {StatusBar, AsyncStorage} from "react-native";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Root from "@/Containers/Root";
import CookieGet from "@/Containers/CookieGet";
import Context from "@/Context";
import {useState, useEffect} from "react";

const AppNavigator = createStackNavigator({
    Root: {
        screen: Root,
        navigationOptions: {
            header: null
        },
        // headerMode: 'none',
        // path: '/root',
    },
    CookieGet: {
        screen: CookieGet,
    },
}, {
    initialRouteName: 'Root',
    headerMode: 'screen',
    // navigationOptions: {headerStyle: {marginTop: -Constants.statusBarHeight}}
});
const AppContainer = createAppContainer(AppNavigator);

export default function RootStack() {
    const [cookie, setCookie] = useState('');
    useEffect(() => {
        getCookie();
    }, []);

    async function getCookie() {
        const _cookie = (await AsyncStorage.getItem('cookie')) || '';
        setCookie(_cookie)
    }

    return (
        <Context.Provider value={{
            cookie, getCookie, setCookie(value: string) {
                setCookie(value);
                return AsyncStorage.setItem('cookie', value);
            }
        }}>
            <StatusBar
                showHideTransition={'slide'}
                animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                hidden={false}  //是否隐藏状态栏。
                backgroundColor={'#000000'} //状态栏的背景色
                translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
            />
            <AppContainer/>
        </Context.Provider>
    );

}
