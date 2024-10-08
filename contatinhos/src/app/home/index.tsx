import { useState, useEffect, useId, useRef } from 'react'
import { Alert, View, SectionList, Text, Touchable } from 'react-native'

import { Feather } from '@expo/vector-icons'
import * as Contacts from 'expo-contacts'
import BottomSheet from '@gorhom/bottom-sheet'

import { styles } from './styles'
import { theme } from '@/theme'

import { Input } from '@/app/components/input'
import { Contact, ContactProps } from '@/app/components/contact'
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet'
import { Avatar } from '../components/avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'

type SectionListDataProps = {
    title: string
    data: ContactProps[]
}

export function Home(){
    const [contacts, setContacts] = useState<SectionListDataProps[]>()
    const [name, setName] = useState("")
    const [contact, setContact] = useState<Contacts.Contact>()

    const bottomSheetRef = useRef<BottomSheet>(null)

    const handleBottomSheetOpen = () => bottomSheetRef.current?.expand()
    const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0)

    async function handleOpenDetails(id: string){
        const response = await Contacts.getContactByIdAsync(id)
        setContact(response)
        handleBottomSheetOpen()
    }

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
            sections={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item })=> (
                <TouchableOpacity
                onPress={() => {
                    handleOpenDetails(item.id)
                }} >
                <Contact contact={item} />
                </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => 
                (<Text style={styles.section}>{section.title}</Text>)}
            contentContainerStyle = {styles.contentList}
            showsVerticalScrollIndicator={false}
            SectionSeparatorComponent={() => <View style={styles.separator}/>}
            />
            {
                contact &&
            <BottomSheet ref={bottomSheet} snapPoints={[1, 284]} handleComponent={() => null}>
                    <Avatar name={contact.name} image={contact.image} variant='large' />
                    <View style={styles.bottomSheetContent}>
                        <Text>{contact.name}</Text>
                    </View>
                    <View style={styles.phone}>
                        <Feather name="phone" size={18} color={theme.colors.blue}></Feather>
                        <Text style={styles.phoneNumber}></Text>
                    </View>
                </BottomSheet>
            }

            {
                contact?.phoneNumbers &&
                <View style={styles.phone}>
                    <Feather name="phone" size={18}color={theme.colors.blue}></Feather>
                    <Text style={styles.phoneNumber}>{contact.phoneNumbers[0].number}</Text>
                    </View>
            }
            </View>
    )
}