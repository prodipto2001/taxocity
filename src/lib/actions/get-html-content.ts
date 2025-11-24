import type { EmailData } from "@/lib/utils/resend";

function getHTMLContent(data: EmailData) {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="margin:0; padding:0; font-family:Arial, sans-serif;">

    <!-- Full Width Wrapper -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="padding:16px 8px;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table border="0" cellspacing="0" cellpadding="0" 
                 style="width:100%; max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden;">

            <tr>
              <td style="padding:16px;">

                <!-- Header -->
                <table width="100%">
                  <tr>
                    <td>
                      <img src="cid:logo" alt="${data.brandName}" 
                           style="height:36px; display:block;" />
                    </td>
                    <td align="right" style="font-size:15px; font-weight:600; color:#000;">
                      Receipt
                    </td>
                  </tr>
                </table>

                <!-- Icon -->
                <table width="100%" style="margin-top:20px;">
                  <tr>
                    <td align="center">
                      <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                           width="65" style="display:block;" />
                    </td>
                  </tr>
                </table>

                <!-- Title -->
                <table width="100%" style="margin-top:18px;">
                  <tr>
                    <td align="center" 
                        style="font-size:17px; line-height:23px; font-weight:600; color:#333;">
                      Hi ${data.name}, Thank you for choosing Taxocity for your<br>
                      Private Limited Company incorporation!
                    </td>
                  </tr>
                  <tr>
                    <td align="center" 
                        style="font-size:14px; color:#555; padding-top:8px;">
                      We're excited to support you as you begin your business journey.
                    </td>
                  </tr>
                </table>

                <!-- Summary Box -->
                <table width="100%" cellspacing="0" cellpadding="0" 
                       style="margin-top:20px; border-top:1px solid #e0e0e0; 
                              border-bottom:1px solid #e0e0e0; padding:16px 0;">

                  <tr>
                    <td style="font-size:17px; font-weight:700; padding:6px 0;">Total</td>
                    <td align="right" style="font-size:17px; font-weight:700; padding:6px 0;">
                      ₹${data.amount}
                    </td>
                  </tr>

                  <tr>
                    <td style="font-size:13px; color:#666; padding:6px 0;">Package</td>
                    <td align="right" style="font-size:14px;">${data.plan}</td>
                  </tr>

                  <tr>
                    <td style="font-size:13px; color:#666; padding:6px 0;">Transaction ID</td>
                    <td align="right" style="font-size:14px;">${data.paymentId}</td>
                  </tr>

                  <tr>
                    <td style="font-size:13px; color:#666; padding:6px 0;">Transaction Date</td>
                    <td align="right" style="font-size:14px;">${data.paymentDate}</td>
                  </tr>

                </table>

                <!-- Steps intro -->
                <p style="font-size:14px; color:#444; line-height:1.6; margin-top:16px;">
                  To proceed with the incorporation process smoothly, kindly complete the following steps:
                </p>

                <!-- Step 1 -->
                <p style="font-size:15px; font-weight:700; margin-top:20px;">Step 1: Director & Shareholder Details</p>
                <p style="font-size:14px; color:#555; margin:0 0 14px;">
                  Please fill out the details of all proposed Directors and Shareholders:
                </p>

                <!-- Button 1 -->
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <a href="${data.directorFormLink}"
                        style="display:block; width:100%; background:#f5b042; color:#000;
                               padding:14px 0; border-radius:8px; text-align:center;
                               font-size:16px; font-weight:600; text-decoration:none;">
                        Submit Director Details
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Step 2 -->
                <p style="font-size:15px; font-weight:700; margin-top:20px;">Step 2: Document Upload</p>
                <p style="font-size:14px; color:#555; margin:0 0 14px;">
                  Please upload the required identity and address proof documents:
                </p>

                <!-- Button 2 -->
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <a href="${data.documentUploadLink}"
                        style="display:block; width:100%; background:#f5b042; color:#000;
                               padding:14px 0; border-radius:8px; text-align:center;
                               font-size:16px; font-weight:600; text-decoration:none;">
                        Upload Documents
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Notice -->
                <p style="font-size:14px; font-weight:700; color:#333; margin-top:22px; line-height:1.6;">
                  Important: We can only begin drafting the necessary forms (Spice+ & AoA/MoA) once both steps are completed.
                </p>

                <!-- Footer -->
                <p style="font-size:14px; color:#555; line-height:1.6; margin-top:14px;">
                  If you need assistance while filling out the forms, simply reply to this email.
                </p>

                <p style="font-size:14px; margin-top:22px;">
                  Best regards,<br>
                  <strong>Team ${data.brandName}</strong>
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
  `;
}

function getTextFallback(data: EmailData) {
  return `
    Payment Successful – ${data.brandName}

    Thank you ${data.name}!

    Amount: ${data.amount}
    Package: ${data.plan}
    Transaction ID: ${data.paymentId}
    Date: ${data.paymentDate}

    Step 1: Director & Shareholder Details:
    ${data.directorFormLink}

    Step 2: Document Upload
    ${data.documentUploadLink}

    Team ${data.brandName}
  `;
}

export { getHTMLContent, getTextFallback };
