import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const { username } = watch();

  const onSubmit = (data: LoginFormData) => {
    console.log("🚀 sign-in.tsx -> #22 -> data ~", JSON.stringify(data, null, 2));
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
    // Here you can perform further actions with the form data, like sending it to a server
  };

  return (
    <View
      //
      className="flex-1 justify-center items-center"
    >
      <View className="flex-1 justify-center w-full p-5">
        <Text className="text-center font-bold text-2xl">Login</Text>
        <LoginInput
          //
          control={control}
          label="Usuario"
          name="username"
          rules={{ required: "Usuario es requerido" }}
        />
        <LoginInput
          //
          control={control}
          label="Contraseña"
          name="password"
          type="password"
          rules={{ required: "Usuario es requerido" }}
          username={username}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
