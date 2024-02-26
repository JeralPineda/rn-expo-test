import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoginInput from "@/components/ui/forms/login-input";
import { LoginSchema } from "@/lib/validators/login";

interface LoginFormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useSession();

  const { control, handleSubmit, setValue, watch } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const inputRef = useRef<TextInput | null>(null);

  const onSubmit = (data: LoginFormData) => {
    console.log("🚀 sign-in.tsx -> #22 -> data ~", JSON.stringify(data, null, 2));
    // Here you can perform further actions with the form data, like sending it to a server
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text> */}

      <View style={styles.container}>
        <Text>Login</Text>
        <LoginInput
          //
          control={control}
          label="Usuario"
          name="username"
          rules={{ required: "Usuario es requerido" }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <Pressable style={styles.containerPress} onPress={() => inputRef.current && inputRef.current.focus()}>
              <View style={styles.innerContainer}>
                <View style={styles.input}>
                  <Text style={styles.textLabel}>Contraseña</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Contraseña"
                      style={styles.inputStyled}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      ref={inputRef}
                      // Add other TextInput props as needed
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
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
});
