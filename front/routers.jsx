import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from "@expo/vector-icons"
import SignIn from './pages/signIn'
import Home from './pages/home'
import SignUp from './pages/signUp'
import Create from "./pages/create"
import Read from "./pages/read"
import Update from "./pages/update"
import Delete from "./pages/delete"
import Data from "./pages/data"

const Pilha = createStackNavigator()
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#341152',
                    paddingBottom: 6,
                    paddingTop: 1,
                    height: '7%',
                    borderTopColor: 'transparent'
                },
                tabBarActiveTintColor: '#A439FB',
                tabBarInactiveTintColor: '#7A2BBB'
            }}

        >
            <Tab.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />
            
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Sensores"
                component={Read}
                options={{
                    headerShown:false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="wifi" size={size} color={color} />
                    )
                }}
            />

        </Tab.Navigator>
    );
}



export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>
                <Pilha.Screen
                    name="MyTabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Sensores"
                    component={Read}
                    options={{ headerShown: false }}
                />


            </Pilha.Navigator>
        </NavigationContainer>
    )
}