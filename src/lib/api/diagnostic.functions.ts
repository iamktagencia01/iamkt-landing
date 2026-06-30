import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getServerConfig } from "../config.server";

export const sendDiagnosticEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      bottleneck: z.string().min(1, "Selecciona una opción"),
      teamSize: z.string().min(1, "Selecciona una opción"),
      timeline: z.string().min(1, "Selecciona una opción"),
      name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
      company: z.string().min(1, "El nombre de la empresa es requerido"),
      whatsapp: z.string().min(7, "Ingresa un número de WhatsApp válido"),
      email: z.string().email("Ingresa un correo electrónico válido"),
    }),
  )
  .handler(async ({ data }) => {
    const config = getServerConfig();

    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });

    const bottleneckLabels: Record<string, string> = {
      manual_tasks: "Tareas manuales y desordenadas",
      stalled_sales: "Ventas estancadas",
      whatsapp_collapsed: "WhatsApp colapsado / Atención lenta",
      lack_software: "Falta de software a la medida",
    };

    const teamSizeLabels: Record<string, string> = {
      independent: "Independiente",
      small: "2-5 personas",
      medium: "6-20 personas",
      large: "Más de 20 personas",
    };

    const timelineLabels: Record<string, string> = {
      asap: "Lo antes posible",
      soon: "En 1-3 meses",
      exploring: "Solo estoy explorando",
    };

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0b1a2e, #132d4a); padding: 28px 32px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">🧠 Nuevo Diagnóstico IAmkt</h1>
            <p style="color: #8ecae6; margin: 6px 0 0; font-size: 13px;">Solicitud de diagnóstico gratuito</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px;">

            <!-- Responses -->
            <table style="width: 100%; border-collapse: collapse;">

              <tr>
                <td colspan="2" style="padding: 6px 0 12px;">
                  <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #087f99;">Paso 1 — Cuello de botella</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Respuesta</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">${bottleneckLabels[data.bottleneck] || data.bottleneck}</td>
              </tr>

              <tr><td colspan="2" style="border-top: 1px solid #e5e7eb; height: 16px;"></td></tr>

              <tr>
                <td colspan="2" style="padding: 6px 0 12px;">
                  <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #087f99;">Paso 2 — Tamaño del equipo</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Respuesta</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">${teamSizeLabels[data.teamSize] || data.teamSize}</td>
              </tr>

              <tr><td colspan="2" style="border-top: 1px solid #e5e7eb; height: 16px;"></td></tr>

              <tr>
                <td colspan="2" style="padding: 6px 0 12px;">
                  <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #087f99;">Paso 3 — Plazo de implementación</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Respuesta</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">${timelineLabels[data.timeline] || data.timeline}</td>
              </tr>

              <tr><td colspan="2" style="border-top: 2px solid #e5e7eb; height: 16px;"></td></tr>

              <tr>
                <td colspan="2" style="padding: 6px 0 12px;">
                  <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #087f99;">Paso 4 — Datos de contacto</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; white-space: nowrap; vertical-align: top;">Nombre</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; white-space: nowrap; vertical-align: top;">Empresa</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; white-space: nowrap; vertical-align: top;">WhatsApp</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                  <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}" style="color: #0891b2; text-decoration: underline;">${data.whatsapp}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #6b7280; white-space: nowrap; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 600;">
                  <a href="mailto:${data.email}" style="color: #0891b2; text-decoration: underline;">${data.email}</a>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="margin-top: 28px; padding: 20px; background: #f0f9ff; border-radius: 12px; border-left: 4px solid #0891b2;">
              <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #065a76;">📌 Próximo paso</p>
              <p style="margin: 0; font-size: 13px; color: #374151;">Contactar a ${data.name} para coordinar el diagnóstico gratuito. Respuesta esperada: <strong>${timelineLabels[data.timeline] || data.timeline}</strong>.</p>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 11px; color: #94a3b8;">Enviado desde iamkt.co — Wizard de Diagnóstico IAmkt</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textBody = `
NUEVO DIAGNÓSTICO IAMKT
========================

PASO 1 — Cuello de botella: ${bottleneckLabels[data.bottleneck] || data.bottleneck}
PASO 2 — Tamaño del equipo: ${teamSizeLabels[data.teamSize] || data.teamSize}
PASO 3 — Plazo: ${timelineLabels[data.timeline] || data.timeline}

PASO 4 — Contacto
Nombre: ${data.name}
Empresa: ${data.company}
WhatsApp: ${data.whatsapp}
Email: ${data.email}

Próximo paso: Contactar a ${data.name} para coordinar el diagnóstico gratuito.
    `.trim();

    try {
      await transporter.sendMail({
        from: `"${config.contactSender}" <${config.smtp.user}>`,
        to: config.contactEmail,
        subject: `🧠 Nuevo diagnóstico: ${data.name} — ${bottleneckLabels[data.bottleneck] || data.bottleneck}`,
        html: htmlBody,
        text: textBody,
        replyTo: data.email,
      });

      return { success: true };
    } catch (error) {
      console.error("Error enviando correo de diagnóstico:", error);
      return { success: false, error: String(error) };
    }
  });
