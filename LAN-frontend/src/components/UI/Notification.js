import { Alert, Fade, Snackbar } from '@mui/material'
import React from 'react'
import { useNotificationContext } from '../../hooks/useNotificationContext'

// Notification popup component which renders inside the header
// to display notifications with diffrent severity.
// Display new notification by setting a new notification state
// inside the notificationContext
const Notification = () => {
  const { notification, resetNotification } = useNotificationContext()

  const alertProps = {}

  if (!!notification.severity) {
    alertProps.severity = notification.severity
  }

  if (!notification.icon) {
    alertProps.icon = false
  }

  return (
    <Snackbar
      open={!!notification.message}
      autoHideDuration={4000}
      onClose={resetNotification}
      sx={{ mt: 8 }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Fade}
    >
      <Alert elevation={5} {...alertProps}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default React.memo(Notification)
