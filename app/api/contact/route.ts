import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
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
