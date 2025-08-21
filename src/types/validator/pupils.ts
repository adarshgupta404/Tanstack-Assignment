import { z, type infer as ZodInfer } from "zod";


export const isValidObjectId = (s: string) => /^[a-f0-9]{24}$/i.test(s);


// Custom validation functions
const isValidPhoneNumber = (phone?: string) => {
  if (!phone || phone.trim() === "") return true; // Optional field
  // UK phone number validation - basic format check
  const phoneRegex = /^(\+44|0)[1-9]\d{8,10}$/;
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

const objectIdSchema = z.string().refine(
  (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  },
  {
    message: "Invalid MongoDB ObjectId format",
  }
);

// Main pupil validation schema for creation (frontend form)
export const pupilCreateSchema = z.object({
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
      {
        message: "Age must be between 16 and 100 years",
      }
    ),
  age: z
    .number()
    .min(16, "Age must be at least 16")
    .max(100, "Age must be at most 100")
    .optional(),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender must be Male, Female, or Other",
  }),
  fullName: z.string().trim().optional(),
  // Optional personal details
  title: z.enum(["Mr", "Mrs", "Miss", "Ms", "Dr"]).optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),

  // Contact
  home: contactSchema,
  allowTextMessaging: z.boolean().default(false),

  // Addresses
  pickupAddress: addressSchema,
  homeAddress: addressSchema,

  // Enums
  pupilType: z
    .enum(["Manual Gearbox", "Automatic", "Motorcycle", "HGV"], {
      message: "Invalid pupil type",
    })
    .optional()
    .default("Manual Gearbox"),

  pupilOwner: z.string().optional().default("Instructor"),
  allocatedTo: z.string().optional(),

  licenseType: z
    .enum(["No License", "Provisional", "Full License"], {
      message: "Invalid license type",
    })
    .optional()
    .default("No License"),


  licenseNo: z.string().optional(),

  passedTheory: z.boolean().default(false),
  fott: z.boolean().default(false),
  fullAccess: z.boolean().default(false),
  pupilCaution: z.boolean().default(false),

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

  usualAvailability: z.string().optional(),
  discount: z.string().optional().default("0%"),
  defaultProduct: z.string().optional(),
  onlinePassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
  createdAt: z.string().optional().refine(isValidDate, {
    message: "Invalid date format. Use YYYY-MM-DD format",
  }),
  updatedAt: z.string().optional().refine(isValidDate, {
    message: "Invalid date format. Use YYYY-MM-DD format",
  }),
});

export type PupilCreateSchemaType = ZodInfer<typeof pupilCreateSchema>;

export const pupilCreateSchemaWithId = pupilCreateSchema.extend({
  _id: objectIdSchema,
});
export type PupilSchemaType = ZodInfer<typeof pupilCreateSchemaWithId>;

export const pupilUpdateSchema = pupilCreateSchema.partial();
export type PupilUpdateSchemaType = ZodInfer<typeof pupilUpdateSchema>;
