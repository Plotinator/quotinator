import firebase from 'firebase'

export function makeUIconfig (isDev, params) {
  return {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        emailLinkSignIn: function () {
          return makeActionCodeSettings(isDev, params)
        },
      },
    ],
    signInSuccessUrl: '/',
    callbacks: {
      // Avoid redirects after sign-in
      signInSuccessWithAuthResult: () => false,
    },
  }
}

export function makeActionCodeSettings (isDev, params) {
  return {
    handleCodeInApp: true,
    url: isDev ? `http://localhost:3000${params || ''}` : `https://quotinator.vercel.app/${params || ''}`,
  }
}

export function mapUserData (user) {
  const { uid, email, phoneNumber } = user
  return { uid, email, phoneNumber }
}