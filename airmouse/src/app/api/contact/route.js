import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { name, email, msg } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'AirMouse Contact <onboarding@resend.dev>',
      to: ['aryann2203@gmail.com'],
      subject: 'New Feedback on AirMouse',
      text: `${msg}\n\n— ${name || 'Anonymous'} (${email})`
    })

    if (error) {
      console.error(error)
      return new Response(JSON.stringify({ success: false }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}
