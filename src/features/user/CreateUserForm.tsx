import Form from '../../components/form/Form';
import FormRowVertical from '../../components/form/FormRowVertical';
import { useForm } from 'react-hook-form';
import Input from '../../components/form/Input';
import Button from '../../components/button/Button';
import { SingleSelect } from '../../components/select/Select';
import FileInput from '../../components/form/FileInput';
import { useCreateUser } from './useCreateUser';
import { tokenService } from '../../services/token/token';
import { useEffect } from 'react';

const selectOptions = [
  { label: 'Lawer', value: 1 },
  { label: 'Content manager', value: 2 },
  { label: 'Security', value: 3 },
  { label: 'Designer', value: 4 },
];
type CreateUserFormProps = {
  onCloseModal?: () => void;
};
const CreateUserForm = ({ onCloseModal }: CreateUserFormProps) => {
  // const { token} = usetoken();
  const { createUser, isCreating } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  // Watch form values and store them in localStorage
  // const formValues = watch();

  // Load form values from localStorage when the component mounts
  useEffect(() => {
    const storedValues = localStorage.getItem('userFormValues');
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
  }, [reset]);

  async function handleCreateUser(values: any) {
    const file = values.photo[0];
    // const result = await refetch();
    createUser(
      { ...values, photo: file },
      {
        onSuccess: () => {
          reset(), onCloseModal?.();
          localStorage.removeItem('userFormValues');
          tokenService.deleteLocalStorageToken();
        },
        onError: () => {
          localStorage.setItem('userFormValues', JSON.stringify(values)); // Save form values on error
        },
      },
    );
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(handleCreateUser)}
        style={{ paddingTop: '10rem', paddingBottom: '15rem' }}
      >
        <span style={{ paddingBottom: '1rem' }}>&larr; Create New User</span>
        <div style={{ width: '90%' }}>
          <FormRowVertical label="Name" error={errors.name?.message}>
            <Input placeholder="Type here" {...register('name')} />
          </FormRowVertical>
          <FormRowVertical label="Email" error={errors.email?.message}>
            <Input placeholder="Type here" {...register('email')} />
          </FormRowVertical>
          <FormRowVertical label="Phone" error={errors.phone?.message}>
            <Input placeholder="Type here" {...register('phone')} />
          </FormRowVertical>
          <FormRowVertical label="Position" error={errors.position_id?.message}>
            <SingleSelect
              name="position_id"
              control={control}
              options={selectOptions}
            />
          </FormRowVertical>
          <FormRowVertical label="Photo" error={errors.photo?.message}>
            <FileInput placeholder="Subject" {...register('photo')} />
          </FormRowVertical>

          <div style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
              <Button
                onClick={() => onCloseModal?.()}
                variation="outlinePrimary"
                type="reset"
              >
                Cancel
              </Button>
              <Button variation="primary" type="submit">
                {isCreating ? 'Loading...' : 'Save User'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateUserForm;
