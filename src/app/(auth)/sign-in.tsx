import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

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
  });

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
        <Controller
          control={control}
          name="username"
          render={({ field: { value, onChange, onBlur } }) => (
            // <Pressable>
            <View style={styles.innerContainer}>
              <View style={styles.input}>
                <Text style={styles.textLabel}>Nombre</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="email"
                    style={styles.inputStyled}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    // Add other TextInput props as needed
                  />
                </View>
              </View>
            </View>
            // </Pressable>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            // <Pressable>
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
                    // Add other TextInput props as needed
                  />
                </View>
              </View>
            </View>
            // </Pressable>
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
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderRadius: 16,
    // backgroundColor: "red",
  },
  innerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 10,
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
    fontFamily: "regular",
    marginLeft: 10,
    marginTop: 10,
    color: "#919191",
  },
});
