import { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { makeUIconfig, mapUserData } from '../utils/firebase'
import { fuego } from '@nandorojo/swr-firestore'
import { Modal, ModalHeader } from './spectre/Modal'

export default function Login (props) {

  return <Modal open={true} onClose={() => {}} className='login-modal'>
    <ModalHeader>
      <h1 className='quotrH1'>Quotr</h1>
    </ModalHeader>
    <StyledFirebaseAuth uiConfig={makeUIconfig(props.isDev, null)} firebaseAuth={fuego.auth()}/>
  </Modal>
}