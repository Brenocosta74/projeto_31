import { Alert, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { styles } from './styles'
import * as Contacts from 'expo-contacts'
import { Input } from '@/app/components/input'
import { theme } from '@/theme'
import { Contact } from '../components/contact'

async function fetchContacts() {
    try {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === Contacts.PermissionStatus.GRANTED){
            const { data } = await Contacts.getContactsAsync()
            console.log(data)}
        } catch(error){
            console.log(error)
            Alert.alert("Contatos", "Não foi possível carregar os contatos")
        }
    }

    useEffect(() => {
        fetchContacts()
    },[])

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