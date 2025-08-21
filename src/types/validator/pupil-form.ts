import { z } from "zod";

export const isValidObjectId = (s: string) => /^[a-f0-9]{24}$/i.test(s);

// Custom validation functions
const isValidPhoneNumber = (phone?: string) => {
  if (!phone || phone.trim() === "") return true; // Optional field
  const phoneRegex = /^(\+44|0)[1-9]\d{8,10}$/; // UK phone number validation
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const isValidDate = (dateString?: string | null) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) &&
    date.getFullYear() > 1900 &&
    date.getFullYear() < 2100
  );
};

// Nested schema for contact information
export const contactSchema = z
  .object({
    mobile: z.string().optional().refine(isValidPhoneNumber, {
      message: "Invalid mobile phone number format",
    }),
    work: z.string().optional().refine(isValidPhoneNumber, {
      message: "Invalid work phone number format",
    }),
  })
  .optional();

// Nested schema for address objects
export const addressSchema = z
  .object({
    postcode: z
      .string()
      .optional()
      .refine(
        (postcode) => {
          if (!postcode || postcode.trim() === "") return true;
          const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
          return postcodeRegex.test(postcode.trim());
        },
        { message: "Invalid UK postcode format" }
      ),
    houseNo: z.string().optional(),
    address: z.string().optional(),
  })
  .optional();

export const pupilFormSchema = z.object({
  // Personal Information
  forename: z
    .string()
    .min(1, "Forename is required")
    .max(50, "Forename must be less than 50 characters")
    .trim(),
  surname: z
    .string()
    .min(1, "Surname is required")
    .max(50, "Surname must be less than 50 characters")
    .trim(),
  dob: z
    .string()
    .refine(isValidDate, {
      message: "Invalid date format. Use YYYY-MM-DD format",
    })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 16 && age <= 100;
      },
      { message: "Age must be between 16 and 100 years" }
    ),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender must be Male, Female, or Other",
  }),
  title: z.enum(["Mr", "Mrs", "Miss", "Ms", "Dr"]).optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),

  // Contact Information
  home: contactSchema,
  allowTextMessaging: z.boolean(), // ❌ removed .default() to avoid conflict

  // Address Information
  pickupAddress: addressSchema,
  homeAddress: addressSchema,

  // License & Training Information
  pupilType: z.enum(["Manual Gearbox", "Automatic", "Motorcycle", "HGV"], {
    message: "Invalid pupil type",
  }),
  licenseType: z.enum(["No License", "Provisional", "Full License"], {
    message: "Invalid license type",
  }),
  licenseNo: z.string().optional(),
  passedTheory: z.boolean(),
  fott: z.boolean(),
  certNo: z.string().optional(),
  datePassed: z
    .string()
    .optional()
    .nullable()
    .refine(
      (dateString) => {
        if (!dateString) return true;
        return isValidDate(dateString);
      },
      { message: "Invalid date format for date passed. Use YYYY-MM-DD format" }
    ),

  // Additional Information
  usualAvailability: z.string().optional(),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export type PupilFormType = z.infer<typeof pupilFormSchema>;
