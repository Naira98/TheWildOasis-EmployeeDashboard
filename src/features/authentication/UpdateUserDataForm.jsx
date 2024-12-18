import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdateName } from "./useUpdateName";
import { useUpdateAvatar } from "./useUpdateAvatar";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating: isUpdatingName, updateName } = useUpdateName();
  const { isUpdating: isUpdatingAvatar, updateAvatar } = useUpdateAvatar();

  const [fullName, setFullName] = useState(currentFullName);

  function handleSubmit(e) {
    e.preventDefault();
    if (fullName) updateName({ fullName });
  }

  function handleCancel() {
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdatingName}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => updateAvatar({ avatar: e.target.files[0] })}
          disabled={isUpdatingName || isUpdatingAvatar}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdatingName}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingName}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
