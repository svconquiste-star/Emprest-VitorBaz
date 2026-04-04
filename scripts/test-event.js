/**
 * Script de teste de evento — Facebook Conversions API
 * Executa: node scripts/test-event.js
 */

const PIXEL_ID = '1447732396233668';
const ACCESS_TOKEN =
  'EAAfOvecLeQQBRC8JdVzlA36hZCzOIucUZCQ306ZBQwpAR2aWqKB1xiOuWw2621s8fzqo2muEEa6dD7BAlZBRoIlQ5zwHcN03TSxsxNjsZBuTUFRCDl8fd1J34RdliAy0F0khrTQJYDgnpGAQSHtMhwlM0CV6iWo72Ws7SZAkqYJ66us36jQMIyb4eSQVZCfbQZDZD';
const TEST_EVENT_CODE = 'TEST54623';

async function sendTestEvent() {
  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  const payload = {
    data: [
      {
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          ph: [hashPlaceholder('553187707587')],
          client_user_agent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
    ],
    test_event_code: TEST_EVENT_CODE,
  };

  console.log('Enviando evento de teste para Conversions API...');
  console.log('Pixel:', PIXEL_ID);
  console.log('Test Code:', TEST_EVENT_CODE);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    if (resp.ok) {
      console.log('\n✅ Evento enviado com sucesso!');
      console.log('Resposta:', JSON.stringify(data, null, 2));
    } else {
      console.error('\n❌ Erro ao enviar evento:');
      console.error('Status:', resp.status);
      console.error('Resposta:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('\n❌ Erro de rede:', err.message);
  }
}

async function hashPlaceholder(value) {
  const { createHash } = await import('crypto');
  return createHash('sha256')
    .update(String(value).trim().toLowerCase())
    .digest('hex');
}

// Versão com hash real
async function sendTestEventWithHash() {
  const hashedPhone = await hashPlaceholder('553187707587');

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  const payload = {
    data: [
      {
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          ph: [hashedPhone],
          client_user_agent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
    ],
    test_event_code: TEST_EVENT_CODE,
  };

  console.log('Enviando evento de teste para Conversions API...');
  console.log('Pixel:', PIXEL_ID);
  console.log('Test Code:', TEST_EVENT_CODE);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    if (resp.ok) {
      console.log('\n✅ Evento enviado com sucesso!');
      console.log('Resposta:', JSON.stringify(data, null, 2));
    } else {
      console.error('\n❌ Erro ao enviar evento:');
      console.error('Status:', resp.status);
      console.error('Resposta:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('\n❌ Erro de rede:', err.message);
  }
}

sendTestEventWithHash();
