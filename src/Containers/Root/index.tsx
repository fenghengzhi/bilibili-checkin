import {View, Text} from "react-native";
import {Button} from 'react-native-elements';
import * as React from "react";
import {useContext} from "react";
import Context from "@/Context";

export default function Root(props) {
    const {cookie} = useContext(Context);
    return (
        <View style={{justifyContent: 'center', flex: 1}}>
            <Text>cookie:{cookie}</Text>
            <View style={{height: 100}}/>
            <Button title="获取登录态" onPress={() => props.navigation.push('CookieGet')}/>
            <View style={{height: 100}}/>
            <Button title="验证登录态"/>
            <View style={{height: 100}}/>
            <Button title="尝试签到"/>
        </View>);
}
