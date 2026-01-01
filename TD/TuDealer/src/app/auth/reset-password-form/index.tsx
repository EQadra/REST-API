import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function ResetPasswordFormScreen(): JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [focusedField, setFocusedField] = useState<"new" | "confirm" | null>(null);

  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const handleResetPassword = (): void => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    console.log("Resetting password for:", email);
    console.log("New Password:", newPassword);
    router.replace("/auth/login");
  };

  const inputStyle = (isFocused: boolean) => ({
    ...styles.input,
    borderColor: isFocused ? "#004d32" : "#cce3d2",
  });

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-2xl font-bold text-center mb-5 text-[#004d32]">
        Reset Password
      </Text>

      {email && (
        <Text className="text-center mb-3 text-[#5e8276]">
          Resetting for: {email}
        </Text>
      )}

      <TextInput
        style={inputStyle(focusedField === "new")}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        onFocus={() => setFocusedField("new")}
        onBlur={() => setFocusedField(null)}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#7CA290"
      />

      <TextInput
        style={inputStyle(focusedField === "confirm")}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setFocusedField("confirm")}
        onBlur={() => setFocusedField(null)}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#7CA290"
      />

      <CustomButton title="Reset Password" onPress={handleResetPassword} />

      <Text
        className="text-center text-[#004d32] mt-4"
        onPress={() => router.push("/auth/login")}
      >
        Back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 16,
    backgroundColor: "#f4fdf9",
    color: "#004d32",
    marginBottom: 12,
  },
});
