import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";

import LogScreen from "../screens/LogScreen";
import RecordScreen from "../screens/RecordScreen";
import TabBarIcon from "../components/TabBarIcon";
import { HeaderTitle } from "@react-navigation/elements";


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function getHeaderTitle(route){
    const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;

    switch(routeName){
        case "Home":
            return "How to get started?";
        case "RecordEvents":
            return "Link to learn more";
    }
}
export default function BottomTabNavigation({navigation, route}){
    React.useLayoutEffect(() =>{
        if (navigation != null){
            navigation.setOptions({ HeaderTitle: getHeaderTitle(route)});
        }
    }, [])
    return(
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
            name="Home"
            component={LogScreen}
            options={{
                title: "Event Log",
                tabBarIcon:({ focus }) =>(
                    <TabBarIcon focused = {focused} name="md-cod-working"/>
                ),
            }}
            />
            <BottomTab.Screen
            name="RecordEvents"
            component={RecordScreen}
            options={{
                title: "Record Events",
                tabBarIcon:({ focus }) =>(
                    <TabBarIcon focused = {focused} name="md-book"/>
                ),
            }}
            />
        </BottomTab.Navigator>
    );
}






