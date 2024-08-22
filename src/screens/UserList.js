import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { databases } from '../../appWriteConfig';

const UserList = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await databases.listDocuments(
                    "66b0c833001eaadd638b",
                    "66bdfd08002463022412",
                );
                setUsers(response.documents);
            } catch (error) {
                Alert.alert(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const renderUser = ({ item }) => (
        <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('ChatScreen', { userId: item.$id, name: item.name })}>
            <Image source={require('../assets/iconPlaceholder.png')} style={styles.displayPicture} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.lastMessage}>Most Recent Message</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00BFA5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {users.length > 0 ? (
                <FlatList 
                    data={users} 
                    renderItem={renderUser} 
                    keyExtractor={(item) => item.$id} 
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noUsersText}>No users found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a3942',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingVertical: 10,
    },
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2834',
    },
    displayPicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        color: 'white',
    },
    lastMessage: {
        fontSize: 14,
        color: '#888888',
        marginTop: 4,
    },
    noUsersText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888888',
    },
});

// const UserList = ({ navigation }) => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await databases.listDocuments(
//                     "66b0c833001eaadd638b",
//                     "66bdfd08002463022412",
//                 );
//                 setUsers(response.documents);
//             } catch (error) {
//                 Alert.alert(error);
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     const renderUser = ({ item }) => (
//         <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('ChatScreen', { userId: item.$id, name: item.name })}>
//             <Text style={styles.userName}>{item.name}</Text>
//         </TouchableOpacity>
//     );

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>User Profiles</Text>
//             {users.length > 0 ? (
//                 <FlatList 
//                     data={users} 
//                     renderItem={renderUser} 
//                     keyExtractor={(item) => item.$id} 
//                     contentContainerStyle={styles.listContainer}
//                 />
//             ) : (
//                 <Text style={styles.noUsersText}>No users found</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f8f8f8',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#333',
//     },
//     listContainer: {
//         paddingBottom: 20,
//     },
//     userButton: {
//         padding: 15,
//         marginVertical: 10,
//         backgroundColor: '#007BFF',
//         borderRadius: 8,
//     },
//     userName: {
//         fontSize: 18,
//         color: '#fff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     noUsersText: {
//         fontSize: 18,
//         color: '#999',
//         textAlign: 'center',
//         marginTop: 20,
//     },
// });

export default UserList;