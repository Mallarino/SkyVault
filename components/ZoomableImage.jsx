import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

export default function ZoomableImage({ uri }) {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Image
                    source={{ uri }}
                    style={{
                        resizeMode: 'contain',
                        marginTop: 10,
                        borderRadius: 20,
                        maxWidth: 200,
                        maxHeight: 200,
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1,
                    }}
                />
            </TouchableOpacity>

            <ImageViewing
                images={[{ uri }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
        </View>
    );
}