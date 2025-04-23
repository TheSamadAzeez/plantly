import { Stack, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: true, title: "Home" }} />
      <Tabs.Screen name="profile" options={{ headerShown: true, title: "Profile" }} />
    </Tabs>
  )
}