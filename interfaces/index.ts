export type User = {
  id: number;
  name?: string;
};

// Định nghĩa kiểu dữ liệu (NewType)
export type OrderItem = {
  name: string;
  email: string;
  product: string;
  category: string;
  amount: number;
  date: string;
  state: string;
};

// Schema Zod tương ứng với kiểu dữ liệu
export const orderItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  product: z.string().min(1, "Product is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be a positive number"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  state: z.string().min(2, "State must be at least 2 characters"),
});

// Schema cho mảng dữ liệu
export const orderArraySchema = z.array(orderItemSchema);
