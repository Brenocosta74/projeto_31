import { Alert, View, SectionList, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useState, useEffect, useId } from 'react'
import { styles } from './styles'
import * as Contacts from 'expo-contacts'
import { Input } from '@/app/components/input'
import { theme } from '@/theme'
import { Contact, ContactProps } from '../components/contact'

type SectionListDataProps = {
    title: string
    data: ContactProps[]
}

export function Home(){
    async function fetchContacts() {
        try {
            const { status } = await Contacts.requestPermissionsAsync()
            if (status === Contacts.PermissionStatus.GRANTED){
                const { data } = await Contacts.getContactsAsync({
                    name, 
                    sort: "firstName"
                })
                const list = data.map((contact) => {
                    id: contact.id ?? useId()
                })
            }
            } catch(error){
                console.log(error)
                Alert.alert("Contatos", "Não foi possível carregar os contatos")
            }
        }

        const [contacts, setContacts] = useState<SectionListDataProps[]>()
        const [name, setName] = useState("")
    
        useEffect(() => {
            fetchContacts()
        },[name])

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
            <SectionList
            sections={[{title: "R", data: [{id: "1", name: "Heloísa"}] }]}
            keyExtractor={(item) => item.id}
            renderItem={({ item })=> (
                <Contact contact={{
                    name: item.name,
                    image: require("@/app/components/assets/avatar.jpeg")
                }} />
            )}
            renderSectionHeader={({ section }) => 
                (<Text style={styles.section}>{section.title}</Text>)}
            contentContainerStyle = {styles.contentList}
            showsVerticalScrollIndicator={false}
            SectionSeparatorComponent={() => <View style={styles.separator}/>}
            />
            </View>
    )
}