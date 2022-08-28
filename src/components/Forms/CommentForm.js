import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import FormInputField from './FormInputField'

function CommentForm({ type, submit, postId, parentId, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(data => submit(data, postId, parentId, reset))}
    >
      <FormInputField
        id="comment"
        name="comment"
        register={register}
        errors={errors['comment']}
        label="Comment"
        multiline
        rows={2}
      />
      <Button
        variant={'contained'}
        sx={{ width: '20%', margin: 2 }}
        type="submit"
        disabled={loading}
      >
        {type === 'comment' ? 'Add Comment' : 'Reply'}
      </Button>
      <input
        type="file"
        name="image"
        accept="image/*"
        {...register('image')}
        disabled={loading}
      />
    </form>
  )
}

export default CommentForm
