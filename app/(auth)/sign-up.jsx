import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      {!pendingVerification && (
        <View className="py-2 justify-center px-6 bg-gray-100">
        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800"
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            placeholderTextColor="#999"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
        </View>
  
        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800"
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            placeholderTextColor="#999"
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>
  
        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="#999"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>
  
        <View className="mb-6">
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800"
            value={password}
            placeholder="Password..."
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
  
        <TouchableOpacity
          className="bg-green-600 py-3 rounded-lg"
          onPress={onSignUpPress}
        >
          <Text className="text-white text-center text-lg font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}