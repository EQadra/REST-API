import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { AuthProvider } from "../context/AuthContext"; // Importa el AuthProvider
import { AppProvider } from "../context/AppContext"; // Ajusta ruta según estructura
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Footer from "./components/Footer";

import FooterApp from "./components/FooterApp";
import Header from "./components/Header";

export default function RootLayout(): JSX.Element {
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      {" "}
      {/* Envuelve toda la aplicación con el AuthProvider */}
      <View style={styles.container}>    
        
            {/* <View style={styles.footer}>
                <Header/>           
            </View> */}
          {/* Contenedor de las pantallas */}
        <Stack>
          {/* Rutas de detalles */}
          {/*  */}
            <Stack.Screen
              name="lists/doctor"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lists/lawyer"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="lists/asociation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lists/store"
              options={{ headerShown: false }}
            />

            {/*  */}

            <Stack.Screen
              name="intro"
              options={{ headerShown: false }}
            />
            {/*  */}

          {/*  */}
          {/* Rutas de detalles */}
          
            <Stack.Screen
              name="aplication/home-app"
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="aplication/home-news"
              options={{ headerShown: false }}
            />
           

          {/* Rutas de autenticación */}
          {/* <Stack.Screen name="(auth)/#" options={{ headerShown: false }} /> */}

          <Stack.Screen
              name="auth/options"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="auth/profile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/forgot-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/reset-password-form"
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="auth/login"
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="auth/signup"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="auth/auth-intro"
              options={{ headerShown: false }}
            />

       

             {/* Rutas de autenticación */}
          {/* <Stack.Screen name="(auth)/#" options={{ headerShown: false }} /> */}
         
            
          <Stack.Screen
              name="intro/v1"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="intro/v2"
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="intro/v3"
              options={{ headerShown: false }}
            />
                     

        <Stack.Screen
              name="config/asociation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="config/category"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="config/doctor"
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="config/lawyer"
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="config/product"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="config/review"
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="config/store"
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="config/user"
              options={{ headerShown: false }}
            />
         
        </Stack>

          {/* Footer global */}
{/* 
            <View style={styles.footer}>
                <FooterApp />           
            </View>
             */}
            
            {/* <View style={styles.footer}>
                <Footer />           
            </View> */}
            
          {/* end footer */}

        </View>
    </AuthProvider>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 0, backgroundColor: "#f0f0f0" },
  headerText: { fontSize: 20, fontWeight: "bold" },
  footer: { padding: 0, backgroundColor: "#f0f0f0" },
  footerText: { textAlign: "center" },
});
