export interface Order {
  id: number;
  customer: string;
  product: string;
  price: number;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  newCustomers: number;
}

export interface OrdersResponse {
  orders: Order[];
}

export interface DashboardResponse {
  stats: DashboardStats;
} 