import {View, Text} from "react-native";
import {Button} from 'react-native-elements';
import * as React from "react";
import {useContext} from "react";
import Context from "@/Context";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Cookie from 'cookie';

interface API {
    code: number;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Root(props) {
    const {cookie} = useContext(Context);
    return (
        <View style={{justifyContent: 'center', flex: 1}}>
            <Text>cookie:{cookie}</Text>
            <View style={{height: 20}}/>
            <Button title="获取登录态" onPress={() => props.navigation.push('CookieGet')}/>
            <View style={{height: 20}}/>
            <Button title="验证登录态" onPress={async () => {
                try {
                    const res = await Axios.get<API>('https://api.bilibili.com/x/web-interface/nav', {headers: {Cookie: cookie}});
                    if (res.data.code === 0) {
                        Toast.show('已登录');
                        return;
                    }
                } catch (e) {
                }
                Toast.show('未登录');
            }}/>
            <View style={{height: 20}}/>
            <Button title="尝试签到" onPress={async () => {
                try {
                    while (true) {
                        // sleep(1000);
                        {
                            const res = await Axios.get <API & { number: number }>('https://www.bilibili.com/plus/account/exp.php', {headers: {Cookie: cookie}});
                            if (res.data.code === 0 && res.data.number === 50) {
                                Toast.show('已投满');
                                return;
                            }
                        }
                        const aid = Math.floor(Math.random() * 60000000);
                        // const aid = 200938;
                        // Toast.show(`aid${aid}`);
                        {
                            const params = new URLSearchParams();
                            params.append('aid', String(aid));
                            const res = await Axios.get<API>('https://api.bilibili.com/archive_stat/stat', {params});
                            if (res.data.code !== 0) {
                                continue;
                            }

                            // Toast.show(`视频详情${JSON.stringify(res.data)}`);
                        }
                        // Toast.show('尝试投币');
                        {
                            // Toast.show('尝试投币');
                            // break;
                            const params = new URLSearchParams();
                            params.append('aid', String(aid));
                            params.append('multiply', '1');
                            params.append('select_like', '0');
                            params.append('cross_domain', 'true');
                            params.append('csrf', Cookie.parse(cookie)['bili_jct']);
                            await Axios.post('https://api.bilibili.com/x/web-interface/coin/add', params, {
                                headers: {
                                    Cookie: cookie,
                                    Host: 'api.bilibili.com',
                                    Origin: 'https://www.bilibili.com',
                                    Referer: `https://www.bilibili.com/video/av${aid}`
                                }
                            });
                            // await Axios.post('https://api.bilibili.com/x/web-interface/coin/add',  {headers: {Cookie: cookie}});
                            // Toast.show(JSON.stringify(res.data));
                            // break;
                        }

                        // https://api.bilibili.com/x/web-interface/coin/add
                        //     aid=59381092&multiply=1&select_like=0&cross_domain=true&csrf=a1f6c0de838243027c415d45b6103b9b
                        // Content-Type: application/x-www-form-urlencoded; charset=UTF-8
                        // Toast.show(typeof FormData);
                    }
                } catch (e) {
                    Toast.show('出错了');
                    // Toast.show(JSON.stringify(e));
                    // console.error(e);
                    // console.log(e.response);
                }

                // const test = new FormData();
            }}/>
            <View style={{height: 20,}}/>
            <Button title="测试按钮" onPress={() => {
                // bili_jct
                // tough.Cookie.parse(cookie).toJSON();

                // cookie.parse('foo=bar; equation=E%3Dmc%5E2')
                // Toast.show();
                // Toast.show(JSON.stringify(tough.Cookie.parse(cookie,{loose:true}).toJSON()['bili_jct']));


                // cookieParser()
            }}/>
        </View>);
}
