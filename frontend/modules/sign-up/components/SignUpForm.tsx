import Form from "@/design/forms/Form";
import { UserRole } from "@/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleProp } from "react-native";
import useOnSignUpMutation from "../hooks/useOnSignUpMutation";
import defaultValues from "../mocks/form-default";
import signUpFields from "../mocks/form-fields";
import { signUpSchema } from "../types/fields-schema";
import isSignUpSucceed from "../utils/is-sign-up-succeed";

type Props = {
  style?: StyleProp<any>;
  role: UserRole;
};

const resolver = zodResolver(signUpSchema);

const SignUpForm = ({ style, role }: Props) => {
  const { onSignUp, data, error } = useOnSignUpMutation(role);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (isSignUpSucceed(data)) {
    alert("Success, Now you can login");
    navigation.navigate("LogIn");
  }

  if (error) alert(error.message);

  return (
    <Form
      resolver={resolver}
      style={style}
      buttonText="Sign up"
      defaultValues={defaultValues}
      fields={signUpFields}
      onSubmit={onSignUp}
    />
  );
};

export default SignUpForm;
