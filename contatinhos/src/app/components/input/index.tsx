import { View, TextInput, ViewProps, TextInputProps} from "react-native";
import { styles } from './styles'

import { theme } from '@/theme'

function Input({children }: ViewProps){
    return<View style={styles.container}>{children}</View>
}

function Field( {...rest}: TextInputProps ){
    return<TextInput placeholder={theme.colors.gray_300} {...rest}/>
}

Input.Field = Field

export { Input }