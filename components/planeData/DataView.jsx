import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/const/colors';

export default function DataView({ title, data }) {
    return (

        <LinearGradient
            colors={['#BDB7EA', '#E6E6FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.dataContainer}>
                    <Text style={styles.data}>
                        {data}
                    </Text>
                </View>

            </View>

        </LinearGradient>


    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        padding: 2,
        borderRadius: 22,
        marginTop: 40,
        marginHorizontal: 10,
        maxWidth: '50%',
        shadowColor: '#4285F4',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 20,
    },
    container: {
        borderRadius: 20,
        minHeight: 100,
        maxWidth: 150,
        minWidth: 150,
        backgroundColor: colors.background,
    },
    dataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 6,
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#BDB7EA',
        paddingBottom: 5, 
    },
    data: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        flexWrap: 'wrap'
    }

});