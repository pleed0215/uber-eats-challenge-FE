import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  MutationEditProfile,
  MutationEditProfileVariables,
} from "../../codegen/MutationEditProfile";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { GQL_QUERY_ME, useMe } from "../../hooks/useMe";
import { EMAIL_REGEX } from "../../utils";
import { UserRole } from "../auth/auth";

interface IForm {
  portrait?: string;
  email: string;
  password: string;
  password2: string;
  name?: string;
  role: UserRole;
}

const GQL_EDIT_PROFILE = gql`
  mutation MutationEditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfilePage = () => {
  const {
    handleSubmit,
    getValues,
    errors,
    register,
    formState,
    setValue,
    setError,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: me, loading: meLoading } = useMe();

  const [editProfile, { data, loading }] = useMutation<
    MutationEditProfile,
    MutationEditProfileVariables
  >(GQL_EDIT_PROFILE, {
    onCompleted: (data: MutationEditProfile) => {
      setIsSubmitting(false);
      history.goBack();
    },
    refetchQueries: [
      {
        query: GQL_QUERY_ME,
      },
    ],
  });

  const onSubmit = () => {
    if (formState.isValid) {
      const editProfileInput = getValues();
      if (
        editProfileInput.password !== "" ||
        editProfileInput.password2 !== ""
      ) {
        if (editProfileInput.password === editProfileInput.password2) {
          const { password2, ...input } = editProfileInput;
          setIsSubmitting(true);
          editProfile({ variables: { input } });
        } else {
          setError("password2", { message: "Please confirm password" });
        }
      } else {
        const { password, password2, ...input } = editProfileInput;

        setIsSubmitting(true);
        editProfile({ variables: { input } });
      }
    }
  };

  useEffect(() => {
    setValue("portrait", me?.me.portrait);
    setValue("email", me?.me.email);
    setValue("role", me?.me.role);
    setValue("name", me?.me.name);
  }, [meLoading]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-800">
      <div className="layout__container flex flex-col bg-red-800 items-center mt-24">
        <h4 className="text-white text-2xl font-bold">Edit profile page</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-screen-sm border border-purple-200 px-5 py-10 mt-3 flex flex-col"
        >
          <div className="flex flex-col mb-6">
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Email required",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Not valid email address",
                },
              })}
              placeholder="Email"
              type="text"
              className="form__input"
              name="email"
            />
            {errors.email && (
              <span className="form__error mt-1">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col mb-6">
            <input
              ref={register({
                minLength: {
                  value: 3,
                  message: "Name must be longer than 3.",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be shorter than 20.",
                },
              })}
              placeholder="Name"
              type="text"
              className="form__input"
              name="name"
            />
            {errors.name && (
              <span className="form__error mt-1">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col mb-6">
            <input
              ref={register({
                minLength: {
                  value: 6,
                  message: "Password must be longer than 6.",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be shorter than 16.",
                },
              })}
              placeholder="Password"
              type="password"
              className="form__input"
              name="password"
            />
            {errors.password && (
              <span className="form__error mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-6">
            <input
              ref={register({
                minLength: {
                  value: 6,
                  message: "Password must be longer than 6.",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be shorter than 16.",
                },
              })}
              placeholder="Confirm password"
              type="password"
              className="form__input"
              name="password2"
            />
            {errors.password2 && (
              <span className="form__error mt-1">
                {errors.password2.message}
              </span>
            )}
          </div>
          <select
            ref={register()}
            name="role"
            className="w-full border rounded-lg py-4 px-5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-opacity-80 outline-none transition duration-500"
            defaultValue="Host"
          >
            <option>Host</option>
            <option>Listener</option>
          </select>
          <ButtonInactivable isActivate={!isSubmitting} loading={isSubmitting}>
            Update
          </ButtonInactivable>
        </form>
      </div>
    </div>
  );
};
