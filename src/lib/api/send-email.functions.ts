import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getServerConfig } from "../config.server";

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nombre: z.string().min(1, "El nombre es requerido"),
      email: z.string().email("Correo inválido"),
      telefono: z.string().min(1, "El teléfono es requerido"),
      servicio: z.string().min(1, "El servicio es requerido"),
      mensaje: z.string().optional().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const config = getServerConfig();

    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false, // TLS
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });

    const htmlBody = `
      <h2>Nuevo contacto desde IAmkt Landing</h2>
      <table style="border-collapse:collapse; width:100%; max-width:600px;">
        <tr><td style="padding:8px; font-weight:bold;">Nombre:</td><td style="padding:8px;">${data.nombre}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Teléfono:</td><td style="padding:8px;">${data.telefono}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Servicio:</td><td style="padding:8px;">${data.servicio}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Mensaje:</td><td style="padding:8px;">${data.mensaje || "—"}</td></tr>
      </table>
      <hr>
      <p style="color:#666; font-size:12px;">Enviado desde iamkt.co</p>
    `;

    try {
      await transporter.sendMail({
        from: `"${config.contactSender}" <${config.smtp.user}>`,
        to: config.contactEmail,
        subject: `Nuevo contacto: ${data.nombre} — ${data.servicio}`,
        html: htmlBody,
        replyTo: data.email,
      });

      return { success: true };
    } catch (error) {
      console.error("Error enviando correo:", error);
      return { success: false, error: String(error) };
    }
  });
