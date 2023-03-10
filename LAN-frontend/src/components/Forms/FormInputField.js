import { FormControl, FormHelperText, TextField } from '@mui/material'

// FormInputField is a customizable mui text field to be used in forms
const FormInputField = props => {
  const {
    id,
    label,
    register,
    errors,
    defaultValue,
    placeholder,
    multiline,
    rows,
    variant,
  } = props

  return (
    <FormControl error={errors ? true : false} fullWidth sx={{ mt: 1 }}>
      <TextField
        id={id}
        name={id}
        label={label}
        defaultValue={defaultValue}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        variant={variant ? variant : 'outlined'}
        type={
          id === 'password' || id === 'confirmPassword' ? 'password' : undefined
        }
        error={errors ? true : false}
        {...register(id)}
        sx={{
          '& label': {
            marginLeft: variant && 1,
            '&.Mui-focused': {
              marginLeft: variant && 1,
            },
          },
        }}
      />
      <FormHelperText>
        {errors?.message &&
          errors?.message.charAt(0).toUpperCase() + errors?.message.slice(1)}
      </FormHelperText>
    </FormControl>
  )
}

export default FormInputField
