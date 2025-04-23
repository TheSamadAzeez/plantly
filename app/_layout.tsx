import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../utils/theme";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Tabs.Screen name="index" options={{ headerShown: true, title: "Home", tabBarShowLabel: false , tabBarIcon: ({size, color})=>{ return <Entypo name="leaf" size={size} color={color} />

      }}} />
      <Tabs.Screen name="profile" options={{ headerShown: true, title: "Profile", tabBarShowLabel: false, tabBarIcon: ({size, color})=>{
        return <Feather name="user" size={size} color={color} />
      }}} />
    </Tabs>
  )
}