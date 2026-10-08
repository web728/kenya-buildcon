import { event } from "@/config/event";
import { sendMail, getNotificationRecipients } from "./mailer";
import { organiserNotificationEmail, userAcknowledgementEmail } from "./templates";
import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";
import type { VisitorRegistrationInput } from "@/lib/validation/visitorRegistration";
import type { ContactEnquiryInput } from "@/lib/validation/contactEnquiry";
import type { PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";
import type { BrochureDownloadInput } from "@/lib/validation/brochureDownload";

export async function sendExhibitorEnquiryEmails(data: ExhibitorEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Exhibitor Enquiry – ${data.companyName} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Exhibitor Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Company", value: data.companyName },
          { label: "Country", value: data.country },
          { label: "Company Type", value: data.companyType },
          { label: "Contact", value: `${data.firstName} ${data.lastName} (${data.designation})` },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Product Category", value: data.productCategory },
          { label: "Preferred Participation", value: data.preferredParticipation },
          { label: "Required Area", value: data.requiredArea },
          { label: "Products / Services", value: data.productsServices || "-" },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your exhibitor enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.firstName,
      heading: "Exhibitor Enquiry Received",
      bodyText:
        `Thank you for your interest in exhibiting at ${event.name}. Our exhibition sales team has received your enquiry and will contact you shortly with participation details.`,
      referenceId: data.referenceId,
    }),
  });
}

export async function sendVisitorRegistrationEmails(data: VisitorRegistrationInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Visitor Registration – ${data.company} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Visitor Registration",
        referenceId: data.referenceId,
        rows: [
          { label: "Name", value: `${data.firstName} ${data.lastName}` },
          { label: "Company", value: data.company },
          { label: "Designation", value: data.designation },
          { label: "Country", value: data.country },
          { label: "City", value: data.city },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Nature of Business", value: data.natureOfBusiness },
          { label: "Products Interested", value: data.productsInterested.join(", ") },
          { label: "Purchasing Responsibility", value: data.purchasingResponsibility },
          { label: "Purpose of Visit", value: data.purposeOfVisit },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `Your visitor registration is confirmed – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.firstName,
      heading: "Visitor Registration Received",
      bodyText:
        `Thank you for registering to visit ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}. Please keep this reference for your records — further visit details will follow closer to the show.`,
      referenceId: data.referenceId,
    }),
  });
}

export async function sendContactEnquiryEmails(data: ContactEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Website Enquiry – ${data.name} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Website Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Country", value: data.country },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Interest", value: data.interest },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.name,
      heading: "Enquiry Received",
      bodyText:
        `Thank you for contacting ${event.name}. Our team will respond to your enquiry shortly.`,
      referenceId: data.referenceId,
    }),
  });
}

export async function sendPartnerEnquiryEmails(data: PartnerEnquiryInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Partnership Enquiry – ${data.organisation} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Partnership Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Organisation", value: data.organisation },
          { label: "Type", value: data.organisationType },
          { label: "Country", value: data.country },
          { label: "Contact Person", value: data.contactPerson },
          { label: "Email", value: data.email },
          { label: "Phone", value: data.phone },
          { label: "Nature of Enquiry", value: data.natureOfEnquiry },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your partnership enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.contactPerson,
      heading: "Partnership Enquiry Received",
      bodyText:
        `Thank you for your interest in partnering with ${event.name}. Our team will review your enquiry and respond shortly.`,
      referenceId: data.referenceId,
    }),
  });
}

export async function sendBrochureDownloadEmails(data: BrochureDownloadInput & { referenceId: string }) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `Brochure Download Request – ${data.name} (${data.company}) – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Brochure Download",
        referenceId: data.referenceId,
        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Country", value: data.country },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `${event.shortName} ${event.edition} – Official Exhibition Brochure [${data.referenceId}]`,
    html: userAcknowledgementEmail({
      greetingName: data.name,
      heading: "Thank You for Downloading the Brochure",
      bodyText:
        `Thank you for your interest in ${event.name}. Your brochure download request has been received. Our exhibition sales team is available should you require stand availability or pricing details.`,
      referenceId: data.referenceId,
    }),
  });
}




export async function sendNewsletterSubscriptionEmails(data: {
  email: string;
  country?: string;
  interest?: string[];
}) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Newsletter Subscriber – ${data.email}`,
      html: organiserNotificationEmail({
        heading: "New Newsletter Subscriber",
        referenceId: "NEWSLETTER",
        rows: [
          { label: "Subscriber Email", value: data.email },
          { label: "Country", value: data.country || "Not specified" },
          { label: "Interests", value: (data.interest && data.interest.length > 0) ? data.interest.join(", ") : "General Updates" },
        ],
      }),
    });
  }

  // Acknowledgement to the subscriber
  await sendMail({
    to: data.email,
    subject: `Subscription Confirmed – ${event.name}`,
    html: userAcknowledgementEmail({
      greetingName: "Subscriber",
      heading: "Thank You for Subscribing",
      bodyText:
        `You have successfully subscribed to ${event.shortName} updates. You will receive official show announcements, floor plan releases, and exhibitor highlights directly in your inbox.`,
      referenceId: "KBCN-NEWSLETTER",
    }),
  });
}