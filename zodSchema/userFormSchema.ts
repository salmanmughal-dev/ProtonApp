import { z } from "zod";

const userFormSchema = z.object({
    name: z.string().min(2).max(50),
    phone: z.string().min(8),
    email: z.string().email({ message: "Invalid email address" }),
    
});


export default userFormSchema;