import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleCalendarIntegration = () => {
  const CLIENT_ID = '266906947118-opr59kqv9bjpvhuj1p9cha582uks3c25.apps.googleusercontent.com'; // Substitua pelo seu Client ID

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login bem-sucedido:', credentialResponse);
    const accessToken = credentialResponse.credential;

    // Exemplo de como listar eventos do Google Calendar
    axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      console.log('Eventos do Google Calendar:', res.data.items);
    })
    .catch(err => {
      console.error('Erro ao buscar eventos do Google Calendar:', err);
    });
  };

  const handleLoginFailure = (error) => {
    console.error('Falha no login:', error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <h2>Integração com Google Calendar</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleCalendarIntegration;
