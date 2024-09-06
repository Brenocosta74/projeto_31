import { ImageProps, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"
import { Avatar } from "../avatar"

export type ContactProps = {
    name: string
    image?: ImageProps
}

type Props = TouchableOpacityProps & {
    contact: ContactProps
}

export function Contact({ contact, ...rest } : Props ){
    return <TouchableOpacity style={styles.container}>
        <Avatar name="Pedroso" image={require("@/app/components/assets/avatar.jpeg")}/>
        <Text style={styles.name}>Pedro</Text>
    </TouchableOpacity>
}