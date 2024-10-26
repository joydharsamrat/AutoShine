import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const Form = ({
  onSubmit,
  children,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
