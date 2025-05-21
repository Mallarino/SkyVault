import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../assets/const/colors';

export default function ConfirmModal({ isVisible, onCancel, onConfirm }) {
    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modal}>
                <Text style={styles.title}>¿Eliminar carta?</Text>
                <Text style={styles.subtitle}>Esta acción no se puede deshacer.</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.cancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm}>
                        <Text style={styles.confirm}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        width: '90%',
        marginHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    subtitle: {
        color: 'white'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    cancel: {
        marginRight: 15,
        color: 'gray'
    },
    confirm: {
        color: 'red',
        fontWeight: 'bold'
    }
});