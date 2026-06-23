import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type RateLimitInfo = {
  count: number;
  lastRequest: number;
};

// Global in-memory store for rate limiting (persists across hot invocations in serverless environments)
const ipTracker = new Map<string, RateLimitInfo>();

const MAX_REQUESTS_PER_HOUR = 3;
const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes
const ONE_HOUR_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown-ip';
    const now = Date.now();

    if (ip !== 'unknown-ip') {
      const tracker = ipTracker.get(ip);
      if (tracker) {
        // Cooldown check (3 minutes)
        if (now - tracker.lastRequest < COOLDOWN_MS) {
          const waitMinutes = Math.ceil((COOLDOWN_MS - (now - tracker.lastRequest)) / 1000 / 60);
          return NextResponse.json({ error: `Por favor, aguarde ${waitMinutes} minuto(s) antes de enviar outra mensagem.` }, { status: 429 });
        }

        // Hourly limit check
        if (now - tracker.lastRequest < ONE_HOUR_MS) {
          if (tracker.count >= MAX_REQUESTS_PER_HOUR) {
            return NextResponse.json({ error: 'Limite de mensagens excedido. Tente novamente em 1 hora.' }, { status: 429 });
          }
          tracker.count++;
          tracker.lastRequest = now;
          ipTracker.set(ip, tracker);
        } else {
          // Reset after an hour
          ipTracker.set(ip, { count: 1, lastRequest: now });
        }
      } else {
        ipTracker.set(ip, { count: 1, lastRequest: now });
      }

      // Cleanup memory
      if (ipTracker.size > 1000) {
        const oldestAllowed = now - ONE_HOUR_MS;
        for (const [key, value] of ipTracker.entries()) {
          if (value.lastRequest < oldestAllowed) {
            ipTracker.delete(key);
          }
        }
      }
    }

    const body = await request.json()
    const { name, email, message, turnstileToken, _honeypot } = body

    // Honeypot check: If the hidden field is filled, it's a bot
    if (_honeypot) {
      return NextResponse.json(
        { success: true, message: 'Mensagem recebida com sucesso!' }, // Fake success to fool bots
        { status: 200 }
      )
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Validação de segurança (Captcha) obrigatória' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });

    const turnstileResult = await turnstileVerify.json();
    
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Falha na validação de segurança. Tente novamente.' },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend testing email
      to: 'matheusdamoda2@gmail.com',
      subject: `Nova mensagem de: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Novo Contato do Portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0066ff; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0; color: #555; font-size: 16px;">${message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">Enviado a partir do formulário de contato do seu site.</p>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend error:', data.error)
      return NextResponse.json({ error: data.error.message }, { status: 400 })
    }

    return NextResponse.json(
      { success: true, message: 'Mensagem recebida com sucesso!', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem' },
      { status: 500 }
    )
  }
}
