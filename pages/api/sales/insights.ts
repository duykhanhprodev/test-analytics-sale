import { NextRequest, NextResponse } from "next/server";
import {
  orderArraySchema,
  OrderItem,
  SalesMetricsResponse,
} from "../../../interfaces/sales"; // Kiểm tra đường dẫn import

// 🔹 Cấu hình API chạy trên Edge Runtime
export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    return POST(req);
  }

  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Lấy dữ liệu từ body

    // Validate request body
    const result = orderArraySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.format() });
    }

    const orders = result.data as OrderItem[];

    const metrics = calculateMetrics(orders);

    const summaryHumman = getSummaryHumman(metrics);
    return NextResponse.json({ metrics: metrics });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

// 🔹 Function to calculate metrics
function calculateMetrics(data: OrderItem[]): SalesMetricsResponse {
  const totalSales = data.reduce((sum, item) => sum + item.amount, 0);
  const avgSales = data.length ? totalSales / data.length : 0;

  const categorySales: Record<string, number> = {};
  data.forEach((item) => {
    categorySales[item.category] =
      (categorySales[item.category] || 0) + item.amount;
  });

  const bestCategory = Object.entries(categorySales).reduce((best, curr) =>
    curr[1] > best[1] ? curr : best
  )[0];

  return {
    totalSales,
    avgSales,
    bestCategory,
  };
}

function getSummaryHumman(metrics: SalesMetricsResponse): string {
  const prompt = `
    Given the following sales data:
    - Total sales: ${metrics.totalSales}
    - Average sales per transaction: ${metrics.avgSales}
    - Best performing category: ${metrics.bestCategory}

    Please summarize this information in a concise and human-friendly way.
    `;
  return "";
}
