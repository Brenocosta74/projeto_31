import { colors } from './colors'

export const theme = {
    colors,
}
import { ActivityIndicator } from "react-native";

export function Loading(){
    return (
        <ActivityIndicator style={stylrs.loading}
        color={theme.colors.blue}/>
    )
}