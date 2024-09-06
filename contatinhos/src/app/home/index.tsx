import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'
import { Input } from '@/app/components/input'
import { theme } from '@/theme'
import { Contact } from '../components/contact'

export function Home(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input>
                <Feather name="search" size={16}
                    color={theme.colors.gray_300}></Feather>
                    <Input.Field
                        placeholder="Pesquisar pelo nome..." />
                    <Feather name="x" size={16}
                        color={theme.colors.gray_300}></Feather>
                </Input>
            </View>
            <Contact contact={{
                name: "Pedroso",
                image: require("@/app/components/assets/avatar.jpeg")
            }} />
        </View>
    )
}