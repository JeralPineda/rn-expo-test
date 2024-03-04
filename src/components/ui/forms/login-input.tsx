import { View, Text, Pressable, TextInput, StyleSheet, Keyboard } from "react-native";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { LoginInputProps } from "@/types/form";
import Ionicons from "@expo/vector-icons/Feather";

export default function LoginInput({ control, label, name, type, rules, handleSubmit, username }: LoginInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef<TextInput | null>(null);

  const handleSubmitting = (text: string) => {
    if (username && text) {
      handleSubmit && handleSubmit();
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
        type !== "password" ? (
          <>
            <Pressable style={styles.containerPress} onPress={() => inputRef.current && inputRef.current.focus()}>
              <View style={styles.innerContainer}>
                <View style={styles.input}>
                  <Text style={styles.textLabel}>{label}</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputStyled}
                      value={value}
                      spellCheck={false}
                      autoCorrect={false}
                      returnKeyType="done"
                      autoCapitalize="none"
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      onBlur={onBlur}
                      ref={inputRef}
                      // Add other TextInput props as needed
                    />
                  </View>
                </View>
              </View>
            </Pressable>
            {error && <Text style={styles.errorMessage}>{error?.message}</Text>}
          </>
        ) : (
          <>
            <Pressable style={styles.containerPress} onPress={() => inputRef.current && inputRef.current.focus()}>
              <View style={styles.innerContainer}>
                <View style={styles.input}>
                  <Text style={styles.textLabel}>{label}</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => {
                        onChange(text);
                      }}
                      style={styles.inputStyled}
                      value={value}
                      onBlur={onBlur}
                      spellCheck={false}
                      autoCorrect={false}
                      returnKeyType="done"
                      autoCapitalize="none"
                      ref={inputRef}
                      onSubmitEditing={(event) => handleSubmitting(event.nativeEvent.text)}
                      // Add other TextInput props as needed
                    />
                  </View>
                </View>
                {/*  */}
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    style={styles.icon}
                    size={18}
                    onPress={() => setShowPassword((prev) => !prev)}
                  />
                </View>
              </View>
            </Pressable>
            {error && <Text style={styles.errorMessage}>{error?.message}</Text>}
          </>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    width: "100%",
    borderRadius: 16,
    // backgroundColor: "red",
  },
  containerPress: {
    // flex: 1,
    width: "100%",
    paddingVertical: 10,
  },
  innerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flexDirection: "row",
    // marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 4,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 10,
    // borderRadius: 8,
  },
  inputStyled: {
    flex: 1,
    fontSize: 14,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  textLabel: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
    color: "#919191",
  },
  errorMessage: {
    color: "red",
    textAlign: "left",
    marginLeft: 10,
  },
  icon: {
    padding: 15,
    color: "#919191",
    backgroundColor: "transparent",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
